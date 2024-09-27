"use client";

import { useAuth } from "@/app/AuthProvider";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { Collection, getCollection } from "@/lib/altered/getCollection";
import { useMemo } from "react";
import { createCSV } from "@/lib/createCsv";
import Link from "next/link";
import { toast } from "sonner";

function useExportCollection() {
  const { bearer } = useAuth();

  return useMutation({
    mutationFn: () => getCollection(bearer!),
    onSuccess: (collection) => {
      toast(`Export successful`, {
        description: `${collection.length} / ${collection.total} cards`,
      });
    },
    onMutate: () => {
      toast("Export started...");
    },
  });
}

export function ExportForm() {
  const { user } = useAuth();
  const { mutate, isPending, data } = useExportCollection();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h3>
        Hello <span className="font-bold">{user!.name}</span>
      </h3>
      <Button onClick={() => mutate()} disabled={isPending}>
        {isPending ? "Creating..." : "Create export"}
      </Button>
      {data && <DownloadButton collection={data} />}
    </div>
  );
}

function DownloadButton({ collection }: { collection: Collection }) {
  const url = useMemo(() => {
    const csv = createCSV(collection.cards);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8," });
    return URL.createObjectURL(blob);
  }, []);

  return (
    <Button variant="link" asChild>
      <Link href={url}>download csv export</Link>
    </Button>
  );
}
