"use client";

import { useMemo } from "react";
import { createCSV } from "@/lib/csv/createCsv";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db/db";

export function CsvExportButton() {
  const cards = useLiveQuery(() => db.cards.toArray(), [], []);

  const url = useMemo(() => {
    const csv = createCSV(cards);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8," });
    return URL.createObjectURL(blob);
  }, [cards]);

  return (
    <Button variant="ghost" asChild>
      <Link suppressHydrationWarning href={url}>
        CSV
      </Link>
    </Button>
  );
}
