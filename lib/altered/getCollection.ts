import { Stats } from "@/lib/altered/collection";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAlteredApi } from "@/lib/altered/useAlteredApi";
import { mapCardsToElement } from "@/lib/altered/mapCardsToElement";
import { createArray } from "@/lib/utils/createArray";
import { InferMutationResult } from "@/lib/utils/inferMutationResult";
import { useAuth } from "@/lib/auth/AuthProvider";
import { AlteredPageParams } from "@/lib/altered/AlteredPageParams";

export function useGetCollection() {
  const { getStats, getCards } = useAlteredApi();
  const { checkExpiry } = useAuth();

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

  async function getCollection(locale: string) {
    const init = await getCards({ itemsPerPage: 1, locale });

    const total = init["hydra:totalItems"];

    const itemsPerPage = 36;
    const totalPages = Math.ceil(total / itemsPerPage);
    const fetches = createArray(totalPages).map((page) => {
      return getPageInfo({ page, itemsPerPage, locale });
    });

    const responses = await Promise.all(fetches);

    const cards = responses.reduce((previousValue, currentValue) => [
      ...previousValue,
      ...currentValue,
    ]);
    const length = cards.length;

    return { cards, total, length };
  }

  return useMutation({
    mutationFn: ({ locale }: { locale: string }) => {
      checkExpiry();
      return getCollection(locale);
    },
    onSuccess: (collection) => {
      toast(`Export successful`, {
        description: `${collection.length} / ${collection.total} cards`,
      });
    },
    onMutate: () => {
      toast("Export started...");
    },
  });
}

export type Collection = InferMutationResult<typeof useGetCollection>;
