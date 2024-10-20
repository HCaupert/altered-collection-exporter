import { CellContext } from "@tanstack/react-table";
import { Card } from "@/lib/core/Card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { db } from "@/lib/db/db";
import { FileHeart } from "lucide-react";

export function WishListCell(cell: CellContext<Card, any>) {
  const card = cell.row.original;
  const wishListed = card.wishListed!!;
  return (
    <div className="w-full flex">
      <Button
        className={cn(
          wishListed
            ? "text-pink-500 hover:text-pink-500"
            : "text-muted-foreground hover:text-muted-foreground",
          "mx-auto hover:bg-muted",
        )}
        variant="ghost"
        onClick={(e) => {
          db.cards.update(card.reference, { wishListed: !card.wishListed });
          e.stopPropagation();
        }}
      >
        <FileHeart />
      </Button>
    </div>
  );
}
