export type Item = {
  name: string;
  description: string;
};

export type PokemonListItem = {
  name: string;
  url: string;
};

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
};

export type PokemonDetailsResponse = {
  name: string;
  height: number;
  weight: number;

  sprites: {
    front_default: string;
  };
};
