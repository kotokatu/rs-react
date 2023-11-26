import { useRouter } from 'next/router';
import type { Item } from '@/lib/nbaApi';

type OutputItemProps = {
  item: Item;
};

export default function OutputItem({ item }: OutputItemProps) {
  const { push, query } = useRouter();

  return (
    <li className="output-item">
      <span
        className={`output-item-name${
          query.details === item.id.toString() ? ' active' : ''
        }`}
        onClick={() => {
          push({ query: { ...query, details: item.id } });
        }}
      >
        {`${item.first_name} ${item.last_name}`}
      </span>
    </li>
  );
}
