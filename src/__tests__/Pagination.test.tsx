import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Home from '@/pages';
import { mockApiData } from './mocks/mockData';
import mockRouter from 'next-router-mock';

vi.mock('next/router', async () => await vi.importActual('next-router-mock'));

test('The component updates URL query parameter when page changes', async () => {
  const user = userEvent.setup();
  render(<Home playersData={mockApiData} playerData={null} />);
  expect(mockRouter.query.page).toBeUndefined();
  const nextPageButton = await screen.findByTestId('button-next');
  await user.click(nextPageButton);
  expect(mockRouter).toMatchObject({ query: { page: 2 } });
  const prevPageButton = await screen.findByTestId('button-prev');
  await user.click(prevPageButton);
  expect(mockRouter).toMatchObject({ query: { page: 1 } });
});
