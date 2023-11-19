import { vi } from 'vitest';
import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test-utils';
import App from '../App';

const user = userEvent.setup();

test('Ensures that the card component renders the relevant card data', async () => {
  renderWithProviders(<App />);
  await waitFor(() => {
    const item = screen.getAllByRole('listitem')[0];
    expect(item).toBeInTheDocument();
    expect(item.innerHTML).toBe(
      '<span class="output-item-name">LeBron James</span>'
    );
  });
});

test('Validates that clicking on a card opens a detailed card component', async () => {
  renderWithProviders(<App />);
  await waitFor(async () => {
    await user.click(screen.getByText('Stephen Curry'));
    const detailsComponent = screen.getByTestId('details');
    expect(detailsComponent).toBeInTheDocument();
  });
});

test('Triggers API call to fetch detailed information when clicked', async () => {
  vi.spyOn(global, 'fetch');
  renderWithProviders(<App />);
  await waitFor(async () => {
    await user.click(screen.getByText('Stephen Curry'));
    expect(global.fetch).toHaveBeenCalled();
  });
});
