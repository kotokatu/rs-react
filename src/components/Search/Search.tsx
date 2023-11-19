import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { setPage, updateSearchValue } from '../../features/main/mainSlice';
import SearchInput from '../SearchInput/SearchInput';
import SearchOutput from '../SearchOutput/SearchOutput';
import Pagination from '../Pagination/Pagination';
import Loader from '../Loader/Loader';
import localStorageService from '../../service/LocalStorage';
import { localStorageKey } from '../../constants/constants';

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(false);
  const { mainLoading } = useAppSelector((state) => state.main);
  const dispatch = useAppDispatch();

  const throwError = () => {
    throw new Error('This is a test error');
  };

  useEffect(() => {
    const pageNumber = searchParams.get('page');
    if (pageNumber) {
      dispatch(setPage(+pageNumber));
    } else {
      setSearchParams({ page: '1' });
    }
  }, [searchParams, dispatch, setSearchParams]);

  useEffect(() => {
    const storedSearchValue = localStorageService.get(localStorageKey);
    console.log(storedSearchValue);
    if (storedSearchValue) dispatch(updateSearchValue(storedSearchValue));
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Search NBA players by name</h1>
      <SearchInput />
      {mainLoading ? (
        <Loader />
      ) : (
        <>
          <SearchOutput />
          <Pagination />
          <button onClick={() => setError(true)} disabled={mainLoading}>
            Error
          </button>
          {error && throwError()}
        </>
      )}
    </div>
  );
}
