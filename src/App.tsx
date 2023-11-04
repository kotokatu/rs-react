import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import './App.css';
import { useState } from 'react';
import SearchInput from './components/SearchInput/SearchInput';
import SearchOutput from './components/SearchOutput/SearchOutput';
import localStorageService from './service/LocalStorage';

export const localStorageKey = 'searchValue-kotokatu';

function App() {
  const [searchValue, setSearchValue] = useState(
    () => localStorageService.get(localStorageKey) || ''
  );
  const [apiData, setApiData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getSearchResults = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `https://swapi.dev/api/people/?search=${searchValue.trim()}&page=1
        `
      );
      const data = await res.json();
      setApiData(data.results);
      setIsLoading(false);
    } catch (error: unknown) {
      console.log(error);
    }
  };

  // const throwError = () => {
  //   this.setState(() => {
  //     throw new Error('This is a test error');
  //   });
  // };

  return (
    <div className="container">
      <h1>Search Star Wars characters by name</h1>
      <SearchInput
        value={searchValue}
        setValue={setSearchValue}
        searchItems={getSearchResults}
        isLoading={isLoading}
      />
      {isLoading ? <div className="loader" /> : <SearchOutput data={apiData} />}
      {/* <button onClick={throwError} disabled={this.state.isLoading}>
        Error
      </button> */}
    </div>
  );
}

export default App;
