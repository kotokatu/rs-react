import { useState, useEffect } from 'react';
import SearchInput from '../SearchInput/SearchInput';
import SearchOutput from '../SearchOutput/SearchOutput';
import localStorageService from '../../service/LocalStorage';
import Loader from '../Loader/Loader';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import type { Item } from '../SearchOutput/SearchOutput';

export const localStorageKey = 'searchValue-kotokatu';
type ApiResponse = {
  data: Item[];
  meta: {
    total_pages: number;
    current_page: number;
    next_page: number;
    per_page: number;
    total_count: number;
  };
};

export default function Search() {
  const storedSearchValue = localStorageService.get(localStorageKey);
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState(storedSearchValue || '');
  const [error, setError] = useState(false);

  const pageNumber = searchParams.get('page');
  const [currentPage, setCurrentPage] = useState(pageNumber ? +pageNumber : 1);

  const throwError = () => {
    throw new Error('This is a test error');
  };

  useEffect(() => {
    if (pageNumber) {
      setCurrentPage(+pageNumber);
    } else {
      searchParams.set('page', '1');
      setSearchParams(searchParams);
    }
  }, [searchParams, setSearchParams, pageNumber]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(
          `https://www.balldontlie.io/api/v1/players/?search=${searchValue.trim()}&page=${currentPage}&per_page=${itemsPerPage}`
        );
        const data = await res.json();
        setApiData(data);
      } catch (error: unknown) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [searchValue, itemsPerPage, currentPage]);

  return (
    <div className="container">
      <h1>Search NBA players by name</h1>
      <SearchInput
        searchValue={searchValue}
        setSearchValue={setSearchValue}
        setCurrentPage={setCurrentPage}
        isLoading={isLoading}
      />
      {isLoading ? (
        <Loader />
      ) : apiData ? (
        <>
          <SearchOutput data={apiData.data} />
          <Pagination
            currentPage={currentPage}
            setPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            pageCount={apiData.meta.total_pages}
          />
        </>
      ) : (
        <div className="output-empty">
          Something went wrong. Please try again
        </div>
      )}
      <button onClick={() => setError(true)} disabled={isLoading}>
        Error
      </button>
      {error && throwError()}
    </div>
  );
}
