import { useCallback, useEffect, useState } from 'react';
import {
  Outlet,
  useNavigate,
  useSearchParams,
  useLocation,
} from 'react-router-dom';

import Pagination from '../../components/Pagination';
import CardList from '../../components/CardList';
import Search from '../../components/Search';
import ErrorBoundary from '../../components/ErrorBoundary';
import Bug from '../../components/Bug';
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

const ITEMS_PER_PAGE = 10;

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasTestError, setHasTestError] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

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
        localStorage.removeItem('searchTerm');

        setSearchTerm('');
        setItems([]);
        setError(null);
        setTotalResults(0);

        return;
      }

      try {
        setLoading(true);
        setError(null);

        localStorage.setItem('searchTerm', trimmed);

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

        const newItems = await Promise.all(
          visibleItems.map(async (pokemon) => {
            const res = await fetch(pokemon.url);

            const details: PokemonDetailsResponse = await res.json();

            return {
              name: details.name,
              description: `Height: ${details.height}, Weight: ${details.weight}`,
            };
          })
        );

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
    [page]
  );

  const handleUserSearch = (value: string) => {
    setSearchParams({
      page: '1',
    });

    handleSearch(value);
  };

  useEffect(() => {
    const saved = localStorage.getItem('searchTerm');

    if (saved) {
      setSearchTerm(saved);
    }
  }, []);

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
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <>
                <CardList items={items} onItemClick={handleItemClick} />

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
