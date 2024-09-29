import { Card as AlteredCard } from "@/lib/altered/cards";
import { Stats } from "@/lib/altered/collection";

export const mapCardsToElement = (card: AlteredCard, stats: Stats) => ({
  rarity: card.rarity.reference,
  name: card.name,
  reference: card.reference,
  faction: card.mainFaction.name,
  imageUrl: card.imagePath,
  amount: stats.inMyCollection,
  amountGlobal: 0, // Yet
  type: card.cardType.reference,
  cost: card.elements.MAIN_COST,
  recallCost: card.elements.RECALL_COST,
  ocean: card.elements.OCEAN_POWER,
  forest: card.elements.FOREST_POWER,
  mountain: card.elements.MOUNTAIN_POWER,
  edition: card.reference.includes("COREKS")
    ? ("COREKS" as const)
    : ("CORE_" as const),
  promo: card.cardProduct.reference,
  possession: calculatePossession(stats.inMyCollection) as Possession,
  globalPossession: calculatePossession(0) as Possession, // yet
  collectorNumberFormatted: card.collectorNumberFormatted,
});

function calculatePossession(amount: number) {
  if (amount === 0) return "NONE";
  if (amount < 3) return "MISSING";
  if (amount === 3) return "COMPLETE";
  return "EXCESS";
}

export type Possession = ReturnType<typeof calculatePossession>;

type Card = ReturnType<typeof mapCardsToElement>;
export type Edition = Card["edition"];

export function updateGlobalOwn(cards: Card[]) {
  const total = new Map<string, number>();

  function getKey(card: Card) {
    if (card.promo === "P") {
      return card.name;
    }
    return card.collectorNumberFormatted;
  }

  cards.forEach((card) => {
    const key = getKey(card);
    const current = total.get(key) ?? 0;
    total.set(key, current + card.amount);
  });

  console.log({ total });

  cards.forEach((card) => {
    const amountGlobal = total.get(getKey(card)) ?? 0;
    card.amountGlobal = amountGlobal;
    card.globalPossession = calculatePossession(amountGlobal);
  });
}
