export type Item = {
  name: string;
  description: string;
};

export type PokemonListItem = {
  name: string;
  url: string;
};

export type PokemonListResponse = {
  results: PokemonListItem[];
};

export type PokemonDetailsResponse = {
  name: string;
  height: number;
  weight: number;
};
