import React from 'react';
import './App.css';
import Search from './components/Search';
import Header from './components/Header';
import CardList from './components/CardList';

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <section className="search-section">
          <Header />
          <Search />
        </section>
        <section className="results-section">
          <CardList />
        </section>
      </div>
    );
  }
}

export default App;
