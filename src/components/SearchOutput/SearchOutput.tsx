import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import OutputItem from '../OutputItem/OutputItem';
import { useContext } from 'react';
import DataContext from '../../context/DataContext';
import { ApiResponse } from '../Search/Search';
import Details from '../Details/Details';
import type { Item } from '../Search/Search';

function SearchOutput() {
  const [searchParams] = useSearchParams();
  const apiData = useContext<ApiResponse>(DataContext);
  const [detailsOpen, setDetailsOpen] = useState(!!searchParams.get('details'));

  return (
    <div className="output">
      {apiData?.data && apiData.data.length ? (
        <>
          <ul className="output-list">
            {apiData.data.map((item: Item) => {
              return (
                <OutputItem
                  item={item}
                  key={item.id}
                  openDetails={() => setDetailsOpen(true)}
                />
              );
            })}
          </ul>
          {detailsOpen && <Details openDetails={setDetailsOpen} />}
        </>
      ) : (
        <div className="output-empty">Nothing found</div>
      )}
    </div>
  );
}

export default SearchOutput;
