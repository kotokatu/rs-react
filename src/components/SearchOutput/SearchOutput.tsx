import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { useGetItemsQuery } from '../../features/api/apiSlice';
import OutputItem from '../OutputItem/OutputItem';
import Details from '../Details/Details';
import type { Item } from '../../features/api/apiSlice';
function SearchOutput() {
  const [searchParams] = useSearchParams();
  const { searchValue, page, perPage } = useAppSelector((state) => state.main);

  const { data } = useGetItemsQuery({
    searchValue,
    page,
    perPage,
  });

  return (
    <div className="output">
      {data?.data && data.data.length ? (
        <>
          <ul className="output-list">
            {data.data.map((item: Item) => {
              return <OutputItem item={item} key={item.id} />;
            })}
          </ul>
          {!!searchParams.get('details') && <Details />}
        </>
      ) : (
        <div className="output-empty">Nothing found</div>
      )}
    </div>
  );
}

export default SearchOutput;
