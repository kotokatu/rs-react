import { useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../hooks/hooks';
import { useGetItemQuery } from '../../features/api/apiSlice';
import Loader from '../Loader/Loader';
import { useEffect, useState } from 'react';

function Details() {
  const [searchParams, setSearchParams] = useSearchParams();
  const id = searchParams.get('details') as string;
  const [skip, setSkip] = useState(true);
  const { detailsLoading } = useAppSelector((state) => state.details);
  const { data } = useGetItemQuery(id, { skip });

  useEffect(() => {
    if (id) setSkip(false);
  }, [id]);

  return (
    <div className="details" data-testid="details">
      {detailsLoading ? (
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
