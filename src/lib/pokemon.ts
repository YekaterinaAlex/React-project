import { API_URL, PAGE_SIZE } from '../config/config';

import type {
  PokemonDetailsResponse,
  PokemonListResponse,
} from '../features/Home/home.type';

export async function getPokemonList(page: number) {
  const offset = (page - 1) * PAGE_SIZE;

  const response = await fetch(
    `${API_URL}/pokemon?offset=${offset}&limit=${PAGE_SIZE}`,
    { cache: 'no-store' }
  );

  if (!response.ok) {
    throw new Error('Failed to fetch pokemon list');
  }

  return response.json() as Promise<PokemonListResponse>;
}

export async function getPokemonByName(name: string) {
  const response = await fetch(`${API_URL}/pokemon/${name}`, {
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Failed to fetch pokemon details');
  }

  return response.json() as Promise<PokemonDetailsResponse>;
}
