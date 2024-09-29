import { CellContext } from "@tanstack/react-table";
import { Card } from "@/lib/core/Card";

export function CollectionCell(cell: CellContext<Card, unknown>) {
  const amount = cell.row.original.amount;
  const amountGlobal = cell.row.original.amountGlobal;

  return (
    <p className="mx-auto text-center">
      {amount} ({amountGlobal})
    </p>
  );
}
