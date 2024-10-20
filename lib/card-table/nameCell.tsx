import { CellContext } from "@tanstack/react-table";
import { Card } from "@/lib/core/Card";

export function NameCell(context: CellContext<Card, unknown>) {
  return <span className="line-clamp-1">{context.getValue() as string}</span>;
}
