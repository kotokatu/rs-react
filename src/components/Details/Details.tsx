import { useSearchParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Item } from '../Search/Search';
import Loader from '../Loader/Loader';

type DetailsProps = {
  openDetails: React.Dispatch<React.SetStateAction<boolean>>;
};
function Details({ openDetails }: DetailsProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<Item | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const query = searchParams.get('details');
    openDetails(!!query);
    const fetchData = async () => {
      setLoading(true);
      const res = await fetch(
        `https://www.balldontlie.io/api/v1/players/${query}`
      );
      const data = await res.json();
      setData(data);
      setLoading(false);
    };
    if (query) fetchData();
  }, [searchParams, openDetails]);

  return (
    <div className="details" data-testid="details">
      {loading ? (
        <Loader />
      ) : data ? (
        <>
          <ul className="details-list">
            <h3>{`${data.first_name} ${data.last_name}`}</h3>
            <li>
              <span className="detail-title">Height (ft):</span>{' '}
              {data.height_feet || 'n/a'}
            </li>
            <li>
              <span className="detail-title">Height (in):</span>{' '}
              {data.height_inches || 'n/a'}
            </li>
            <li>
              <span className="detail-title">Weight (lbs):</span>{' '}
              {data.weight_pounds || 'n/a'}
            </li>
            <li>
              <span className="detail-title">Team:</span> {data.team.full_name}
            </li>
            <li>
              <span className="detail-title">Team abbreviation:</span>{' '}
              {data.team.abbreviation}
            </li>
            <li>
              <span className="detail-title">City:</span> {data.team.city}
            </li>
            <li>
              <span className="detail-title">Conference:</span>{' '}
              {data.team.conference}
            </li>
            <li>
              <span className="detail-title">Division:</span>{' '}
              {data.team.division}
            </li>
          </ul>
          <button
            className="details-button"
            data-testid="details-button"
            onClick={() => {
              openDetails(false);
              searchParams.delete('details');
              setSearchParams(searchParams);
            }}
          >
            X
          </button>
        </>
      ) : null}
    </div>
  );
}

export default Details;
