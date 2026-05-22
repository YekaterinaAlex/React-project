import { useCallback, useEffect, useState } from 'react';
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

import type {
  Item,
  PokemonListResponse,
  PokemonDetailsResponse,
} from './home.type';

import {
  AppWrapper,
  SearchSection,
  ResultSection,
  Layout,
  ErrorButtonWrapper,
  ErrorButton,
  DetailsSection,
} from './Home.styled';
import { fetchData } from '../../utils/fetchData';
import useLocalStorage from '../../hooks/useLocalStorage';
const ITEMS_PER_PAGE = 10;

function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasTestError, setHasTestError] = useState(false);

  const [hasNextPage, setHasNextPage] = useState(false);
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

  const handleSearch = useCallback(
    async (value: string) => {
      const trimmed = value.trim().toLowerCase();

      try {
        setLoading(true);
        setError(null);

        if (trimmed) {
          const pokemon = await fetchData<PokemonDetailsResponse>(
            `https://pokeapi.co/api/v2/pokemon/${trimmed}`
          );

          setHasNextPage(false);

          setSearchTerm(trimmed);

          setItems([
            {
              name: pokemon.name,
              description: '',
            },
          ]);

          return;
        }

        const offset = (page - 1) * ITEMS_PER_PAGE;

        const data = await fetchData<PokemonListResponse>(
          `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${ITEMS_PER_PAGE}`
        );

        setHasNextPage(Boolean(data.next));

        const newItems = data.results.map((pokemon) => ({
          name: pokemon.name,
          description: '',
        }));

        setSearchTerm('');
        setItems(newItems);
      } catch {
        setItems([]);
        setHasNextPage(false);

        setError('Pokemon not found');
      } finally {
        setLoading(false);
      }
    },
    [page, setSearchTerm]
  );

  const handleUserSearch = (value: string) => {
    setSearchParams({
      page: '1',
    });

    handleSearch(value);
  };

  useEffect(() => {
    handleSearch(searchTerm);
  }, [page, searchTerm, handleSearch]);

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
            {loading && <p>Loading...</p>}

            {!loading && error && <p>{error}</p>}

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
