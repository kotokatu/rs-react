import { useSearchParams, useOutletContext } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Item } from '../SearchOutput/SearchOutput';
import Loader from '../Loader/Loader';
function Details() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [data, setData] = useState<Item | null>(null);
  const [loading, setLoading] = useState(false);
  const [detailsOpen, setDetailsOpen] =
    useOutletContext<
      [boolean, React.Dispatch<React.SetStateAction<boolean>>]
    >();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setDetailsOpen(true);
      const res = await fetch(
        `https://www.balldontlie.io/api/v1/players/${searchParams.get(
          'details'
        )}
        `
      );
      const data = await res.json();
      setData(data);
      setLoading(false);
    };
    if (searchParams.get('details') !== null) fetchData();
  }, [searchParams, setDetailsOpen]);

  return loading ? (
    <div className="details">
      <Loader />
    </div>
  ) : detailsOpen && data ? (
    <div className="details">
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
          <span className="detail-title">Division:</span> {data.team.division}
        </li>
      </ul>
      <button
        className="details-button"
        onClick={() => {
          setDetailsOpen(false);
          searchParams.delete('details');
          setSearchParams(searchParams);
        }}
      >
        X
      </button>
    </div>
  ) : null;
}

export default Details;
