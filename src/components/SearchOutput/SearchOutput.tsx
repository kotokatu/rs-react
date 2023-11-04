import { Outlet, Link, useSearchParams } from 'react-router-dom';

export type Item = {
  name: string;
  eye_color: string;
  gender: string;
  hair_color: string;
  height: string;
  mass: string;
  skin_color: string;
  url: string;
  birth_year: string;
  id: string;
};

type SearchOutputProps = {
  data: Item[];
};

function SearchOutput({ data }: SearchOutputProps) {
  const [searchParams] = useSearchParams();

  return (
    <div className="output">
      {data.length ? (
        <>
          <ul className="output-list">
            {data.map((item) => {
              return (
                <li
                  onClick={() => searchParams.set('details', item.id)}
                  className="output-item"
                  key={item.url}
                >
                  <Link to={`/?details=${item.id}`}>{item.name}</Link>
                </li>
              );
            })}
          </ul>
          <Outlet />
        </>
      ) : (
        <div>Nothing found</div>
      )}
    </div>
  );
}

export default SearchOutput;
