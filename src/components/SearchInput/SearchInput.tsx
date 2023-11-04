import { ChangeEvent, FormEvent, useState } from 'react';
import { localStorageKey } from '../Search/Search';
import localStorageService from '../../service/LocalStorage';

type SearchInputProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
  isLoading: boolean;
};

function SearchInput({
  searchValue,
  setSearchValue,
  isLoading,
}: SearchInputProps) {
  const [value, setValue] = useState(searchValue);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorageService.set(localStorageKey, value);
    setSearchValue(value);
  };

  return (
    <form className="form-search" onSubmit={handleSubmit}>
      <input
        className="input-search"
        type="text"
        value={value}
        onChange={handleChange}
        disabled={isLoading}
      />
      <button type="submit" disabled={isLoading}>
        Search
      </button>
    </form>
  );
}

export default SearchInput;
