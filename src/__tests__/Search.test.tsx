import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/pages';
import { handlers } from './test-utils/handlers';
import { gsspCtx, assertHasProps, setupMockServer } from './test-utils/utils';
import { getServerSideProps } from '@/pages';
import mockRouter from 'next-router-mock';

afterEach(() => {
  mockRouter.push('/');
});
vi.mock('next/router', async () => await vi.importActual('next-router-mock'));
const server = setupMockServer(...handlers);

test('Check that the component retrieves the value from the URL query params upon mounting', async () => {
  const testValue = '1234';

  const { unmount } = render(<Home playersData={null} playerData={null} />);
  unmount();
  mockRouter.push({ query: { search: testValue } });
  const res = await getServerSideProps(
    gsspCtx({ query: { search: testValue } })
  );
  assertHasProps(res);
  render(<Home {...res.props} />);
  expect(mockRouter.query.search).toEqual(testValue);
  const input = await screen.findByTestId('input-search');
  expect(input).toHaveValue(testValue);
});

test('Verify that clicking the Search button saves the entered value to the URL query params', async () => {
  const testValue = '5678';
  const res = await getServerSideProps(gsspCtx());
  assertHasProps(res);
  render(<Home {...res.props} />);
  const input = await screen.findByTestId('input-search');
  await userEvent.type(input, testValue);
  const button = await screen.findByTestId('button-search');
  await userEvent.click(button);
  expect(mockRouter.query.search).toEqual(testValue);
});
