import { useRouter } from 'next/router';
import type { Item } from '@/lib/nbaApi';
function Details({ data }: { data: Item | null }) {
  const { push, query } = useRouter();

  return (
    data && (
      <div className="details" data-testid="details">
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
          data-testid="details-button"
          onClick={() => {
            delete query.details;
            push({ query: { ...query } });
          }}
        >
          X
        </button>
      </div>
    )
  );
}

export default Details;
