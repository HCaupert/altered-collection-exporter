import { CellContext } from "@tanstack/react-table";
import { Card } from "@/lib/core/Card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

export function StatsCell({ row }: CellContext<Card, unknown>) {
  return (
    <div className="flex justify-center gap-2">
      <StatBadge className="bg-emerald-400 " value={row.original.forest} />
      <StatBadge className="bg-amber-600" value={row.original.mountain} />
      <StatBadge className="bg-blue-400" value={row.original.ocean} />
    </div>
  );
}

function StatBadge({
  value,
  className,
}: {
  className?: string;
  value: string | undefined;
}) {
  if (!value) return <></>;
  let isChanged = false;
  if (value?.includes("#")) {
    isChanged = true;
  }
  value = value?.replaceAll("#", "");

  return (
    <Badge
      className={cn(
        "text-center font-bold rounded-full flex justify-center w-8 pointer-events-none",
        isChanged && "text-amber-200",
        className,
      )}
    >
      {value}
    </Badge>
  );
}
