import { screen, render } from '@testing-library/react';
import Details from '@/components/Details/Details';
import { mockApiData } from './mocks/mockData';
import userEvent from '@testing-library/user-event';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from './test-utils/createMockRouter';
import SearchOutput from '@/components/SearchOutput/SearchOutput';

describe('Details', () => {
  it('Tests if the card details component correctly displays the detailed card data', async () => {
    const router = createMockRouter({ query: { details: '2' } });
    render(
      <RouterContext.Provider value={router}>
        <Details data={mockApiData.data[1]} />
      </RouterContext.Provider>
    );
    expect(await screen.findByText('Height (ft):')).toBeInTheDocument();
    expect(await screen.findByText('6')).toBeInTheDocument();
    expect(await screen.findByText('Height (in):')).toBeInTheDocument();
    expect(await screen.findByText('3')).toBeInTheDocument();
    expect(await screen.findByText('Weight (lbs):')).toBeInTheDocument();
    expect(await screen.findByText('185')).toBeInTheDocument();
    expect(await screen.findByText('Team:')).toBeInTheDocument();
    expect(
      await screen.findByText('Golden State Warriors')
    ).toBeInTheDocument();
    expect(await screen.findByText('Team abbreviation:')).toBeInTheDocument();
    expect(await screen.findByText('GSW')).toBeInTheDocument();
    expect(await screen.findByText('City:')).toBeInTheDocument();
    expect(await screen.findByText('Conference:')).toBeInTheDocument();
    expect(await screen.findByText('West')).toBeInTheDocument();
    expect(await screen.findByText('Division:')).toBeInTheDocument();
    expect(await screen.findByText('Pacific')).toBeInTheDocument();
  });

  it('Tests that the details are not open when there is no "details" query parameter in the URL', () => {
    const router = createMockRouter({ query: { details: '2' } });
    render(
      <RouterContext.Provider value={router}>
        <SearchOutput
          playersData={mockApiData}
          playerData={mockApiData.data[1]}
        />
      </RouterContext.Provider>
    );
    expect(router.query.details).toEqual('2');
    expect(screen.getByTestId('details')).toBeInTheDocument();
  });
  it('Tests that the details are open when a valid "details" query parameter is present in the URL', () => {
    const router = createMockRouter({ pathname: '/' });
    render(
      <RouterContext.Provider value={router}>
        <SearchOutput
          playersData={mockApiData}
          playerData={mockApiData.data[1]}
        />
      </RouterContext.Provider>
    );
    expect(router.query.details).toBeUndefined();
    expect(screen.queryByTestId('details')).toBeNull();
  });

  it('Tests if clicking the close button in Details updates the URL params', async () => {
    const user = userEvent.setup();
    const router = createMockRouter({ query: { details: '2' } });
    render(
      <RouterContext.Provider value={router}>
        <SearchOutput
          playersData={mockApiData}
          playerData={mockApiData.data[1]}
        />
      </RouterContext.Provider>
    );
    expect(router.query.details).toEqual('2');
    await user.click(await screen.findByTestId('details-button'));
    expect(router.push).toHaveBeenCalled();
    expect(router.query.details).toBeUndefined();
  });
});
