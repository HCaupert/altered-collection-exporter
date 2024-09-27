export type GetCardResponse = {
  "@context": string;
  "@id": string;
  "@type": string;
  "hydra:totalItems": number;
  "hydra:member": Card[];
  "hydra:view": HydraView;
  "hydra:search": HydraSearch;
};

export type Card = {
  "@id": string;
  "@type": string;
  reference: string;
  cardType: CardType;
  rarity: Rarity;
  cardProduct: CardProduct;
  imagePath: string;
  qrUrlDetail: string;
  id: string;
  mainFaction: MainFaction;
  name: string;
  elements: Elements;
  collectorNumberFormatted: string;
};

export type CardType = {
  "@id": string;
  "@type": string;
  reference: string;
  id: string;
  name: string;
};

export type Rarity = {
  "@id": string;
  "@type": string;
  reference: string;
  id: string;
  name: string;
};

export type CardProduct = {
  "@id": string;
  "@type": string;
  reference: string;
  name: string;
};

export type MainFaction = {
  "@id": string;
  "@type": string;
  reference: string;
  color: string;
  id: string;
  name: string;
};

export type Elements = {
  MAIN_COST: string;
  RECALL_COST: string;
  OCEAN_POWER?: string;
  MOUNTAIN_POWER?: string;
  FOREST_POWER?: string;
  MAIN_EFFECT?: string;
  PERMANENT?: string;
  RESERVE?: string;
  ECHO_EFFECT?: string;
};

export type HydraView = {
  "@id": string;
  "@type": string;
  "hydra:first": string;
  "hydra:last": string;
  "hydra:next": string;
};

export type HydraSearch = {
  "@type": string;
  "hydra:template": string;
  "hydra:variableRepresentation": string;
  "hydra:mapping": HydraMapping[];
};

export type HydraMapping = {
  "@type": string;
  variable: string;
  property: string;
  required: boolean;
};
