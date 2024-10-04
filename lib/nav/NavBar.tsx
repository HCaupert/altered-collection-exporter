"use client";

import Link from "next/link";
import { NewExportButton } from "@/lib/export/NewExportButton";
import { CsvExportButton } from "@/lib/csv/CsvExportButton";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db/db";

function LastExport() {
  const lastExport = useLiveQuery(() => db.exports.orderBy("date").first());
  if (!lastExport) return <></>;

  return (
    <div className="text-sm justify-self-end">
      <p>Last export: {lastExport?.date.toLocaleDateString()}</p>
      <p className="text-muted-foreground">{lastExport?.email}</p>
    </div>
  );
}

export function NavBar() {
  return (
    <>
      <nav className="h-16 flex items-center p-8 fixed -translate-x-1/2 left-[50%] backdrop-blur z-50 w-[90%] shadow rounded-full group gap-5 max-w-5xl">
        <Link href="/" className="text-xl font-semibold">
          MyAltered
        </Link>
        <div className="grow" />
        <CsvExportButton />
        <NewExportButton />
        <LastExport />
      </nav>
      <div className="h-20" />
    </>
  );
}
