import { Table } from "@tanstack/react-table";
import { useKeyDown } from "@/lib/keydown/useKeyDown";
import { useEffect } from "react";
import { Card } from "@/lib/core/Card";

export function useTableSelection(table: Table<Card>) {
  useKeyDown("ArrowDown", () => {
    const targetIndex =
      (table.getSelectedRowModel().rows[0].index + 1) %
      table.getState().pagination.pageSize;
    const rows = table.getRowModel().rows;

    if (targetIndex === 0) return table.nextPage();

    rows[targetIndex]?.toggleSelected(true);
  });

  useKeyDown("ArrowUp", () => {
    const targetIndex =
      (table.getSelectedRowModel().rows[0].index - 1) %
      table.getState().pagination.pageSize;
    const rows = table.getPaginationRowModel().rows;

    if (targetIndex === table.getState().pagination.pageSize - 1) {
      const currentIndex = table.getSelectedRowModel().rows[0].index;
      table
        .getPrePaginationRowModel()
        .rows[currentIndex - 1]?.toggleSelected(true);
      table.previousPage();
      return;
    }

    return rows[targetIndex]?.toggleSelected(true);
  });

  useKeyDown("ArrowRight", () => {
    table.getCanNextPage() && table.nextPage();
  });

  useKeyDown("ArrowLeft", () => {
    table.previousPage();
  });

  useEffect(() => {
    const anyRowSelected = !!table
      .getRowModel()
      .rows.find((row) => row.getIsSelected());

    if (!anyRowSelected) {
      table.getRowModel().rows[0]?.toggleSelected(true);
    }
  }, [table.getRowModel().rows[0]?.original.reference]);
}
