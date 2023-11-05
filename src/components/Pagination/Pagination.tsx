type PaginationProps = {
  currentPage: number;
  pageCount: number;
  itemsPerPage: number;
  paginate: React.Dispatch<React.SetStateAction<number>>;
  setItemsPerPage: React.Dispatch<React.SetStateAction<number>>;
};
export default function Pagination({
  currentPage,
  pageCount,
  itemsPerPage,
  paginate,
  setItemsPerPage,
}: PaginationProps) {
  return (
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
        disabled={currentPage === pageCount}
        onClick={() => paginate(currentPage + 1)}
      >
        &gt;
      </button>
      <button
        disabled={currentPage === pageCount}
        onClick={() => paginate(pageCount)}
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
  );
}
