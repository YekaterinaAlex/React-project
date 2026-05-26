import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import App from './App';
import { store } from './store/store';
import { ThemeProvider } from './context/ThemeProvider';
import { pokemonApi } from './store/api/pokemonApi';

const renderApp = () =>
  render(
    <Provider store={store}>
      <ThemeProvider>
        <MemoryRouter initialEntries={['/?page=1']}>
          <App />
        </MemoryRouter>
      </ThemeProvider>
    </Provider>
  );

const createJsonResponse = (data: unknown, status = 200) =>
  Promise.resolve(
    new Response(JSON.stringify(data), {
      status,
      headers: {
        'Content-Type': 'application/json',
      },
    })
  );

const mockSuccessfulFetch = () => {
  globalThis.fetch = vi.fn((url) => {
    const requestUrl = String(url);

    if (requestUrl.includes('/pokemon?offset=')) {
      return createJsonResponse({
        count: 1,
        next: null,
        previous: null,
        results: [
          {
            name: 'pikachu',
            url: 'https://pokeapi.co/api/v2/pokemon/25/',
          },
        ],
      });
    }

    return createJsonResponse({
      name: 'pikachu',
      height: 4,
      weight: 60,
      sprites: {
        front_default: 'https://example.com/pikachu.png',
      },
    });
  }) as unknown as typeof fetch;
};

describe('App', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    localStorage.clear();
    store.dispatch(pokemonApi.util.resetApiState());
  });

  it('fetches and displays data', async () => {
    const user = userEvent.setup();

    mockSuccessfulFetch();

    renderApp();

    await user.type(screen.getByPlaceholderText(/search/i), 'pikachu');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();
    expect(screen.queryByText(/height: 4/i)).not.toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /pikachu/i }));

    expect(await screen.findByText(/height: 4/i)).toBeInTheDocument();
    expect(screen.getByText(/weight: 60/i)).toBeInTheDocument();
    expect(screen.getByRole('img', { name: /pikachu/i })).toBeInTheDocument();
  });

  it('shows error message when fetch fails', async () => {
    const user = userEvent.setup();

    globalThis.fetch = vi.fn(() =>
      Promise.resolve(new Response(null, { status: 404 }))
    ) as unknown as typeof fetch;

    renderApp();

    await user.type(screen.getByPlaceholderText(/search/i), 'unknown');
    await user.click(screen.getByRole('button', { name: /search/i }));

    expect(await screen.findByText(/pokemon not found/i)).toBeInTheDocument();
  });

  it('shows empty search input when local storage is empty', () => {
    mockSuccessfulFetch();

    renderApp();

    expect(screen.getByPlaceholderText(/search/i)).toHaveValue('');
  });

  it('reads saved search term from localStorage on mount', async () => {
    localStorage.setItem('searchTerm', 'pikachu');

    mockSuccessfulFetch();

    renderApp();

    expect(await screen.findByDisplayValue('pikachu')).toBeInTheDocument();
    expect(await screen.findByText(/pikachu/i)).toBeInTheDocument();
  });

  it('writes search term to localStorage after user searches', async () => {
    const user = userEvent.setup();

    mockSuccessfulFetch();

    renderApp();

    await user.type(screen.getByPlaceholderText(/search/i), 'pikachu');
    await user.click(screen.getByRole('button', { name: /search/i }));

    await waitFor(() => {
      expect(localStorage.getItem('searchTerm')).toBe('pikachu');
    });
  });

  it('refetches data when refresh button is clicked', async () => {
    const user = userEvent.setup();

    mockSuccessfulFetch();

    renderApp();

    await user.type(screen.getByPlaceholderText(/search/i), 'pikachu');
    await user.click(screen.getByRole('button', { name: /search/i }));

    await screen.findByText(/pikachu/i);

    const previousCalls = vi.mocked(globalThis.fetch).mock.calls.length;

    await user.click(screen.getByRole('button', { name: /refresh/i }));

    await waitFor(() => {
      expect(globalThis.fetch).toHaveBeenCalledTimes(previousCalls + 1);
    });
  });
});
