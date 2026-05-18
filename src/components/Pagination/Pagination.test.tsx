import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Pagination from './Pagination';

describe('Pagination', () => {
  it('does not render when there are no results', () => {
    const onPageChange = vi.fn();

    render(
      <Pagination
        page={1}
        onPageChange={onPageChange}
        hasResults={false}
        hasNextPage={false}
      />
    );

    expect(screen.queryByText(/page/i)).not.toBeInTheDocument();
  });

  it('renders current page and disables Prev on first page', () => {
    const onPageChange = vi.fn();

    render(
      <Pagination page={1} onPageChange={onPageChange} hasResults hasNextPage />
    );

    expect(screen.getByText(/page 1/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /prev/i })).toBeDisabled();
    expect(screen.getByRole('button', { name: /next/i })).not.toBeDisabled();
  });

  it('calls onPageChange with previous and next page', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();

    render(
      <Pagination page={2} onPageChange={onPageChange} hasResults hasNextPage />
    );

    await user.click(screen.getByRole('button', { name: /prev/i }));
    expect(onPageChange).toHaveBeenCalledWith(1);

    await user.click(screen.getByRole('button', { name: /next/i }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('disables Next when there is no next page', () => {
    const onPageChange = vi.fn();

    render(
      <Pagination
        page={2}
        onPageChange={onPageChange}
        hasResults
        hasNextPage={false}
      />
    );

    expect(screen.getByRole('button', { name: /next/i })).toBeDisabled();
  });
});
