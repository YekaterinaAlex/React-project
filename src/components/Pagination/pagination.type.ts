export type PaginationProps = {
  page: number;
  onPageChange: (page: number) => void;
  hasResults: boolean;
  hasNextPage: boolean;
};
