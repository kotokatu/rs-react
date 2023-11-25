import { wrapper } from "@/lib/store";
import { getPlayers, getPlayer, getRunningQueriesThunk } from "@/lib/playersApi";
import Search from "@/components/Search/Search";
import { DEFAULT_ITEMS_PER_PAGE, DEFAULT_PAGE_NUMBER } from "@/constants/constants";

export const getServerSideProps = wrapper.getServerSideProps((store) => async (context) => {
  const { search, page, limit, details } = context.query;
  store.dispatch(
    getPlayers.initiate({
      search: search || "",
      page: page || DEFAULT_PAGE_NUMBER,
      limit: limit || DEFAULT_ITEMS_PER_PAGE,
    })
  );

  if (details) store.dispatch(getPlayer.initiate(details));
  await Promise.all(store.dispatch(getRunningQueriesThunk()));
  return {
    props: {},
  };
});

export default function Players() {
  return (
    <>
      <Search />
    </>
  );
}
