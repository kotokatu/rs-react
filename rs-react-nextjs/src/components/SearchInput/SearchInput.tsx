import { FormEvent } from 'react';
import { useRouter } from 'next/router';
import { DEFAULT_PAGE_NUMBER } from '@/constants/constants';

function SearchInput() {
  const { push, query } = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const searchValue = formData.get('search') as string;
    push({
      query: { ...query, search: searchValue, page: DEFAULT_PAGE_NUMBER },
    });
  };

  return (
    <form className="form-search" onSubmit={handleSubmit}>
      <input
        className="input-search"
        data-testid="input-search"
        type="text"
        name="search"
        defaultValue={query.search}
      />
      <button type="submit" data-testid="button-search">
        Search
      </button>
    </form>
  );
}

export default SearchInput;
