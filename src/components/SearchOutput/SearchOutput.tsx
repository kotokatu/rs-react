import { Outlet, useSearchParams } from 'react-router-dom';
import OutputItem from '../OutputItem';
import { useState } from 'react';

export type Item = {
  id: number;
  first_name: string;
  height_feet: number | null;
  height_inches: number | null;
  weight_pounds: number | null;
  last_name: string;
  position: string;
  team: {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
  };
};

type SearchOutputProps = {
  data: Item[];
};

function SearchOutput({ data }: SearchOutputProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="output">
      {data.length ? (
        <>
          <ul
            className="output-list"
            onClick={(e) => {
              if (
                e.target instanceof HTMLElement &&
                !e.target.classList.contains('output-item-name')
              ) {
                setDetailsOpen(false);
                searchParams.delete('details');
                setSearchParams(searchParams);
              }
            }}
          >
            {data.map((item: Item) => {
              return <OutputItem item={item} key={item.id} />;
            })}
          </ul>
          <Outlet context={[detailsOpen, setDetailsOpen]} />
        </>
      ) : (
        <div className="output-empty">Nothing found</div>
      )}
    </div>
  );
}

export default SearchOutput;
