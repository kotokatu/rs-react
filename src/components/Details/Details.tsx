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
        <li>Height (ft): {data.height_feet || 'n/a'}</li>
        <li>Height (in): {data.height_inches || 'n/a'}</li>
        <li>Weight (lbs): {data.weight_pounds || 'n/a'}</li>
        <li>Team: {data.team.full_name}</li>
        <li>Team abbreviation: {data.team.abbreviation}</li>
        <li>City: {data.team.city}</li>
        <li>Conference: {data.team.conference}</li>
        <li>Division: {data.team.division}</li>
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
