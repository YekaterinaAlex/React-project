import React from 'react';
import './App.css';
import Search from './components/Search';
import Header from './components/Header';
import CardList from './components/CardList';
import ErrorBoundary from './components/ErrorBoundary';
import Bug from './components/Bug';

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
};

type PokemonResponse = {
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
  };
  componentDidMount() {
    const saved = localStorage.getItem('searchTerm');

    if (saved) {
      this.setState({ searchTerm: saved });

      this.handleSearch(saved);
    }
  }

  handleTestError = () => {
    this.setState({ hasTestError: true });
  };

  handleSearch = async (value: string) => {
    const trimmed = value.trim();

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
        `https://pokeapi.co/api/v2/pokemon/${trimmed.toLowerCase()}`
      );

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data: PokemonResponse = await response.json();

      const item = {
        name: data.name,
        description: `Height: ${data.height}, Weight: ${data.weight}`,
      };

      this.setState({
        searchTerm: trimmed,
        items: [item],
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
              <CardList items={this.state.items} />
            )}
          </section>
          <div className="error-button-wrapper">
            <button className="error-button" onClick={this.handleTestError}>
              Error Button
            </button>
          </div>
        </div>
      </ErrorBoundary>
    );
  }
}

export default App;
