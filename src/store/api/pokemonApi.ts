import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
  PokemonListResponse,
  PokemonDetailsResponse,
} from '../../pages/Home/home.type';

const PAGE_SIZE = 10;
const cacheTtl = Number(import.meta.env.VITE_CACHE_TTL) || 60;
const apiUrl = import.meta.env.VITE_API_URL ?? 'https://pokeapi.co/api/v2';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: apiUrl,
  }),
  keepUnusedDataFor: cacheTtl,
  tagTypes: ['PokemonList', 'PokemonDetails'],
  endpoints: (builder) => ({
    getPokemonList: builder.query<PokemonListResponse, number>({
      query: (page) => {
        const offset = (page - 1) * PAGE_SIZE;

        return `/pokemon?offset=${offset}&limit=${PAGE_SIZE}`;
      },
      providesTags: ['PokemonList'],
    }),

    getPokemonByName: builder.query<PokemonDetailsResponse, string>({
      query: (name) => `/pokemon/${name}`,
      providesTags: (_result, _error, name) => [
        { type: 'PokemonDetails', id: name },
      ],
    }),
  }),
});

export const { useGetPokemonListQuery, useGetPokemonByNameQuery } = pokemonApi;
