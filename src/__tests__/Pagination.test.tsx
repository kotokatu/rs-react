import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test-utils';
import App from '../App';

test('the component updates URL query parameter when page changes', async () => {
  const user = userEvent.setup();
  renderWithProviders(<App />, {
    preloadedState: {
      main: { searchValue: '', page: 1, perPage: 1, mainLoading: false },
    },
  });
  await waitFor(async () => {
    const nextPageButton = screen.getByTestId('button-next');
    await user.click(nextPageButton);
    await waitFor(() => expect(location.search).toContain('page=2'));
  });
});
