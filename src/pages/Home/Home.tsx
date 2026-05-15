import { useCallback, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import Pagination from '../../components/Pagination';
import CardList from '../../components/CardList';
import Search from '../../components/Search';
import ErrorBoundary from '../../components/ErrorBoundary';
import Bug from '../../components/Bug';
import PokemonDetails from '../../components/PokemonDetails';
import styled from 'styled-components';

const ITEMS_PER_PAGE = 10;

type Item = {
  name: string;
  description: string;
};

type PokemonListItem = {
  name: string;
  url: string;
};

type PokemonListResponse = {
  results: PokemonListItem[];
};

type PokemonDetailsResponse = {
  name: string;
  height: number;
  weight: number;
};

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasTestError, setHasTestError] = useState(false);
  const [totalResults, setTotalResults] = useState(0);

  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;
  const selectedPokemon = searchParams.get('details');

  const handleTestError = () => {
    setHasTestError(true);
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };

  const handleItemClick = (name: string) => {
    setSearchParams({
      page: String(page),
      details: name,
    });
  };

  const handleCloseDetails = () => {
    setSearchParams({ page: String(page) });
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

        const response = await fetch(
          'https://pokeapi.co/api/v2/pokemon?limit=1000&offset=0'
        );

        if (!response.ok) {
          throw new Error('Request failed');
        }

        const data: PokemonListResponse = await response.json();

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
    setSearchParams({ page: '1' });
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

          {selectedPokemon && (
            <DetailsSection>
              <PokemonDetails name={selectedPokemon} />

              <button onClick={handleCloseDetails}>Close</button>
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

const AppWrapper = styled.div`
  padding: 20px;
  font-family: 'Courier New', Courier, monospace;
`;
const SearchSection = styled.section`
  margin-bottom: 30px;
  padding: 20px;
  border: 1px solid black;
  background-color: lightgray;
`;
const ResultSection = styled.section`
  padding: 20px;
  border: 1px solid black;
  background-color: lightslategrey;
  min-height: 200px;
  flex: 1;
`;
const Layout = styled.div`
  display: flex;
  gap: 20px;
`;
const ErrorButtonWrapper = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
`;
const ErrorButton = styled.button`
  padding: 8px 14px;
  background-color: #ff4d4f;
  border: none;
  color: white;
  cursor: pointer;
  border-radius: 4px;
&:hover {
    background-color: #f5b800;
`;
const DetailsSection = styled.section`
 width: 300px;
  border-left: 1px solid lightgrey;
  padding: 10px;
}
  `;
