import { useSearchParams } from 'react-router-dom';
import DataContext from '../../context/DataContext';
import { useContext } from 'react';

type PaginationProps = {
  currentPage: number;
  itemsPerPage: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
};
export default function Pagination({
  currentPage,
  itemsPerPage,
  setPage,
  setItemsPerPage,
}: PaginationProps) {
  const pages = useContext(DataContext);
  const [, setSearchParams] = useSearchParams();
  const paginate = (page: number) => {
    setPage(page);
    setSearchParams({ page: page.toString() });
  };
  return pages?.meta.total_pages ? (
    <div className="pagination">
      <button disabled={currentPage === 1} onClick={() => paginate(1)}>
        &lt;&lt;
      </button>
      <button
        disabled={currentPage === 1}
        onClick={() => paginate(currentPage - 1)}
      >
        &lt;
      </button>
      <div>{currentPage}</div>
      <button
        data-testid="button-next"
        disabled={currentPage === pages.meta.total_pages}
        onClick={() => paginate(currentPage + 1)}
      >
        &gt;
      </button>
      <button
        disabled={currentPage === pages?.meta.total_pages}
        onClick={() => paginate(pages.meta.total_pages)}
      >
        &gt;&gt;
      </button>
      <select
        className="pagination-select"
        name="page-select"
        id="page-select"
        value={itemsPerPage}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          setItemsPerPage(+e.target.value);
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
