import { useCallback, useEffect, useState } from 'react';
import {
  Outlet,
  useNavigate,
  useSearchParams,
  useLocation,
} from 'react-router-dom';

import { toggleItem } from '../../store/selectedItemsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

import Pagination from '../../components/Pagination';
import CardList from '../../components/CardList';
import Search from '../../components/Search';
import ErrorBoundary from '../../components/ErrorBoundary';
import Bug from '../../components/Bug';
import type { Item, PokemonListResponse } from './home.type';
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
  const [totalResults, setTotalResults] = useState(0);

  const {
    storedValue: searchTerm,
    setValue: setSearchTerm,
    removeValue: removeSearchTerm,
  } = useLocalStorage('searchTerm', '');

  const dispatch = useAppDispatch();
  const selectedItems = useAppSelector((state) => state.selectedItems.items);
  const selectedItemNames = selectedItems.map((item) => item.name);
  const handleToggleSelect = (item: Item) => {
    dispatch(toggleItem(item));
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
      const trimmed = value.trim();

      if (!trimmed) {
        removeSearchTerm();

        setItems([]);
        setError(null);
        setTotalResults(0);

        return;
      }

      try {
        setLoading(true);
        setError(null);

        const data = await fetchData<PokemonListResponse>(
          'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0'
        );

        const filteredItems = data.results.filter((pokemon) =>
          pokemon.name.includes(trimmed.toLowerCase())
        );

        setTotalResults(filteredItems.length);

        const startIndex = (page - 1) * ITEMS_PER_PAGE;

        const visibleItems = filteredItems.slice(
          startIndex,
          startIndex + ITEMS_PER_PAGE
        );

        const newItems = visibleItems.map((pokemon) => ({
          name: pokemon.name,
          description: '',
        }));

        setSearchTerm(trimmed);
        setItems(newItems);
      } catch {
        setSearchTerm(trimmed);
        setItems([]);
        setError('Pokemon not found');
      } finally {
        setLoading(false);
      }
    },
    [page, setSearchTerm, removeSearchTerm]
  );

  const handleUserSearch = (value: string) => {
    setSearchParams({
      page: '1',
    });

    handleSearch(value);
  };

  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    }
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
                  hasNextPage={page * 10 < totalResults}
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

        <ErrorButtonWrapper>
          <ErrorButton onClick={handleTestError}>Error Button</ErrorButton>
        </ErrorButtonWrapper>
      </AppWrapper>
    </ErrorBoundary>
  );
}

export default Home;
