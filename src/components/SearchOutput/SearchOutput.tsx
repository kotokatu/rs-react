import { useRouter } from 'next/router';
import OutputItem from '../OutputItem/OutputItem';
import Details from '../Details/Details';

import type { ApiResponse, Item } from '@/lib/nbaApi';
function SearchOutput({
  playersData,
  playerData,
}: {
  playersData: ApiResponse | null;
  playerData: Item | null;
}) {
  const { query } = useRouter();

  return (
    <div className="output">
      {playersData?.data.length ? (
        <>
          <ul className="output-list">
            {playersData.data.map((item: Item) => {
              return <OutputItem item={item} key={item.id} />;
            })}
          </ul>
          {!!query.details && <Details data={playerData} />}
        </>
      ) : (
        <div className="output-empty">Nothing found</div>
      )}
    </div>
  );
}

export default SearchOutput;
