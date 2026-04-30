import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('App', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it('fetches and displays data', async () => {
    const user = userEvent.setup();

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve({
            name: 'pikachu',
            height: 4,
            weight: 60,
          }),
      })
    ) as unknown as typeof fetch;

    render(<App />);

    await user.type(screen.getByPlaceholderText(/search/i), 'pikachu');

    await user.click(screen.getByRole('button', { name: /search/i }));

    const name = await screen.findByText(/pikachu/i);
    expect(name).toBeInTheDocument();

    expect(screen.getByText(/height: 4, weight: 60/i)).toBeInTheDocument();
  });

  it('error message when fetch fails', async () => {
    const user = userEvent.setup();

    globalThis.fetch = vi.fn(() =>
      Promise.resolve({
        ok: false,
      })
    ) as unknown as typeof fetch;
    render(<App />);

    await user.type(screen.getByPlaceholderText(/search/i), 'unkonown');
    await user.click(screen.getByRole('button', { name: /search/i }));
    expect(await screen.findByText(/pokemon not found/i)).toBeInTheDocument();
  });
});
