import { render, screen } from '@testing-library/react';
import Home from '@/pages';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from './test-utils/createMockRouter';
import { getServerSideProps } from '@/pages';
import { gsspCtx, assertHasProps, setupMockServer } from './test-utils/utils';
import { handlers } from './test-utils/handlers';

const server = setupMockServer(...handlers);

test('renders Home page', async () => {
  const router = createMockRouter({});
  const res = await getServerSideProps(gsspCtx());
  assertHasProps(res);
  render(
    <RouterContext.Provider value={router}>
      <Home {...res.props} />
    </RouterContext.Provider>
  );
  screen.debug();
  expect(screen.getByText(/Search NBA players by name/)).toBeInTheDocument();
  expect;
});
