import { Item } from './SearchOutput/SearchOutput';
import { useSearchParams } from 'react-router-dom';

type OutputItemProps = {
  item: Item;
};

export default function OutputItem({ item }: OutputItemProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <li className="output-item">
      <span
        className={`output-item-name${
          searchParams.get('details') === item.id.toString() ? ' active' : ''
        }`}
        onClick={() => {
          searchParams.set('details', item.id.toString());
          setSearchParams(searchParams);
        }}
      >
        {`${item.first_name} ${item.last_name}`}
      </span>
    </li>
  );
}
