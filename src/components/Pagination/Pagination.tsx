import { useRouter } from 'next/router';
import {
  DEFAULT_ITEMS_PER_PAGE,
  DEFAULT_PAGE_NUMBER,
} from '@/constants/constants';
import type { ApiResponse } from '@/lib/nbaApi';
export default function Pagination({ data }: { data: ApiResponse | null }) {
  const { push, query } = useRouter();

  const page = query.page || DEFAULT_PAGE_NUMBER;
  const limit = query.limit || DEFAULT_ITEMS_PER_PAGE;

  const paginate = (page: number) => {
    delete query.details;
    push({ query: { ...query, page } });
  };

  return data?.meta.total_pages ? (
    <div className="pagination">
      <button disabled={page === '1'} onClick={() => paginate(1)}>
        &lt;&lt;
      </button>
      <button
        data-testid="button-prev"
        disabled={page === '1'}
        onClick={() => paginate(+page - 1)}
      >
        &lt;
      </button>
      <div>{page}</div>
      <button
        data-testid="button-next"
        disabled={page === data.meta.total_pages.toString()}
        onClick={() => paginate(+page + 1)}
      >
        &gt;
      </button>
      <button
        disabled={page === data?.meta.total_pages.toString()}
        onClick={() => paginate(data.meta.total_pages)}
      >
        &gt;&gt;
      </button>
      <select
        className="pagination-select"
        name="page-select"
        id="page-select"
        data-testid="select"
        defaultValue={limit}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          delete query.details;
          push({
            query: {
              ...query,
              page: DEFAULT_PAGE_NUMBER,
              limit: e.target.value,
            },
          });
        }}
      >
        {[10, 15, 20, 25].map((value) => (
          <option
            className="pagination-select-option"
            value={value}
            key={value}
          >
            {value}
          </option>
        ))}
      </select>
    </div>
  ) : null;
}
