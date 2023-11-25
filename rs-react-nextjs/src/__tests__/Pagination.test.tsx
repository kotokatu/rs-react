import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test-utils';
import App from '../../../old/src/App';

test('the component updates URL query parameter when page changes', async () => {
  const user = userEvent.setup();
  renderWithProviders(<App />, {
    preloadedState: {
      main: { searchValue: '', page: 1, perPage: 1, mainLoading: false },
    },
  });
  expect(location.search).toContain('page=1');
  const nextPageButton = await screen.findByTestId('button-next');
  await user.click(nextPageButton);
  expect(location.search).toContain('page=2');
});
