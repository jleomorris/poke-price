export interface IProps {
  card: {
    id: string;
    name: string;
    supertype: string;
    subtypes: string[];
    hp: string;
    types: string[];
    attacks: Attack[];
    weaknesses: Weakness[];
    retreatCost: string[];
    convertedRetreatCost: number;
    set: Set;
    number: string;
    artist: string;
    rarity: string;
    flavorText: string;
    nationalPokedexNumbers: number[];
    legalities: Legalities;
    images: WelcomeImages;
    tcgplayer: Tcgplayer;
    cardmarket: Cardmarket;
  };
}

export interface Attack {
  name: string;
  cost: string[];
  convertedEnergyCost: number;
  damage: string;
  text: string;
}

export interface Cardmarket {
  url: string;
  updatedAt: string;
  prices: { [key: string]: number | null };
}

export interface WelcomeImages {
  small: string;
  large: string;
}

export interface Legalities {
  unlimited: string;
  expanded: string;
}

export interface Set {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Legalities;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: SetImages;
}

export interface SetImages {
  symbol: string;
  logo: string;
}

export interface Tcgplayer {
  url: string;
  updatedAt: string;
  prices: Prices;
}

export interface Prices {
  normal: Normal;
  reverseHolofoil: Normal;
  holofoil: Normal;
}

export interface Normal {
  low: number;
  mid: number;
  high: number;
  market: number;
  directLow: number | null;
}

export interface Weakness {
  type: string;
  value: string;
}
