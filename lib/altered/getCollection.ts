import { Stats } from "@/lib/altered/collection";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAlteredApi } from "@/lib/altered/useAlteredApi";
import {
  mapCardsToElement,
  updateGlobalOwn,
} from "@/lib/altered/mapCardsToElement";
import { createArray } from "@/lib/utils/createArray";
import { InferMutationResult } from "@/lib/utils/inferMutationResult";
import { useAuth } from "@/lib/auth/AuthProvider";
import { AlteredPageParams } from "@/lib/altered/AlteredPageParams";
import { db } from "@/lib/db/db";

export function useExportCollection() {
  const { getStats, getCards } = useAlteredApi();
  const auth = useAuth();

  async function getPageInfo(params: AlteredPageParams) {
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
      mapCardsToElement(card, statsMap[card.reference]),
    );
  }

  async function fetchAllPages(params: AlteredPageParams) {
    const init = await getCards({ ...params, itemsPerPage: 1 });

    const total = init["hydra:totalItems"];

    const itemsPerPage = 36;
    const totalPages = Math.ceil(total / itemsPerPage);

    console.log(
      `Found ${total} items, fetching ${totalPages} pages of cards and stats.`,
    );
    const fetches = createArray(totalPages).map((page) => {
      return getPageInfo({ ...params, page, itemsPerPage });
    });

    const responses = await Promise.all(fetches);

    console.log(`Fetch completed. Joining results.`);
    return responses.reduce((previousValue, currentValue) => [
      ...previousValue,
      ...currentValue,
    ]);
  }

  async function getCollection(locale: string) {
    console.log("Starting collection export. Fetching non unique cards");
    const nonUniqueCards = await fetchAllPages({ locale });
    console.log("Non unique cards fetched, fetching unique");
    const uniqueCards = await fetchAllPages({
      locale,
      "rarity[]": "UNIQUE",
      collection: true,
    });

    const cards = uniqueCards.concat(nonUniqueCards);
    const length = cards.length;

    console.log(
      `Collection joined for ${length} card, calculating global possession.`,
    );

    updateGlobalOwn(cards);

    console.log(`Calculation complete.`);

    return { cards, length };
  }

  return useMutation({
    mutationFn: async ({ locale }: { locale: string }) => {
      auth.checkExpiry();
      const collection = await getCollection(locale);
      await db.cards.bulkPut(collection.cards);
      await db.exports.put({ email: auth.user!.email, date: new Date() });
      return collection;
    },
    onSuccess: (collection) => {
      toast(`Export successful`, {
        description: `${collection.length} cards`,
      });
    },
    onMutate: () => {
      toast("Export started...");
    },
  });
}

export type Collection = InferMutationResult<typeof useExportCollection>;
