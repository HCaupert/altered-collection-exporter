import { CellContext } from "@tanstack/react-table";
import { Card } from "@/lib/core/Card";

export function CenteredCell({ getValue }: CellContext<Card, unknown>) {
  return <p className="mx-auto text-center">{getValue() as string}</p>;
}
