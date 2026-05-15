import { StyledPagination, StyledButton } from './pagination.styled';
import type { PaginationProps } from './pagination.type';

function Pagination({
  page,
  onPageChange,
  hasResults,
  hasNextPage,
}: PaginationProps) {
  if (!hasResults) return null;
  return (
    <StyledPagination>
      <StyledButton
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
      >
        {' '}
        Prev
      </StyledButton>
      <span>Page {page}</span>
      <StyledButton
        onClick={() => onPageChange(page + 1)}
        disabled={!hasNextPage}
      >
        Next
      </StyledButton>
    </StyledPagination>
  );
}

export default Pagination;
