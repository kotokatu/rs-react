import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from './test-utils';
import App from '../App';

test('Tests if a loading indicator is displayed while fetching data', async () => {
  const user = userEvent.setup();
  renderWithProviders(<App />);
  await user.click(await screen.findByText('Stephen Curry'));
  expect(await screen.findByTestId('loader')).toBeInTheDocument();
});

test('Tests if the card details component correctly displays the detailed card data', async () => {
  const user = userEvent.setup();
  renderWithProviders(<App />);
  await user.click(await screen.findByText('Stephen Curry'));
  expect(await screen.findByText('Height (ft):')).toBeInTheDocument();
  expect(await screen.findByText('6')).toBeInTheDocument();
  expect(await screen.findByText('Height (in):')).toBeInTheDocument();
  expect(await screen.findByText('3')).toBeInTheDocument();
  expect(await screen.findByText('Weight (lbs):')).toBeInTheDocument();
  expect(await screen.findByText('185')).toBeInTheDocument();
  expect(await screen.findByText('Team:')).toBeInTheDocument();
  expect(await screen.findByText('Golden State Warriors')).toBeInTheDocument();
  expect(await screen.findByText('Team abbreviation:')).toBeInTheDocument();
  expect(await screen.findByText('GSW')).toBeInTheDocument();
  expect(await screen.findByText('City:')).toBeInTheDocument();
  expect(await screen.findByText('Conference:')).toBeInTheDocument();
  expect(await screen.findByText('West')).toBeInTheDocument();
  expect(await screen.findByText('Division:')).toBeInTheDocument();
  expect(await screen.findByText('Pacific')).toBeInTheDocument();
});

test('Tests if clicking the close button hides the component', async () => {
  const user = userEvent.setup();
  renderWithProviders(<App />);
  await user.click(await screen.findByText('Stephen Curry'));
  expect(await screen.findByTestId('details')).toBeInTheDocument();
  await user.click(await screen.findByTestId('details-button'));
  expect(screen.queryByTestId('details')).toBeNull();
});
