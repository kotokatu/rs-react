import { screen, render, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { handlers } from './test-utils/handlers';
import { gsspCtx, assertHasProps, setupMockServer } from './test-utils/utils';
import { getServerSideProps } from '@/pages';
import Home from '@/pages';
import mockRouter from 'next-router-mock';

vi.mock('next/router', async () => await vi.importActual('next-router-mock'));
const server = setupMockServer(...handlers);

afterEach(() => {
  mockRouter.push('/');
});

describe('Details', () => {
  it('Tests if the card details component correctly displays the detailed card data', async () => {
    mockRouter.push({ query: { details: '2' } });
    const res = await getServerSideProps(gsspCtx({ query: { details: '2' } }));
    assertHasProps(res);
    render(<Home {...res.props} />);
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

  it('Tests if clicking the close button in Details updates the URL params', async () => {
    const user = userEvent.setup();
    mockRouter.push({ query: { details: '2' } });
    const res = await getServerSideProps(gsspCtx({ query: { details: '2' } }));
    assertHasProps(res);
    render(<Home {...res.props} />);
    expect(mockRouter.query.details).toEqual('2');
    await user.click(await screen.findByTestId('details-button'));
    expect(mockRouter.query.details).toBeUndefined();
  });

  test('Tests if clicking the close button closes Details', async () => {
    const user = userEvent.setup();
    mockRouter.push({ query: { details: '2' } });
    const res = await getServerSideProps(gsspCtx({ query: { details: '2' } }));
    assertHasProps(res);
    render(<Home {...res.props} />);
    expect(screen.getByTestId('details')).toBeInTheDocument();
    await user.click(await screen.findByTestId('details-button'));
    expect(screen.queryByTestId('details')).toBeNull();
  });
});
