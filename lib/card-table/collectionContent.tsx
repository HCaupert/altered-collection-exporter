"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db/db";
import {
  ColumnDef,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  TableState,
  useReactTable,
} from "@tanstack/react-table";
import { parseAsJson, useQueryState } from "nuqs";
import { useEffect } from "react";
import { CardTableToolBar } from "@/lib/card-table/cardTableToolBar";
import { DataTable } from "@/components/ui/data-table";
import { DataTablePagination } from "@/components/ui/data-table-pagination";
import { Card } from "@/lib/core/Card";
import { FactionBadge } from "@/lib/card-table/factionBadge";
import { RarityBadge } from "@/lib/card-table/rarityBadge";
import { StatsCell } from "@/lib/card-table/statsCell";
import { TypeBadge } from "@/lib/card-table/typeBadge";
import { CenteredCell } from "@/lib/card-table/centeredCell";
import { CollectionCell } from "@/lib/card-table/collectionCell";
import { useKeyDownNavigateTable } from "@/lib/card-table/useKeyDownNavigateTable";

const columns: ColumnDef<Card>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "faction",
    header: "Faction",
    cell: FactionBadge,
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "rarity",
    header: "Rarity",
    cell: RarityBadge,
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "In collection",
    header: "In Collection",
    cell: CollectionCell,
  },
  {
    accessorKey: "stats",
    header: "Stats",
    cell: StatsCell,
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: TypeBadge,
    filterFn: "arrIncludesSome",
  },
  {
    accessorKey: "forest",
    header: "Forest",
    cell: CenteredCell,
    filterFn: "arrIncludesSome",
    enableHiding: false,
  },
  {
    accessorKey: "mountain",
    header: "Mountain",
    cell: CenteredCell,
    filterFn: "arrIncludesSome",
    enableHiding: false,
  },
  {
    accessorKey: "ocean",
    header: "Ocean",
    cell: CenteredCell,
    filterFn: "arrIncludesSome",
    enableHiding: false,
  },
  {
    accessorKey: "cost",
    header: "Cost",
    cell: CenteredCell,
    maxSize: 10,
    filterFn: "arrIncludesSome",
    enableHiding: false,
  },
  {
    accessorKey: "recallCost",
    header: "RecallCost",
    cell: CenteredCell,
    filterFn: "arrIncludesSome",
    enableHiding: false,
  },
  {
    accessorKey: "promo",
    filterFn: "arrIncludesSome",
    enableHiding: false,
  },
  {
    accessorKey: "possession",
    filterFn: "arrIncludesSome",
    enableHiding: false,
  },
  {
    accessorKey: "globalPossession",
    filterFn: "arrIncludesSome",
    enableHiding: false,
  },
  {
    accessorKey: "edition",
    filterFn: "arrIncludesSome",
    enableHiding: false,
  },
];

export function CollectionContent() {
  const cards = useLiveQuery(() => db.cards.toArray(), [], []);

  const table = useReactTable({
    data: cards,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableMultiRowSelection: false,
    initialState: {
      columnVisibility: {
        forest: false,
        mountain: false,
        ocean: false,
        cost: false,
        recallCost: false,
        promo: false,
        possession: false,
        globalPossession: false,
        edition: false,
      },
    },
  });

  useKeyDownNavigateTable(table);

  const [tableState, setTableState] = useQueryState<TableState>("table", {
    ...parseAsJson(),
    defaultValue: table.initialState,
  });

  table.setOptions((prev) => ({
    ...prev,
    state: tableState,
    onStateChange: setTableState,
  }));

  useEffect(() => {
    console.log(
      table.getRowModel().rows.map((row) => ({
        selected: row.getIsSelected(),
        index: row.index,
      })),
    );
    const anyRowSelected = !!table
      .getRowModel()
      .rows.find((row) => row.getIsSelected());

    if (!anyRowSelected) {
      table.getRowModel().rows[0]?.toggleSelected(true);
    }
  }, [table.getRowModel().rows[0]?.original.reference]);

  const selected = table.getSelectedRowModel().rows[0]?.original;

  return (
    <div className="w-full grid grid-cols-4">
      <div className="col-span-3 space-y-2 h-fit">
        <CardTableToolBar table={table} />
        <DataTable table={table} />
        <DataTablePagination table={table} />
      </div>
      <div className="flex items-center justify-center p-5">
        {selected && (
          <img
            src={selected?.imageUrl}
            className="object-contain rounded-xl"
            alt="card-image"
          />
        )}
      </div>
    </div>
  );
}
