import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from './test-utils/createMockRouter';
import Home from '@/pages';

test('Check that the component retrieves the value from the URL query params upon mounting', async () => {
  const testValue = '1234';
  const router = createMockRouter({ query: { search: testValue } });
  const { unmount } = render(
    <RouterContext.Provider value={router}>
      <Home playersData={null} playerData={null} />
    </RouterContext.Provider>
  );
  unmount();
  render(
    <RouterContext.Provider value={router}>
      <Home playersData={null} playerData={null} />
    </RouterContext.Provider>
  );
  expect(router.query.search).toEqual(testValue);
  const input = await screen.findByTestId('input-search');
  expect(input).toHaveValue(testValue);
});

test('Verify that clicking the Search button saves the entered value to the URL query params', async () => {
  const testValue = '5678';
  const router = createMockRouter({});
  render(
    <RouterContext.Provider value={router}>
      <Home playersData={null} playerData={null} />
    </RouterContext.Provider>
  );
  const input = await screen.findByTestId('input-search');
  await userEvent.type(input, testValue);
  const button = await screen.findByTestId('button-search');
  await userEvent.click(button);
  expect(router.push).toHaveBeenCalledWith({
    query: { search: testValue, page: '1' },
  });
});
