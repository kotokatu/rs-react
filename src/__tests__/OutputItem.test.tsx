import { vi } from 'vitest';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from './test-utils/createMockRouter';
import Home from '@/pages';
import { mockApiData } from './mocks/mockData';
import { makeStore } from '@/lib/store';

const store = makeStore();

const user = userEvent.setup();

test('Ensures that the card component renders the relevant card data', async () => {
  const router = createMockRouter({});
  render(
    <RouterContext.Provider value={router}>
      <Home playersData={mockApiData} playerData={null} />
    </RouterContext.Provider>
  );
  const items = await screen.findAllByRole('listitem');
  expect(items[0].textContent).toBe('LeBron James');
  expect(items[1].textContent).toBe('Stephen Curry');
  expect(items[2].textContent).toBe('Kevin Durant');
});

test('Validates that clicking on a card adds a "details" query parameter to URL', async () => {
  const router = createMockRouter({});
  render(
    <RouterContext.Provider value={router}>
      <Home playersData={mockApiData} playerData={null} />
    </RouterContext.Provider>
  );
  await user.click(await screen.findByText('Stephen Curry'));
  expect(router.push).toHaveBeenCalledWith({ query: { details: 2 } });
});
