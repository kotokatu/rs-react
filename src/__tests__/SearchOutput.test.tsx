import { render, screen, within } from '@testing-library/react';
import SearchOutput from '../components/SearchOutput/SearchOutput';
import DataContext from '../context/DataContext';
import mockApiData from './mocks/mockData';
import { MemoryRouter } from 'react-router-dom';
import { ApiResponse } from '../components/Search/Search';

test('SearchOutput renders the correct number of items', () => {
  render(
    <MemoryRouter>
      <DataContext.Provider value={mockApiData}>
        <SearchOutput />
      </DataContext.Provider>
    </MemoryRouter>
  );
  const list = screen.getByRole('list', {});
  const { getAllByRole } = within(list);
  const items = getAllByRole('listitem');
  expect(items.length).toBe(3);
});

test('SearchOutput renders "Nothing found" message if no are items found', () => {
  const emptyApiData: ApiResponse = {
    data: [],
    meta: {
      total_pages: 0,
      current_page: 1,
      next_page: null,
      per_page: 10,
      total_count: 0,
    },
  };

  render(
    <MemoryRouter>
      <DataContext.Provider value={emptyApiData}>
        <SearchOutput />
      </DataContext.Provider>
    </MemoryRouter>
  );
  const message = screen.getByText(/Nothing found/i);
  expect(message).toBeInTheDocument();
});
