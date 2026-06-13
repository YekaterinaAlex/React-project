import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import type {
  PokemonListResponse,
  PokemonDetailsResponse,
} from '../../pages/Home/home.type';

import { API_URL, CACHE_TTL, PAGE_SIZE } from '../../config/config';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  keepUnusedDataFor: CACHE_TTL,
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
