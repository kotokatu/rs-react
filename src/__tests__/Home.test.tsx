import { render, screen, waitFor } from '@testing-library/react';
import Home from '@/pages';
import { mockApiData } from './mocks/mockData';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from './test-utils/createMockRouter';

test('renders Home page', async () => {
  const router = createMockRouter({});
  render(
    <RouterContext.Provider value={router}>
      <Home playersData={mockApiData} playerData={null} />
    </RouterContext.Provider>
  );
  expect(screen.getByText(/Search NBA players by name/)).toBeInTheDocument();
});
