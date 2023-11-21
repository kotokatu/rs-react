import type { Item } from '../Search/Search';
import { useSearchParams } from 'react-router-dom';

type OutputItemProps = {
  item: Item;
  openDetails: () => void;
};

export default function OutputItem({ item, openDetails }: OutputItemProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <li className="output-item">
      <span
        className={`output-item-name${
          searchParams.get('details') === item.id.toString() ? ' active' : ''
        }`}
        onClick={() => {
          openDetails();
          searchParams.set('details', item.id.toString());
          setSearchParams(searchParams);
        }}
      >
        {`${item.first_name} ${item.last_name}`}
      </span>
    </li>
  );
}
