const DEFAULT_API_URL = 'https://pokeapi.co/api/v2';
const DEFAULT_CACHE_TTL_SECONDS = 60;

const parsedCacheTtl = Number(process.env.NEXT_PUBLIC_CACHE_TTL);

export const API_URL = process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_URL;

export const CACHE_TTL_SECONDS =
  Number.isFinite(parsedCacheTtl) && parsedCacheTtl >= 0
    ? parsedCacheTtl
    : DEFAULT_CACHE_TTL_SECONDS;

export const PAGE_SIZE = 10;
