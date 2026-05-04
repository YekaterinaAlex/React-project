import Header from '../components/Header';
import Pagination from '../components/Pagination/Pagination';
import CardList from '../components/CardList/CardList';
import Search from '../components/Search/Search';
import ErrorBoundary from '../components/ErrorBoundary';
import Bug from '../components/Bug';

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

        <section className="results-section">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              <CardList items={items} />

              <Pagination
                page={page}
                onPageChange={onPageChange}
                hasResults={items.length > 0}
                hasNextPage={page * 10 < totalResults}
              />
            </>
          )}
        </section>

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
