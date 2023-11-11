import { Outlet, useSearchParams } from 'react-router-dom';
import OutputItem from '../OutputItem';
import { useContext } from 'react';
import DataContext from '../../context/DataContext';
import { ApiResponse } from '../Search/Search';
import type { Item } from '../Search/Search';

function SearchOutput() {
  const [searchParams, setSearchParams] = useSearchParams();
  const apiData = useContext<ApiResponse>(DataContext);

  return (
    <div className="output">
      {apiData?.data && apiData.data.length ? (
        <>
          <ul
            className="output-list"
            onClick={(e: React.MouseEvent<HTMLUListElement, MouseEvent>) => {
              if (
                e.target instanceof HTMLElement &&
                !e.target.classList.contains('output-item-name')
              ) {
                searchParams.delete('details');
                setSearchParams(searchParams);
              }
            }}
          >
            {apiData.data.map((item: Item) => {
              return <OutputItem item={item} key={item.id} />;
            })}
          </ul>
          <Outlet />
        </>
      ) : (
        <div className="output-empty">Nothing found</div>
      )}
    </div>
  );
}

export default SearchOutput;
