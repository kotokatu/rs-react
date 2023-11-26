import { screen, within, render } from '@testing-library/react';
import { emptyApiData, mockApiData } from './mocks/mockData';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from './test-utils/createMockRouter';
import Home from '@/pages';

test('SearchOutput renders the correct number of items', async () => {
  const router = createMockRouter({});
  render(
    <RouterContext.Provider value={router}>
      <Home playersData={mockApiData} playerData={null} />
    </RouterContext.Provider>
  );
  const testValue = mockApiData.data.length;
  const list = await screen.findByRole('list', {});
  const { getAllByRole } = within(list);
  const items = getAllByRole('listitem');
  expect(items.length).toBe(testValue);
});

test('SearchOutput renders "Nothing found" message if no are items found', async () => {
  const router = createMockRouter({});
  render(
    <RouterContext.Provider value={router}>
      <Home playersData={emptyApiData} playerData={null} />
    </RouterContext.Provider>
  );
  const message = await screen.findByText(/Nothing found/i);
  expect(message).toBeInTheDocument();
});
