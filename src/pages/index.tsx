import { wrapper } from '@/lib/store';
import { getPlayers, getPlayer, getRunningQueriesThunk } from '@/lib/nbaApi';
import SearchInput from '@/components/SearchInput/SearchInput';
import SearchOutput from '@/components/SearchOutput/SearchOutput';
import Pagination from '@/components/Pagination/Pagination';
import ErrorComponent from '@/components/ErrorComponent/ErrorComponent';
import {
  DEFAULT_ITEMS_PER_PAGE,
  DEFAULT_PAGE_NUMBER,
} from '@/constants/constants';
import { InferGetServerSidePropsType } from 'next';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { search, page, limit, details } = context.query;
    store.dispatch(
      getPlayers.initiate({
        search: search || '',
        page: page || DEFAULT_PAGE_NUMBER,
        limit: limit || DEFAULT_ITEMS_PER_PAGE,
      })
    );

    if (details) store.dispatch(getPlayer.initiate(details));
    await Promise.all(store.dispatch(getRunningQueriesThunk()));
    return {
      props: {
        playersData: store.getState().data.players,
        playerData: store.getState().data.player,
      },
    };
  }
);

export default function Home({
  playersData,
  playerData,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div className="container">
      <h1>Search NBA players by name</h1>
      <SearchInput />
      <SearchOutput playersData={playersData} playerData={playerData} />
      <Pagination data={playersData} />
      <ErrorComponent />
    </div>
  );
}
