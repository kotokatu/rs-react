import { ChangeEvent, FormEvent } from 'react';
import { localStorageKey } from '../../App';

type SearchInputProps = {
  value: string;
  setValue: (value: string) => void;
  searchItems: () => void;
  isLoading: boolean;
};

function SearchInput({
  value,
  setValue,
  searchItems,
  isLoading,
}: SearchInputProps) {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    searchItems();
    localStorage.setItem(localStorageKey, value);
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
