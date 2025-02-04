import { DataTableFilter } from "@/components/ui/data-table-faceted-filter";
import { Edition, Possession } from "@/lib/altered/mapCardsToElement";

type Filters<S extends keyof any | boolean = string> = DataTableFilter<S>[];

export const rarityFilters: Filters = [
  {
    value: "COMMON",
    label: "Common",
  },
  {
    value: "RARE",
    label: "Rare",
  },
  {
    value: "UNIQUE",
    label: "Unique",
  },
];

export const factionFilters: Filters = [
  { value: "Axiom", label: "Axiom" },
  { value: "Bravos", label: "Bravos" },
  { value: "Muna", label: "Muna" },
  { value: "Ordis", label: "Ordis" },
  { value: "Lyra", label: "Lyra" },
  { value: "Yzmir", label: "Yzmir" },
];

export const typeFilters: Filters = [
  { value: "HERO", label: "Hero" },
  { value: "CHARACTER", label: "Character" },
  { value: "PERMANENT", label: "Permanent" },
  { value: "LANDMARK_PERMANENT", label: "Landmark Permanent" },
  { value: "EXPEDITION_PERMANENT", label: "Expedition Permanent" },
  { value: "SPELL", label: "Spell" },
  { value: "TOKEN_MANA", label: "Mana" },
  { value: "TOKEN", label: "Token" },
];

export const statFilter: Filters = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
];
export const costFilter: Filters = [
  { value: "1", label: "1" },
  { value: "2", label: "2" },
  { value: "3", label: "3" },
  { value: "4", label: "4" },
  { value: "5", label: "5" },
  { value: "6", label: "6" },
  { value: "7", label: "7" },
  { value: "8", label: "8" },
  { value: "9", label: "9" },
];

export const promoFilter: Filters = [
  { value: "P", label: "Promo" },
  { value: "B", label: "Non Promo" },
];

export const editionFilter: Filters<Edition> = [
  { value: "COREKS", label: "KS" },
  { value: "CORE_", label: "BTG" },
  { value: "ALIZE", label: "TBF" },
];

export const possessionFilters: Filters<Possession> = [
  { value: "NONE", label: "None (0)" },
  { value: "MISSING", label: "Missing (1-2)" },
  { value: "COMPLETE", label: "Complete (3)" },
  { value: "EXCESS", label: "Excess (4+)" },
];

export const wishListedFilter: Filters<boolean> = [
  { value: true, label: "Wishlisted" },
  { value: false, label: "None" },
];
