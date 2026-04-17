import React from 'react';
import './App.css';
import Search from './components/Search';
import Header from './components/Header';
import CardList from './components/CardList';

type Item = {
  name: string;
  description: string;
};

type State = {
  searchTerm: string;
  items: Item[];
  loading: boolean;
};

type Person = {
  name: string;
  height: string;
  gender: string;
};

class App extends React.Component<Record<string, never>, State> {
  state: State = {
    searchTerm: '',
    items: [],
    loading: false,
  };
  handleSearch = async (value: string) => {
    const trimmed = value.trim();

    if (!trimmed) {
      this.setState({ searchTerm: '', items: [] });
      return;
    }

    try {
      this.setState({ loading: true });
      const response = await fetch(
        `https://swapi.dev/api/people/?search=${trimmed}`
      );

      if (!response.ok) {
        throw new Error('Request failed');
      }

      const data = await response.json();

      const items = data.results.map((person: Person) => ({
        name: person.name,
        description: `Height: ${person.height}, Gender: ${person.gender}`,
      }));

      this.setState({
        searchTerm: trimmed,
        items,
      });
    } catch (error) {
      console.error(error);
      this.setState({
        searchTerm: trimmed,
        items: [],
      });
    } finally {
      this.setState({ loading: false });
    }
  };
  render() {
    return (
      <div className="app">
        <section className="search-section">
          <Header />
          <Search onSearch={this.handleSearch} value={this.state.searchTerm} />
        </section>
        <section className="results-section">
          {this.state.loading ? (
            <p>Loading...</p>
          ) : (
            <CardList items={this.state.items} />
          )}
        </section>
      </div>
    );
  }
}

export default App;
