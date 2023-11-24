import { MemoryRouter, Routes, Route } from 'react-router-dom';
import NotFound from '../components/NotFound/NotFound';
import { render, screen } from '@testing-library/react';
import Search from '../components/Search/Search';

test('Ensure that the 404 page is displayed when navigating to an invalid route', () => {
  const invalidRoute = '/invalidRoute';
  render(
    <MemoryRouter initialEntries={[invalidRoute]}>
      <Routes>
        <Route path="/" element={<Search />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MemoryRouter>
  );
  expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
});
