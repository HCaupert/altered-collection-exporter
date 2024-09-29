import ky from "ky";
import { GetCardResponse } from "@/lib/altered/cards";
import { GetStatsResponse } from "@/lib/altered/collection";
import { AlteredPageParams } from "@/lib/altered/AlteredPageParams";
import { useAuth } from "@/lib/auth/AuthProvider";

export function useAlteredApi() {
  const { bearer } = useAuth();

  const alteredApi = ky.create({
    prefixUrl: "https://api.altered.gg",
    headers: {
      authorization: `Bearer ${bearer}`,
      accept: "*/*",
    },
  });

  async function getCards({
    itemsPerPage = 36,
    page = 1,
    locale,
  }: AlteredPageParams) {
    return alteredApi
      .get<GetCardResponse>("cards", {
        searchParams: { collection: true, itemsPerPage, page, locale },
      })
      .json();
  }

  async function getStats({
    itemsPerPage = 36,
    page = 1,
    locale,
  }: AlteredPageParams) {
    return alteredApi
      .get<GetStatsResponse>("cards/stats", {
        searchParams: { collection: true, itemsPerPage, page, locale },
      })
      .json();
  }

  return {
    getCards,
    getStats,
  };
}
