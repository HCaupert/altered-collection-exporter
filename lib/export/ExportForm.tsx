"use client";

import { Button } from "@/components/ui/button";
import { Collection, useGetCollection } from "@/lib/altered/getCollection";
import { useMemo, useState } from "react";
import { createCSV } from "@/lib/createCsv";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/lib/auth/AuthProvider";

const AvailableLocales = ["fr-fr", "en-us"] as const;
type AvailableLocales = (typeof AvailableLocales)[number];

function findDefaultLocale(): AvailableLocales {
  const language = navigator.language.toLowerCase() as AvailableLocales;

  return AvailableLocales.includes(language) ? language : "en-us";
}

export function ExportForm() {
  const { user } = useAuth();
  const { mutate, isPending, data } = useGetCollection();
  const [locale, setLocale] = useState(findDefaultLocale());

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h3>
        Hello <span className="font-bold">{user!.name}</span>
      </h3>
      <p className="text-muted-foreground text-sm">
        You are connected until {new Date(user!.exp).toLocaleTimeString()}
      </p>
      <Label className="space-y-2">
        <span>Language</span>
        <Select
          value={locale}
          onValueChange={(e) => setLocale(e as AvailableLocales)}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="fr-fr">French</SelectItem>
            <SelectItem value="en-us">English</SelectItem>
          </SelectContent>
        </Select>
      </Label>
      <Button onClick={() => mutate({ locale })} disabled={isPending}>
        {isPending ? "Creating..." : "Create export"}
      </Button>
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
    <Button variant="link" asChild className="animate-bounce">
      <Link href={url}>download csv export</Link>
    </Button>
  );
}
