import { Row } from "@tanstack/react-table";
import { Card } from "@/lib/core/Card";

export const booleanContains = (
  row: Row<Card>,
  columnId: string,
  filterValue: any,
) => (filterValue as boolean[]).includes(!!row.original.wishListed);
