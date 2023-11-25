import { useSearchParams } from "next/navigation";
import { useGetPlayersQuery } from "@/lib/playersApi";
import OutputItem from "../OutputItem/OutputItem";
import Details from "../Details/Details";
import type { Item } from "@/lib/playersApi";
function SearchOutput() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search") || "";
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

  const { data } = useGetPlayersQuery({ search, page, limit });

  return (
    <div className="output">
      {data?.data.length ? (
        <>
          <ul className="output-list">
            {data.data.map((item: Item) => {
              return <OutputItem item={item} key={item.id} />;
            })}
          </ul>
          {!!searchParams.get("details") && <Details />}
        </>
      ) : (
        <div className="output-empty">Nothing found</div>
      )}
    </div>
  );
}

export default SearchOutput;
