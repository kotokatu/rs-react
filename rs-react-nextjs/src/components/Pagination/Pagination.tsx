import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { useGetPlayersQuery } from "@/lib/playersApi";
export default function Pagination() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";
  const params = new URLSearchParams(searchParams);

  const { data } = useGetPlayersQuery({ search, page, limit });

  const paginate = (page: number) => {
    params.set("page", page.toString());
    params.delete("details");
    router.push(`${pathname}?${params.toString()}`);
  };

  return data?.meta.total_pages ? (
    <div className="pagination">
      <button disabled={page === "1"} onClick={() => paginate(1)}>
        &lt;&lt;
      </button>
      <button disabled={page === "1"} onClick={() => paginate(+page - 1)}>
        &lt;
      </button>
      <div>{page}</div>
      <button
        data-testid="button-next"
        disabled={page === data.meta.total_pages.toString()}
        onClick={() => paginate(+page + 1)}
      >
        &gt;
      </button>
      <button disabled={page === data?.meta.total_pages.toString()} onClick={() => paginate(data.meta.total_pages)}>
        &gt;&gt;
      </button>
      <select
        className="pagination-select"
        name="page-select"
        id="page-select"
        defaultValue={searchParams.get("limit")?.toString()}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
          params.set("limit", e.target.value);
          paginate(1);
        }}
      >
        {[10, 15, 20, 25].map((value) => (
          <option className="pagination-select-option" value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  ) : null;
}
