import { FormEvent } from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

function SearchInput() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const searchValue = formData.get("search") as string;
    const params = new URLSearchParams(searchParams);
    params.set("search", searchValue);
    params.set("page", "1");
    params.delete("details");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <form className="form-search" onSubmit={handleSubmit}>
      <input
        className="input-search"
        data-testid="input-search"
        type="text"
        name="search"
        defaultValue={searchParams.get("search")?.toString()}
      />
      <button type="submit" data-testid="button-search">
        Search
      </button>
    </form>
  );
}

export default SearchInput;
