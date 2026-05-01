import { useCallback, useEffect, useState } from 'react';
import './App.css';
import Home from './pages/Home';
import { Routes, Route, useSearchParams } from 'react-router-dom';

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
function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasTestError, setHasTestError] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const page = Number(searchParams.get('page')) || 1;

  const handleTestError = () => {
    setHasTestError(true);
  };

  const handlePageChange = (newPage: number) => {
    setSearchParams({ page: String(newPage) });
  };
  const handleUserSearch = (value: string) => {
    setSearchParams({ page: '1' });
    handleSearch(value);
  };
  const handleSearch = useCallback(
    async (value: string) => {
      const trimmed = value.trim();

      if (!trimmed) {
        localStorage.removeItem('searchTerm');
        setSearchTerm('');
        setItems([]);
        setError(null);
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
  useEffect(() => {
    if (searchTerm) {
      handleSearch(searchTerm);
    }
  }, [page, searchTerm, handleSearch]);
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Home
            searchTerm={searchTerm}
            items={items}
            loading={loading}
            error={error}
            page={page}
            hasTestError={hasTestError}
            onSearch={handleUserSearch}
            onPageChange={handlePageChange}
            onTestError={handleTestError}
          />
        }
      />
      <Route path="/about" element={<div>About page</div>} />
      <Route path="/*" element={<div> Page not found</div>} />
    </Routes>
  );
}

export default App;
