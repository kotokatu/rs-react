import { vi } from 'vitest';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test-utils';
import App from '../../../old/src/App';

const user = userEvent.setup();

test('Ensures that the card component renders the relevant card data', async () => {
  renderWithProviders(<App />);
  const items = await screen.findAllByRole('listitem');
  expect(items[0].textContent).toBe('LeBron James');
});

test('Validates that clicking on a card opens a detailed card component', async () => {
  renderWithProviders(<App />);
  await user.click(await screen.findByText('Stephen Curry'));
  const detailsComponent = await screen.findByTestId('details');
  expect(detailsComponent).toBeInTheDocument();
});

test('Triggers API call to fetch detailed information when clicked', async () => {
  vi.spyOn(global, 'fetch');
  renderWithProviders(<App />);
  await user.click(await screen.findByText('Stephen Curry'));
  expect(global.fetch).toHaveBeenCalled();
});
