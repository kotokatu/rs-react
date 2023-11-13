import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import mockApiData from './mocks/mockData';
import { MemoryRouter } from 'react-router-dom';
import DataContext from '../context/DataContext';
import SearchOutput from '../components/SearchOutput/SearchOutput';

describe('Details', () => {
  it('Tests if a loading indicator is displayed while fetching data', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <DataContext.Provider value={mockApiData}>
          <SearchOutput />
        </DataContext.Provider>
      </MemoryRouter>
    );
    await user.click(screen.getByText('Stephen Curry'));
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('Tests if the card details component correctly displays the detailed card data', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <DataContext.Provider value={mockApiData}>
          <SearchOutput />
        </DataContext.Provider>
      </MemoryRouter>
    );
    await user.click(screen.getByText('Stephen Curry'));
    await waitFor(() => {
      expect(screen.getByText('Height (ft):')).toBeInTheDocument();
      expect(screen.getByText('6')).toBeInTheDocument();
      expect(screen.getByText('Height (in):')).toBeInTheDocument();
      expect(screen.getByText('3')).toBeInTheDocument();
      expect(screen.getByText('Weight (lbs):')).toBeInTheDocument();
      expect(screen.getByText('185')).toBeInTheDocument();
      expect(screen.getByText('Team:')).toBeInTheDocument();
      expect(screen.getByText('Golden State Warriors')).toBeInTheDocument();
      expect(screen.getByText('Team abbreviation:')).toBeInTheDocument();
      expect(screen.getByText('GSW')).toBeInTheDocument();
      expect(screen.getByText('City:')).toBeInTheDocument();
      expect(screen.getByText('Conference:')).toBeInTheDocument();
      expect(screen.getByText('West')).toBeInTheDocument();
      expect(screen.getByText('Division:')).toBeInTheDocument();
      expect(screen.getByText('Pacific')).toBeInTheDocument();
    });
  });

  it('Tests if clicking the close button hides the component', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <DataContext.Provider value={mockApiData}>
          <SearchOutput />
        </DataContext.Provider>
      </MemoryRouter>
    );
    waitFor(async () => {
      await user.click(screen.getByText('Stephen Curry'));
      expect(screen.getByTestId('details')).toBeInTheDocument();
      await user.click(screen.getByTestId('details-button'));
      expect(screen.getByTestId('details')).not.toBeInTheDocument();
    });
  });
});
