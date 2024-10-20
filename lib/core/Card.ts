import { mapCardsToElement } from "@/lib/altered/mapCardsToElement";

export type Card = ReturnType<typeof mapCardsToElement> & {
  wishListed?: boolean;
};
