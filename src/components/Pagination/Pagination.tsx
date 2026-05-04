import './Pagination.css';
type Props = {
  page: number;
  onPageChange: (page: number) => void;
  hasResults: boolean;
  hasNextPage: boolean;
};
function Pagination({ page, onPageChange, hasResults, hasNextPage }: Props) {
  if (!hasResults) return null;
  return (
    <div className="pagination">
      <button onClick={() => onPageChange(page - 1)} disabled={page === 1}>
        {' '}
        Prev
      </button>
      <span>Page {page}</span>
      <button onClick={() => onPageChange(page + 1)} disabled={!hasNextPage}>
        Next
      </button>
    </div>
  );
}

export default Pagination;
