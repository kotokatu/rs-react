import { screen, within, waitFor } from '@testing-library/react';
import { HttpResponse, http } from 'msw';
import { server } from './mocks/server';
import { emptyApiData, mockApiData } from './mocks/mockData';
import App from '../App';
import { renderWithProviders } from './test-utils';

test('SearchOutput renders the correct number of items', async () => {
  renderWithProviders(<App />);
  await waitFor(() => {
    const testValue = mockApiData.data.length;
    const list = screen.getByRole('list', {});
    const { getAllByRole } = within(list);
    const items = getAllByRole('listitem');
    expect(items.length).toBe(testValue);
  });
});

test('SearchOutput renders "Nothing found" message if no are items found', async () => {
  server.use(
    http.get('https://www.balldontlie.io/api/v1/players', async () => {
      return HttpResponse.json(emptyApiData);
    })
  );
  renderWithProviders(<App />);
  await waitFor(() => {
    const message = screen.getByText(/Nothing found/i);
    expect(message).toBeInTheDocument();
  });
});
