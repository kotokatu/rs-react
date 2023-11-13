import { ChangeEvent, FormEvent, useState, useContext } from 'react';
import { localStorageKey } from '../Search/Search';
import localStorageService from '../../service/LocalStorage';
import SearchContext from '../../context/SearchContext';

type SearchInputProps = {
  search: (value: string) => void;
  isLoading: boolean;
};

function SearchInput({ search, isLoading }: SearchInputProps) {
  const searchValue = useContext(SearchContext);
  const [value, setValue] = useState(searchValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorageService.set(localStorageKey, value);
    search(value);
  };

  return (
    <form className="form-search" onSubmit={handleSubmit}>
      <input
        className="input-search"
        data-testid="input-search"
        type="text"
        value={value}
        onChange={handleChange}
        disabled={isLoading}
      />
      <button type="submit" data-testid="button-search" disabled={isLoading}>
        Search
      </button>
    </form>
  );
}

export default SearchInput;
