export const PAGE_SIZE = 10;

export const CACHE_TTL = Number(import.meta.env.VITE_CACHE_TTL) || 60;

export const API_URL =
  import.meta.env.VITE_API_URL ?? 'https://pokeapi.co/api/v2';
