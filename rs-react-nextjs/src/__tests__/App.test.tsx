import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/pages';
import { Provider } from 'react-redux';
import { makeStore } from '@/lib/store';
import { mockApiData } from './mocks/mockData';

test('renders App component', async () => {
  await waitFor(() =>
    render(<Home playersData={mockApiData} playerData={null} />)
  );
  screen.debug();
  expect(screen.getByText(/Search NBA players by name/)).toBeInTheDocument();
});
