import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { API_URL, CACHE_TTL_SECONDS, PAGE_SIZE } from '../../config/config';

import type {
  PokemonListResponse,
  PokemonDetailsResponse,
} from '../../features/Home/home.type';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  keepUnusedDataFor: CACHE_TTL_SECONDS,
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
