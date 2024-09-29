import Dexie, { type EntityTable } from "dexie";
import { Card } from "@/lib/core/Card";

const db = new Dexie("ACE_DB") as Dexie & {
  cards: EntityTable<
    Card,
    "reference" // primary key "id" (for the typings only)
  >;
};

// Schema declaration:
db.version(1).stores({
  cards: "++reference, rarity, name, faction, amount", // primary key "id" (for the runtime!)
});

export { db };
