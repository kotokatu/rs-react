import { useRouter } from 'next/router';
import { useGetPlayersQuery } from '@/lib/nbaApi';
import OutputItem from '../OutputItem/OutputItem';
import Details from '../Details/Details';
import type { Item } from '@/lib/nbaApi';
import {
  DEFAULT_ITEMS_PER_PAGE,
  DEFAULT_PAGE_NUMBER,
} from '@/constants/constants';
import type { ApiResponse } from '@/lib/nbaApi';
function SearchOutput({ data }: { data: ApiResponse | null }) {
  const { query } = useRouter();
  const search = query.search || '';
  const page = query.page || DEFAULT_PAGE_NUMBER;
  const limit = query.limit || DEFAULT_ITEMS_PER_PAGE;

  // const { data } = useGetPlayersQuery({ search, page, limit });

  return (
    <div className="output">
      {data?.data.length ? (
        <>
          <ul className="output-list">
            {data.data.map((item: Item) => {
              return <OutputItem item={item} key={item.id} />;
            })}
          </ul>
          {!!query.details && <Details />}
        </>
      ) : (
        <div className="output-empty">Nothing found</div>
      )}
    </div>
  );
}

export default SearchOutput;
