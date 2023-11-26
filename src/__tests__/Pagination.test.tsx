import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/pages';
import { mockApiData } from './mocks/mockData';
import mockRouter from 'next-router-mock';
import { getServerSideProps } from '@/pages';
import { gsspCtx, assertHasProps, setupMockServer } from './test-utils/utils';
import { handlers } from './test-utils/handlers';

vi.mock('next/router', async () => await vi.importActual('next-router-mock'));
const server = setupMockServer(...handlers);

test('The component updates URL query parameter when page changes', async () => {
  const user = userEvent.setup();
  const res = await getServerSideProps(gsspCtx({ query: { details: '2' } }));
  assertHasProps(res);
  render(<Home {...res.props} />);
  expect(mockRouter.query.page).toBeUndefined();
  const nextPageButton = await screen.findByTestId('button-next');
  await user.click(nextPageButton);
  expect(mockRouter).toMatchObject({ query: { page: 2 } });
  const prevPageButton = await screen.findByTestId('button-prev');
  await user.click(prevPageButton);
  expect(mockRouter).toMatchObject({ query: { page: 1 } });
});
