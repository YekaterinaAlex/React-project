import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';

import Search from './Search';

describe('Search', () => {
  it('updates input value when user types', async () => {
    const user = userEvent.setup();

    render(<Search value="" />);

    const input = screen.getByPlaceholderText(/search/i);

    await user.type(input, 'pikachu');

    expect(input).toHaveValue('pikachu');
  });
});
