import { render, screen } from '@testing-library/react';
import Home from '@/pages';
import { mockApiData } from './mocks/mockData';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from './test-utils/createMockRouter';
import { getServerSideProps } from '@/pages';
import { gsspCtx, assertHasProps } from './test-utils/utils';

test('renders Home page', async () => {
  const router = createMockRouter({});
  render(
    <RouterContext.Provider value={router}>
      <Home playersData={mockApiData} playerData={null} />
    </RouterContext.Provider>
  );
  expect(screen.getByText(/Search NBA players by name/)).toBeInTheDocument();
});

test('If the data acquisition is successful, the title will be displayed.', async () => {
  const router = createMockRouter({});
  const res = await getServerSideProps(gsspCtx());
  assertHasProps(res);
  render(
    <RouterContext.Provider value={router}>
      <Home {...res.props} />
    </RouterContext.Provider>
  );
  screen.debug();
  expect(screen.getByText('Posts')).toBeInTheDocument();
});
