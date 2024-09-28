import ky from "ky";
import { GetCardResponse, Card } from "@/lib/altered/cards";
import { GetStatsResponse, Stats } from "@/lib/altered/collection";

const headers = (bearer: string) => ({
  authorization: `Bearer ${bearer}`,
  accept: "*/*",
});

export const alteredApi = ky.create({
  prefixUrl: "https://api.altered.gg",
});

const createArray = (n: number): number[] =>
  Array.from({ length: n }, (_, i) => i + 1);

async function getCards({
  bearer,
  itemsPerPage = 36,
  page = 1,
  locale,
}: {
  locale: string;
  bearer: string;
  itemsPerPage?: number;
  page?: number;
}) {
  console.log("Fetching cards...", { itemsPerPage, page });
  return alteredApi
    .get<GetCardResponse>("cards", {
      searchParams: { collection: true, itemsPerPage, page, locale },
      headers: headers(bearer),
    })
    .json();
}

async function getStats({
  bearer,
  itemsPerPage = 36,
  page = 1,
  locale,
}: {
  locale: string;
  bearer: string;
  itemsPerPage?: number;
  page?: number;
}) {
  console.log("Fetching collection...", { itemsPerPage, page });
  return alteredApi
    .get<GetStatsResponse>("cards/stats", {
      searchParams: { collection: true, itemsPerPage, page, locale },
      headers: headers(bearer),
    })
    .json();
}

async function getPageInfo(params: {
  itemsPerPage?: number;
  page?: number;
  bearer: string;
  locale: string;
}) {
  const [cards, stats] = await Promise.all([
    getCards(params),
    getStats(params),
  ]);

  const statsMap = stats["hydra:member"].reduce(
    (acc, stat) => {
      acc[stat.reference] = stat;
      return acc;
    },
    {} as Record<string, Stats>,
  );

  return cards["hydra:member"].map((card) =>
    getFields(card, statsMap[card.reference]),
  );
}

function getFields(card: Card, stats: Stats) {
  return {
    rarity: card.rarity.reference,
    name: card.name,
    reference: card.reference,
    faction: card.mainFaction.name,
    amount: stats.inMyCollection,
  };
}

export async function getCollection(locale: string, bearer: string) {
  const init = await getCards({ itemsPerPage: 1, bearer, locale });

  const total = init["hydra:totalItems"];

  const itemsPerPage = 36;
  const totalPages = Math.ceil(total / itemsPerPage);
  const fetches = createArray(totalPages).map((page) => {
    return getPageInfo({ page, itemsPerPage, bearer, locale });
  });

  const responses = await Promise.all(fetches);

  const cards = responses.reduce((previousValue, currentValue) => [
    ...previousValue,
    ...currentValue,
  ]);
  const length = cards.length;

  return { cards, total, length };
}

export type Collection = Awaited<ReturnType<typeof getCollection>>;
