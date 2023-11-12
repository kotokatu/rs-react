import { useState, useEffect } from 'react';
import SearchInput from '../SearchInput/SearchInput';
import SearchOutput from '../SearchOutput/SearchOutput';
import localStorageService from '../../service/LocalStorage';
import Loader from '../Loader/Loader';
import { useSearchParams } from 'react-router-dom';
import Pagination from '../Pagination/Pagination';
import DataContext from '../../context/DataContext';
import SearchContext from '../../context/SearchContext';

const BASE_URL = 'https://www.balldontlie.io/api/v1/players/';

export const localStorageKey = 'searchValue-kotokatu';
export type ApiResponse = {
  data: Item[];
  meta: {
    total_pages: number;
    current_page: number;
    next_page: number | null;
    per_page: number;
    total_count: number;
  };
} | null;

export type Item = {
  id: number;
  first_name: string;
  height_feet: number | null;
  height_inches: number | null;
  weight_pounds: number | null;
  last_name: string;
  position: string;
  team: {
    id: number;
    abbreviation: string;
    city: string;
    conference: string;
    division: string;
    full_name: string;
    name: string;
  };
};

export default function Search() {
  const storedSearchValue = localStorageService.get(localStorageKey);
  const [apiData, setApiData] = useState<ApiResponse>();
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
          `${BASE_URL}?search=${searchValue.trim()}&page=${currentPage}&per_page=${itemsPerPage}`
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

  const updateSearch = (value: string) => {
    setSearchValue(value);
    setCurrentPage(1);
    searchParams.delete('details');
    searchParams.set('page', currentPage.toString());
    setSearchParams();
  };

  return (
    <div className="container">
      <h1>Search NBA players by name</h1>
      <SearchContext.Provider value={searchValue}>
        <SearchInput search={updateSearch} isLoading={isLoading} />
      </SearchContext.Provider>
      {isLoading ? (
        <Loader />
      ) : apiData ? (
        <DataContext.Provider value={apiData}>
          <SearchOutput />
          <Pagination
            currentPage={currentPage}
            setPage={setCurrentPage}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
          />
        </DataContext.Provider>
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
