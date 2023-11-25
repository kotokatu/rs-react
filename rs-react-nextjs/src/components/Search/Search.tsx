import { useState } from 'react';
import SearchInput from '../SearchInput/SearchInput';
import SearchOutput from '../SearchOutput/SearchOutput';
import Pagination from '../Pagination/Pagination';

export default function Search() {
  const [error, setError] = useState(false);

  const throwError = () => {
    throw new Error('This is a test error');
  };

  return (
    <div className="container">
      <h1>Search NBA players by name</h1>
      <SearchInput />
      <SearchOutput />
      <Pagination />
      <button onClick={() => setError(true)}>Error</button>
      {error && throwError()}
    </div>
  );
}
