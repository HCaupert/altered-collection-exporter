import { CellContext } from "@tanstack/react-table";
import { Card } from "@/lib/core/Card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function RarityBadge({ getValue }: CellContext<Card, unknown>) {
  const value = getValue() as string;
  let style = "";
  if (value === "RARE") style = "bg-blue-100 text-blue-800";
  if (value === "UNIQUE") style = "bg-yellow-200 text-yellow-900";

  return (
    <Badge
      className={cn(
        "capitalize mx-auto w-16 flex justify-center pointer-events-none",
        style,
      )}
      variant="secondary"
    >
      {value.toLowerCase()}
    </Badge>
  );
}
