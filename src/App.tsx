import React from 'react';
import './App.css';
import Search from './components/Search';
import Header from './components/Header';
import CardList from './components/CardList';

type State = {
  searchTerm: string;
};

class App extends React.Component<Record<string, never>, State> {
  state: State = {
    searchTerm: '',
  };
  handleSearch = (value: string) => {
    this.setState({ searchTerm: value });
  };
  render() {
    return (
      <div className="app">
        <section className="search-section">
          <Header />
          <Search onSearch={this.handleSearch} value={this.state.searchTerm} />
        </section>
        <section className="results-section">
          <CardList />
        </section>
      </div>
    );
  }
}

export default App;
