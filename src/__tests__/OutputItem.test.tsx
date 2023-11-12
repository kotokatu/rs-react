import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OutputItem from '../components/OutputItem/OutputItem';
import mockApiData from './_mockData';
import { MemoryRouter } from 'react-router-dom';
import DataContext from '../context/DataContext';
import SearchOutput from '../components/SearchOutput/SearchOutput';

describe('Card', () => {
  it('Ensures that the card component renders the relevant card data', () => {
    render(
      <MemoryRouter>
        <OutputItem item={mockApiData!.data[0]} openDetails={vi.fn()} />
      </MemoryRouter>
    );
    const item = screen.getByRole('listitem');
    expect(item).toBeInTheDocument();
    expect(item).toContainHTML(
      '<span class="output-item-name">LeBron James</span>'
    );
  });

  it('Validates that clicking on a card opens a detailed card component', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <DataContext.Provider value={mockApiData}>
          <SearchOutput />
        </DataContext.Provider>
      </MemoryRouter>
    );
    await user.click(screen.getByText('Stephen Curry'));
    await waitFor(async () => {
      const detailsComponent = screen.getByTestId('details');
      expect(detailsComponent).toBeInTheDocument();
    });
  });

  it('Triggers API call to fetch detailed information when clicked', async () => {
    const user = userEvent.setup();
    vi.spyOn(global, 'fetch');
    render(
      <MemoryRouter>
        <DataContext.Provider value={mockApiData}>
          <SearchOutput />
        </DataContext.Provider>
      </MemoryRouter>
    );
    await user.click(screen.getByText('Stephen Curry'));
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalled();
      expect(global.fetch).toHaveBeenCalledWith(
        'https://www.balldontlie.io/api/v1/players/2'
      );
    });
  });
});
