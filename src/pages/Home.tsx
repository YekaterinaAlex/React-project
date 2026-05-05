import Header from '../components/Header';
import Pagination from '../components/Pagination/Pagination';
import CardList from '../components/CardList/CardList';
import Search from '../components/Search/Search';
import ErrorBoundary from '../components/ErrorBoundary';
import Bug from '../components/Bug';
import PokemonDetails from '../components/PokemonDetails/PokemonDetails';

type Item = {
  name: string;
  description: string;
};

type Props = {
  searchTerm: string;
  items: Item[];
  loading: boolean;
  error: string | null;
  page: number;
  hasTestError: boolean;
  onSearch: (value: string) => void;
  onPageChange: (page: number) => void;
  onTestError: () => void;
  totalResults: number;
  onItemClick: (name: string) => void;
  selectedPokemon: string | null;
  onCloseDetails: () => void;
};

function Home({
  searchTerm,
  items,
  loading,
  error,
  page,
  hasTestError,
  onSearch,
  onPageChange,
  onTestError,
  totalResults,
  onItemClick,
  selectedPokemon,
  onCloseDetails,
}: Props) {
  if (hasTestError) {
    throw new Error('Test error');
  }

  return (
    <ErrorBoundary>
      <Bug mustThrowError={hasTestError} />

      <div className="app">
        <section className="search-section">
          <Header />
          <Search onSearch={onSearch} value={searchTerm} />
        </section>
        <div className="layout">
          <section className="results-section">
            {loading ? (
              <p>Loading...</p>
            ) : error ? (
              <p>{error}</p>
            ) : (
              <>
                <CardList items={items} onItemClick={onItemClick} />

                <Pagination
                  page={page}
                  onPageChange={onPageChange}
                  hasResults={items.length > 0}
                  hasNextPage={page * 10 < totalResults}
                />
              </>
            )}
          </section>
          {selectedPokemon && (
            <section className="details-section">
              <PokemonDetails name={selectedPokemon} />
              <button onClick={onCloseDetails}>Close</button>
            </section>
          )}
        </div>

        <div className="error-button-wrapper">
          <button className="error-button" onClick={onTestError}>
            Error Button
          </button>
        </div>
      </div>
    </ErrorBoundary>
  );
}

export default Home;
