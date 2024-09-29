import { CellContext } from "@tanstack/react-table";
import { Card } from "@/lib/core/Card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function TypeBadge({ getValue }: CellContext<Card, unknown>) {
  const value = getValue() as string;
  let style = "";

  return (
    <Badge
      className={cn(
        "capitalize mx-auto w-20 flex justify-center pointer-events-none",
        style,
      )}
      variant="outline"
    >
      {value.toLowerCase()}
    </Badge>
  );
}
