import { useState, useEffect } from 'react';
import SearchInput from '../SearchInput/SearchInput';
import SearchOutput from '../SearchOutput/SearchOutput';
import localStorageService from '../../service/LocalStorage';
import Loader from '../Loader/Loader';

export const localStorageKey = 'searchValue-kotokatu';

export default function Search() {
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const storedSearchValue = localStorageService.get(localStorageKey);

  // const throwError = () => {
  //   this.setState(() => {
  //     throw new Error('This is a test error');
  //   });
  // };
  const getSearchResults = async (
    searchValue: string,
    page: number = 1,
    perPage: number = 15
  ) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://www.balldontlie.io/api/v1/players/?search=${searchValue.trim()}&page=${
          page - 1
        }&per_page=${perPage}`
      );
      const data = await res.json();
      setApiData(data.data);
      setIsLoading(false);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getSearchResults(storedSearchValue || '');
    };
    fetchData();
  }, [storedSearchValue]);

  return (
    <div className="container">
      <h1>Search NBA players by name</h1>
      <SearchInput
        search={getSearchResults}
        searchValue={storedSearchValue || ''}
        isLoading={isLoading}
      />
      {isLoading ? <Loader /> : <SearchOutput data={apiData} />}
      {/* <button onClick={throwError} disabled={this.state.isLoading}>
    Error
  </button> */}
    </div>
  );
}
