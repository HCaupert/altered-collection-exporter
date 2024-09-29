import { Table } from "@tanstack/react-table";
import { Card } from "@/lib/core/Card";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "@/components/ui/data-table-faceted-filter";
import {
  costFilter,
  editionFilter,
  factionFilters,
  possessionFilters,
  promoFilter,
  rarityFilters,
  statFilter,
  typeFilters,
} from "@/lib/card-table/filters";
import { DataTableViewOptions } from "@/components/ui/data-table-view-options";

export function CardTableToolBar({ table }: { table: Table<Card> }) {
  return (
    <div className="flex flex-col w-full flex-wrap gap-2">
      <div className="flex w-full gap-2">
        <Input
          placeholder="Search"
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("name")?.setFilterValue(event.target.value);
          }}
          className="h-8 max-w-sm"
        />
        <DataTableViewOptions table={table} />
      </div>
      <div className="flex w-full gap-2 items-center">
        <label className="text-sm font-semibold">Edition:</label>
        <DataTableFacetedFilter
          options={editionFilter}
          title="Edition"
          column={table.getColumn("edition")}
        />
        <DataTableFacetedFilter
          options={promoFilter}
          title="Promo"
          column={table.getColumn("promo")}
        />
      </div>
      <div className="flex w-full gap-2 items-center">
        <label className="text-sm font-semibold">Card info:</label>
        <DataTableFacetedFilter
          options={rarityFilters}
          title="Rarity"
          column={table.getColumn("rarity")}
        />
        <DataTableFacetedFilter
          options={factionFilters}
          title="Faction"
          column={table.getColumn("faction")}
        />
        <DataTableFacetedFilter
          options={typeFilters}
          title="Type"
          column={table.getColumn("type")}
        />
      </div>
      <div className="flex w-full gap-2 items-center">
        <label className="text-sm font-semibold">Stats:</label>
        <DataTableFacetedFilter
          options={statFilter}
          title="Forest"
          column={table.getColumn("forest")}
        />
        <DataTableFacetedFilter
          options={statFilter}
          title="Moutain"
          column={table.getColumn("mountain")}
        />
        <DataTableFacetedFilter
          options={statFilter}
          title="Ocean"
          column={table.getColumn("ocean")}
        />
      </div>
      <div className="flex w-full gap-2 items-center">
        <label className="text-sm font-semibold">Cost:</label>
        <DataTableFacetedFilter
          options={costFilter}
          title="Cost"
          column={table.getColumn("cost")}
        />{" "}
        <DataTableFacetedFilter
          options={costFilter}
          title="Recall"
          column={table.getColumn("recallCost")}
        />
      </div>

      <div className="flex w-full gap-2 items-center">
        <label className="text-sm font-semibold">Collection:</label>
        <DataTableFacetedFilter
          options={possessionFilters}
          title="Global"
          column={table.getColumn("globalPossession")}
        />
        <DataTableFacetedFilter
          options={possessionFilters}
          title="Edition"
          column={table.getColumn("possession")}
        />
      </div>
    </div>
  );
}
