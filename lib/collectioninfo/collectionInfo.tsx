"use client";

import { useQuery } from "@tanstack/react-query";
import { db } from "@/lib/db/db";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function CollectionInfo() {
  const { data: count } = useQuery({
    queryFn: () => db.cards.count(),
    queryKey: ["count"],
  });

  if (!count) {
    return <p>You don't have any collection yet, please export one first.</p>;
  }
  return (
    <>
      <p className="text-muted-foreground text-sm">
        Your collection is exported and references {count} cards
      </p>
      <Button asChild className="gap-2" variant="secondary">
        <Link href="/collection">
          Go to your Collection
          <ArrowRight />
        </Link>
      </Button>
    </>
  );
}
