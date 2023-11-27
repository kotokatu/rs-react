import { vi } from 'vitest';
import { screen, render, getByTestId } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/pages';
import { getServerSideProps } from '@/pages';
import { gsspCtx, assertHasProps, setupMockServer } from './test-utils/utils';
import mockRouter from 'next-router-mock';
import { handlers } from './test-utils/handlers';

vi.mock('next/router', async () => await vi.importActual('next-router-mock'));
const server = setupMockServer(...handlers);
const user = userEvent.setup();

afterEach(() => {
  mockRouter.push('/');
});

test('Ensures that the card component renders the relevant card data', async () => {
  const res = await getServerSideProps(gsspCtx({ query: { details: '2' } }));
  assertHasProps(res);
  render(<Home {...res.props} />);
  const items = await screen.findAllByRole('listitem');
  expect(items[0].textContent).toBe('LeBron James');
  expect(items[1].textContent).toBe('Stephen Curry');
  expect(items[2].textContent).toBe('Kevin Durant');
});

test('Validates that clicking on a card adds a "details" query parameter to URL', async () => {
  const res = await getServerSideProps(gsspCtx({ query: { details: '2' } }));
  assertHasProps(res);
  render(<Home {...res.props} />);
  await user.click(await screen.findByText('Stephen Curry'));
  expect(mockRouter).toMatchObject({ query: { details: 2 } });
});

test('Validates that clicking on a card opens Details', async () => {
  const res = await getServerSideProps(gsspCtx({ query: { details: '2' } }));
  assertHasProps(res);
  render(<Home {...res.props} />);
  await user.click(await screen.findByText('Stephen Curry'));
  expect(screen.getByTestId('details')).toBeInTheDocument();
});
