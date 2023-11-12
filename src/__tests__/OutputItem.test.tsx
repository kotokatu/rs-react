import { vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import OutputItem from '../components/OutputItem/OutputItem';
import Details from '../components/Details/Details';
import mockApiData from './_mockData';
import { MemoryRouter } from 'react-router-dom';
import DataContext from '../context/DataContext';
import SearchOutput from '../components/SearchOutput/SearchOutput';
import App from '../App';

test('Ensure that the card component renders the relevant card data', () => {
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

test('Validate that clicking on a card opens a detailed card component', async () => {
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

// test('triggers API call to fetch detailed information when clicked', async () => {
//   const mockItem = mockApiData!.data[0];

//   global.fetch = vi.fn(() =>
//     Promise.resolve({
//       json: () =>
//         Promise.resolve({
//           data: mockItem,
//         }),
//     })
//   );

//   const { getByText } = render(
//     <>
//       <OutputItem item={mockItem} />
//       <Details />
//     </>
//   );

//   fireEvent.click(getByText('John Doe'));

//   await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

//   expect(global.fetch).toHaveBeenCalledWith(
//     'https://www.balldontlie.io/api/v1/players/1'
//   );
// });
