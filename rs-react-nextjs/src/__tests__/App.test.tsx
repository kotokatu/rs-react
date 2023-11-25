import { expect, test } from 'vitest';
import { screen } from '@testing-library/react';
import { renderWithProviders } from './test-utils';
import App from '../../../old/src/App';

test('renders App component', () => {
  renderWithProviders(<App />);
  expect(screen.getByText(/Search NBA players by name/i)).toBeInTheDocument();
});
