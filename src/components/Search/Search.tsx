import { useState, useEffect } from 'react';
import SearchInput from '../SearchInput/SearchInput';
import SearchOutput from '../SearchOutput/SearchOutput';
import localStorageService from '../../service/LocalStorage';
import type { Item } from '../SearchOutput/SearchOutput';

export const localStorageKey = 'searchValue-kotokatu';

export default function Search() {
  const storedSearchValue = localStorageService.get(localStorageKey);
  const [searchValue, setSearchValue] = useState(storedSearchValue || '');
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  // const throwError = () => {
  //   this.setState(() => {
  //     throw new Error('This is a test error');
  //   });
  // };
  const getSearchResults = async (searchValue: string) => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://swapi.dev/api/people/?search=${searchValue.trim()}
        `
      );
      const data = await res.json();
      setApiData(
        data.results.map((item: Item) => ({
          ...item,
          id: item.url.match(/\/([^/]+)\/$/)?.[1],
        }))
      );
      setIsLoading(false);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getSearchResults(searchValue);
    };
    fetchData();
  }, [searchValue]);

  return (
    <div className="container">
      <h1>Search Star Wars characters by name</h1>
      <SearchInput
        setSearchValue={setSearchValue}
        searchValue={searchValue}
        isLoading={isLoading}
      />
      {isLoading ? <div className="loader" /> : <SearchOutput data={apiData} />}
      {/* <button onClick={throwError} disabled={this.state.isLoading}>
    Error
  </button> */}
    </div>
  );
}
