import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter } from 'react-router-dom';
import DataContext from '../context/DataContext';
import Pagination from '../components/Pagination/Pagination';
import { vi } from 'vitest';
import mockApiData from './mocks/mockData';

test('the component updates URL query parameter when page changes', async () => {
  const user = userEvent.setup();
  render(
    <BrowserRouter>
      <DataContext.Provider value={mockApiData}>
        <Pagination
          currentPage={1}
          setPage={vi.fn()}
          itemsPerPage={1}
          setItemsPerPage={vi.fn()}
        />
      </DataContext.Provider>
    </BrowserRouter>
  );
  const nextPageButton = screen.getByTestId('button-next');
  await user.click(nextPageButton);
  await waitFor(() => expect(window.location.search).toContain('page=2'));
});
