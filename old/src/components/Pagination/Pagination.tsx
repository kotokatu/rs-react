import { useSearchParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { setPage, setPerPage } from '../../features/main/mainSlice';
import { useGetItemsQuery } from '../../features/api/apiSlice';

export default function Pagination() {
  const { searchValue, page, perPage } = useAppSelector((state) => state.main);
  const { data } = useGetItemsQuery({
    searchValue,
    page,
    perPage,
  });
  const dispatch = useAppDispatch();
  const [, setSearchParams] = useSearchParams();

  const paginate = (page: number) => {
    dispatch(setPage(page));
    setSearchParams({ page: page.toString() });
  };

  return data?.meta.total_pages ? (
    <div className="pagination">
      <button disabled={page === 1} onClick={() => paginate(1)}>
        &lt;&lt;
      </button>
      <button disabled={page === 1} onClick={() => paginate(page - 1)}>
        &lt;
      </button>
      <div>{page}</div>
      <button
        data-testid="button-next"
        disabled={page === data.meta.total_pages}
        onClick={() => paginate(page + 1)}
      >
        &gt;
      </button>
      <button
        disabled={page === data?.meta.total_pages}
        onClick={() => paginate(data.meta.total_pages)}
      >
        &gt;&gt;
      </button>
      <select
        className="pagination-select"
        name="page-select"
        id="page-select"
        value={perPage}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          dispatch(setPerPage(+e.target.value));
          paginate(1);
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
