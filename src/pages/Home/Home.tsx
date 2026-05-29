import { useEffect, useState } from 'react';
import {
  Outlet,
  useNavigate,
  useSearchParams,
  useLocation,
} from 'react-router-dom';

import { toggleItem, clearSelectedItems } from '../../store/selectedItemsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import Pagination from '../../components/Pagination';
import CardList from '../../components/CardList';
import Search from '../../components/Search';
import ErrorBoundary from '../../components/ErrorBoundary';
import Bug from '../../components/Bug';
import Flyout from '../../components/Flyout';
import { downloadCSV } from '../../utils/downloadCSV';
import Spinner from '../../components/Spinner';

import type { Item } from './home.type';

import {
  AppWrapper,
  SearchSection,
  ResultSection,
  Layout,
  ErrorButtonWrapper,
  ErrorButton,
  DetailsSection,
} from './Home.styled';

import {
  useGetPokemonListQuery,
  useGetPokemonByNameQuery,
} from '../../store/api/pokemonApi';

import useLocalStorage from '../../hooks/useLocalStorage';

function Home() {
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

  const handleDownload = () => {
    downloadCSV(selectedItems);
  };
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const currentPage = searchParams.get('page');

    if (!currentPage) {
      setSearchParams({ page: '1' });
    }
  }, [searchParams, setSearchParams]);
  const navigate = useNavigate();

  const location = useLocation();

  const showDetails = location.pathname.includes('/pokemon/');

  const page = Number(searchParams.get('page')) || 1;

  const trimmedSearch = searchTerm.trim().toLowerCase();

  const {
    data: listData,
    isLoading: isListLoading,
    error: listError,
    refetch: refetchList,
  } = useGetPokemonListQuery(page, {
    skip: Boolean(trimmedSearch),
  });
  const {
    data: pokemonData,
    isLoading: isPokemonLoading,
    error: pokemonError,
    refetch: refetchPokemon,
  } = useGetPokemonByNameQuery(trimmedSearch, {
    skip: !trimmedSearch,
  });

  const handleRefresh = () => {
    if (trimmedSearch) {
      refetchPokemon();
      return;
    }

    refetchList();
  };
  const loading = isListLoading || isPokemonLoading;
  const error = listError || pokemonError;
  const items = trimmedSearch
    ? pokemonData
      ? [
          {
            name: pokemonData.name,
            description: '',
          },
        ]
      : []
    : (listData?.results?.map((pokemon) => ({
        name: pokemon.name,
        description: '',
      })) ?? []);

  const hasNextPage = Boolean(listData?.next);
  const handleCloseDetails = () => {
    navigate(`/?page=${page}`);
  };
  const handleTestError = () => {
    setHasTestError(true);
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({
      page: String(newPage),
    });
  };

  const handleItemClick = (name: string) => {
    navigate(`/pokemon/${name}?page=${page}`);
  };

  const handleUserSearch = (value: string) => {
    setSearchTerm(value);

    setSearchParams({
      page: '1',
    });
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

          {showDetails && (
            <DetailsSection>
              <Outlet />

              <ErrorButton onClick={handleCloseDetails}>Close</ErrorButton>
            </DetailsSection>
          )}
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
