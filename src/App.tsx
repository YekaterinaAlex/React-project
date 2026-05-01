import React from 'react';
import './App.css';
import Search from './components/Search';
import Header from './components/Header';
import CardList from './components/CardList';
import ErrorBoundary from './components/ErrorBoundary';
import Bug from './components/Bug';
import { Routes, Route } from 'react-router-dom';
import Pagination from './components/Pagination';

const ITEMS_PER_PAGE = 10;

type Item = {
  name: string;
  description: string;
};

type State = {
  searchTerm: string;
  items: Item[];
  loading: boolean;
  error: string | null;
  hasTestError: boolean;
  page: number;
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
class App extends React.Component<Record<string, never>, State> {
  state: State = {
    searchTerm: '',
    items: [],
    loading: false,
    error: null,
    hasTestError: false,
    page: this.getPageFromURL(),
  };
  componentDidMount() {
    const params = new URLSearchParams(window.location.search);

    if (!params.get('page')) {
      params.set('page', '1');
      window.history.replaceState({}, '', `?${params.toString()}`);
    }

    const saved = localStorage.getItem('searchTerm');

    if (saved) {
      this.setState({ searchTerm: saved });

      this.handleSearch(saved);
    }
  }

  handleTestError = () => {
    this.setState({ hasTestError: true });
  };

  getPageFromURL() {
    const params = new URLSearchParams(window.location.search);
    return Number(params.get('page')) || 1;
  }
  handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(window.location.search);
    params.set('page', String(newPage));

    window.history.pushState({}, '', `?${params.toString()}`);

    this.setState({ page: newPage }, () => {
      this.handleSearch(this.state.searchTerm);
    });
  };
  handleSearch = async (value: string) => {
    const trimmed = value.trim();
    const isNewSearch = trimmed !== this.state.searchTerm;
    if (isNewSearch) {
      const params = new URLSearchParams(window.location.search);
      params.set('page', '1');
      window.history.pushState({}, '', `?${params.toString()}`);
    }

    if (!trimmed) {
      localStorage.removeItem('searchTerm');
      this.setState({
        searchTerm: '',
        items: [],
        error: null,
      });
      return;
    }

    try {
      this.setState({ loading: true, error: null });
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

      const startIndex = (this.state.page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE;

      const visibleItems = filteredItems.slice(startIndex, endIndex);

      const items = await Promise.all(
        visibleItems.map(async (pokemon) => {
          const detailsResponse = await fetch(pokemon.url);

          if (!detailsResponse.ok) {
            throw new Error('Details request failed');
          }

          const details: PokemonDetailsResponse = await detailsResponse.json();

          return {
            name: details.name,
            description: `Height: ${details.height}, Weight: ${details.weight}`,
          };
        })
      );
      this.setState({
        searchTerm: trimmed,
        items,
        page: isNewSearch ? 1 : this.state.page,
      });
    } catch (error) {
      console.error(error);
      this.setState({
        searchTerm: trimmed,
        items: [],
        error: 'Pokemon not found',
      });
    } finally {
      this.setState({ loading: false });
    }
  };
  render() {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <ErrorBoundary>
              <Bug mustThrowError={this.state.hasTestError} />
              <div className="app">
                <section className="search-section">
                  <Header />
                  <Search
                    onSearch={this.handleSearch}
                    value={this.state.searchTerm}
                  />
                </section>
                <section className="results-section">
                  {this.state.loading ? (
                    <p>Loading...</p>
                  ) : this.state.error ? (
                    <p>{this.state.error}</p>
                  ) : (
                    <>
                      <CardList items={this.state.items} />
                      <Pagination
                        page={this.state.page}
                        onPageChange={this.handlePageChange}
                        hasResults={this.state.items.length > 0}
                      />
                    </>
                  )}
                </section>
                <div className="error-button-wrapper">
                  <button
                    className="error-button"
                    onClick={this.handleTestError}
                  >
                    Error Button
                  </button>
                </div>
              </div>
            </ErrorBoundary>
          }
        />
        <Route path="/about" element={<div>About page</div>} />
        <Route path="/*" element={<div> Page not found</div>} />
      </Routes>
    );
  }
}

export default App;
