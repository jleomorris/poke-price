export interface IProps {
  set: {
    name: string;
    id: string;
  };
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
}

export interface SetDataType {
  id: string;
  name: string;
  series: string;
  printedTotal: number;
  total: number;
  legalities: Legalities;
  ptcgoCode: string;
  releaseDate: string;
  updatedAt: string;
  images: Images;
}

export interface Images {
  symbol: string;
  logo: string;
}

export interface Legalities {
  unlimited: string;
}
