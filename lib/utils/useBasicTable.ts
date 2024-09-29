import { parseAsInteger, useQueryState } from "nuqs";

export function useBasicTable<T>({ data }: { data: T }) {
  const [page, setPage] = useQueryState("page", parseAsInteger.withDefault(1));
  const [pageSize, setPageSize] = useQueryState(
    "pageSize",
    parseAsInteger.withDefault(20),
  );

  // const content =
}
