export type GetStatsResponse = {
  "@context": string;
  "@id": string;
  "@type": string;
  "hydra:totalItems": number;
  "hydra:member": Stats[];
  "hydra:view": HydraView;
  "hydra:search": HydraSearch;
};

export type Stats = {
  "@id": string;
  "@type": string;
  reference: string;
  inMyTradelist: number;
  inMyCollection: number;
  inMyWantlist: boolean;
  foiled: boolean;
};

export type HydraView = {
  "@id": string;
  "@type": string;
  "hydra:first": string;
  "hydra:last": string;
  "hydra:previous": string;
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
