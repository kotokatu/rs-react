import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import type { Item } from '@/lib/playersApi';
type OutputItemProps = {
  item: Item;
};

export default function OutputItem({ item }: OutputItemProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  return (
    <li className="output-item">
      <span
        className={`output-item-name${
          searchParams.get('details') === item.id.toString() ? ' active' : ''
        }`}
        onClick={() => {
          const params = new URLSearchParams(searchParams);
          params.set('details', item.id.toString());
          router.push(`${pathname}?${params.toString()}`);
        }}
      >
        {`${item.first_name} ${item.last_name}`}
      </span>
    </li>
  );
}
