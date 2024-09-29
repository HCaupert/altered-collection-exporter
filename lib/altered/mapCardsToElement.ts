import { Card } from "@/lib/altered/cards";
import { Stats } from "@/lib/altered/collection";

export const mapCardsToElement = (card: Card, stats: Stats) => ({
  rarity: card.rarity.reference,
  name: card.name,
  reference: card.reference,
  faction: card.mainFaction.name,
  amount: stats.inMyCollection,
});
