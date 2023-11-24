import { ChangeEvent, FormEvent, useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from '../../hooks/hooks';
import { updateSearchValue, setPage } from '../../features/main/mainSlice';
import localStorageService from '../../service/LocalStorage';
import { localStorageKey } from '../../constants/constants';
import { useSearchParams } from 'react-router-dom';

function SearchInput() {
  const dispatch = useAppDispatch();
  const { searchValue, mainLoading } = useAppSelector((state) => state.main);
  const [value, setValue] = useState('');
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    setValue(searchValue);
  }, [searchValue]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorageService.set(localStorageKey, value);
    dispatch(updateSearchValue(value));
    dispatch(setPage(1));
    setSearchParams({ page: '1' });
  };

  return (
    <form className="form-search" onSubmit={handleSubmit}>
      <input
        className="input-search"
        data-testid="input-search"
        type="text"
        value={value}
        onChange={handleChange}
        disabled={mainLoading}
      />
      <button type="submit" data-testid="button-search" disabled={mainLoading}>
        Search
      </button>
    </form>
  );
}

export default SearchInput;
