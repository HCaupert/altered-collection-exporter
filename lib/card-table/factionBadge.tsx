import { CellContext } from "@tanstack/react-table";
import { Card } from "@/lib/core/Card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function FactionBadge({ getValue }: CellContext<Card, unknown>) {
  const value = getValue() as string;
  let style = "";
  if (value === "Axiom") style = "bg-amber-700 text-amber-50";
  if (value === "Bravos") style = "bg-red-200 text-red-900";
  if (value === "Muna") style = "bg-green-200 text-green-900";
  if (value === "Ordis") style = "bg-blue-200 text-blue-900";
  if (value === "Lyra") style = "bg-pink-200 text-pink-900";
  if (value === "Yzmir") style = "bg-purple-200 text-purple-900";

  return (
    <Badge
      className={cn(
        "capitalize w-16 mx-auto flex justify-center pointer-events-none",
        style,
      )}
      variant="secondary"
    >
      {value.toLowerCase()}
    </Badge>
  );
}
