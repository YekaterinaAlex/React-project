import Search from './Search';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

describe('Search', () => {
  it('calls onSearch with typed value when Search button is clicked', async () => {
    const user = userEvent.setup();
    const onSearch = vi.fn();

    render(<Search value="" onSearch={onSearch} />);

    await user.type(screen.getByPlaceholderText(/search/i), 'pikachu');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(onSearch).toHaveBeenCalledWith('pikachu');
  });
});
