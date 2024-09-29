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

  async function getCards(searchParams: AlteredPageParams) {
    return alteredApi.get<GetCardResponse>("cards", { searchParams }).json();
  }

  async function getStats(searchParams: AlteredPageParams) {
    return alteredApi
      .get<GetStatsResponse>("cards/stats", { searchParams })
      .json();
  }

  return {
    getCards,
    getStats,
  };
}
