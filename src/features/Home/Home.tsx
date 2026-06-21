'use client';
import { useEffect, useState } from 'react';

import { toggleItem, clearSelectedItems } from '../../store/selectedItemsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useRouter, useSearchParams } from 'next/navigation';

import Pagination from '../../components/Pagination';
import CardList from '../../components/CardList';
import Search from '../../components/Search';
import ErrorBoundary from '../../components/ErrorBoundary';
import Bug from '../../components/Bug';
import Flyout from '../../components/Flyout';

import Spinner from '../../components/Spinner';

import type { Item } from './home.type';

import {
  AppWrapper,
  SearchSection,
  ResultSection,
  Layout,
  ErrorButtonWrapper,
  ErrorButton,
} from './Home.styled';

import {
  pokemonApi,
  useGetPokemonListQuery,
  useGetPokemonByNameQuery,
} from '../../store/api/pokemonApi';

import useLocalStorage from '../../hooks/useLocalStorage';
import type { PokemonListResponse } from './home.type';

type HomeProps = {
  initialData?: PokemonListResponse;
  initialPage?: number;
};

function Home({ initialData, initialPage }: HomeProps) {
  const [hasTestError, setHasTestError] = useState(false);
  const { storedValue: searchTerm, setValue: setSearchTerm } = useLocalStorage(
    'searchTerm',
    ''
  );

  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.selectedItems.items);
  const selectedItemNames = selectedItems.map((item) => item.name);
  const handleToggleSelect = (item: Item) => {
    dispatch(toggleItem(item));
  };

  const handleUnselectAll = () => {
    dispatch(clearSelectedItems());
  };

  const handleDownload = async () => {
    const response = await fetch('/api/csv', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(selectedItems),
    });

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = 'selected-pokemon.csv';
    link.click();

    window.URL.revokeObjectURL(url);
  };
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const currentPage = searchParams?.get('page');

    if (!currentPage) {
      router.push('/?page=1');
    }
  }, [searchParams, router]);

  const page = Number(searchParams?.get('page')) || initialPage || 1;

  const trimmedSearch = searchTerm.trim().toLowerCase();

  const {
    data: listData = initialData,
    isLoading: isListLoading,
    error: listError,
  } = useGetPokemonListQuery(page, {
    skip: Boolean(trimmedSearch) || Boolean(initialData),
  });
  const {
    data: pokemonData,
    isLoading: isPokemonLoading,
    error: pokemonError,
  } = useGetPokemonByNameQuery(trimmedSearch, {
    skip: !trimmedSearch,
  });

  const handleRefresh = () => {
    if (trimmedSearch) {
      dispatch(
        pokemonApi.util.invalidateTags([
          { type: 'PokemonDetails', id: trimmedSearch },
        ])
      );

      return;
    }

    dispatch(pokemonApi.util.invalidateTags(['PokemonList']));
  };

  const loading = isListLoading || isPokemonLoading;
  const error = listError || pokemonError;
  const items = trimmedSearch
    ? pokemonData
      ? [
          {
            name: pokemonData.name,
          },
        ]
      : []
    : (listData?.results?.map((pokemon) => ({
        name: pokemon.name,
      })) ?? []);

  const hasNextPage = Boolean(listData?.next);

  const handleTestError = () => {
    setHasTestError(true);
  };
  const handlePageChange = (newPage: number) => {
    router.push(`/?page=${newPage}`);
  };

  const handleItemClick = (name: string) => {
    router.push(`/pokemon/${name}?page=${page}`);
  };

  const handleUserSearch = (value: string) => {
    setSearchTerm(value);
    router.push('/?page=1');
  };

  if (hasTestError) {
    throw new Error('Test error');
  }

  return (
    <ErrorBoundary>
      <Bug mustThrowError={hasTestError} />

      <AppWrapper>
        <SearchSection>
          <Search onSearch={handleUserSearch} value={searchTerm} />
        </SearchSection>

        <Layout>
          <ResultSection>
            <ErrorButton onClick={handleRefresh}>Refresh</ErrorButton>
            {loading && <Spinner data-testid="spinner" />}

            {!loading && error && <p>Pokemon not found</p>}

            {!loading && !error && (
              <>
                <CardList
                  items={items}
                  onItemClick={handleItemClick}
                  selectedItemNames={selectedItemNames}
                  onToggleSelect={handleToggleSelect}
                />

                <Pagination
                  page={page}
                  onPageChange={handlePageChange}
                  hasResults={items.length > 0}
                  hasNextPage={hasNextPage}
                />
              </>
            )}
          </ResultSection>
        </Layout>
        <Flyout
          items={selectedItems}
          onUnselect={handleUnselectAll}
          onDownload={handleDownload}
        />
        <ErrorButtonWrapper>
          <ErrorButton onClick={handleTestError}>Error Button</ErrorButton>
        </ErrorButtonWrapper>
      </AppWrapper>
    </ErrorBoundary>
  );
}

export default Home;
