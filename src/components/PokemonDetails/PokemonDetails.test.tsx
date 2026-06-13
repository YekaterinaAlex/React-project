import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import PokemonDetails from './PokemonDetails';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

const testStore = configureStore({
  reducer: {},
});
const renderPokemonDetails = () =>
  render(
    <Provider store={testStore}>
      <PokemonDetails />
    </Provider>
  );
vi.mock('react-router-dom', () => ({
  useParams: () => ({
    name: 'pikachu',
  }),
}));

vi.mock('../../store/api/pokemonApi', () => ({
  useGetPokemonByNameQuery: vi.fn(),
}));

import { useGetPokemonByNameQuery } from '../../store/api/pokemonApi';

const mockedUseGetPokemonByNameQuery = vi.mocked(useGetPokemonByNameQuery);

describe('PokemonDetails', () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  it('shows loading state in pokemon details', () => {
    mockedUseGetPokemonByNameQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
      refetch: vi.fn(),
    } as ReturnType<typeof useGetPokemonByNameQuery>);

    renderPokemonDetails();

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('shows error state in pokemon details', () => {
    mockedUseGetPokemonByNameQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { status: 404 },
      refetch: vi.fn(),
    } as ReturnType<typeof useGetPokemonByNameQuery>);

    renderPokemonDetails();

    expect(screen.getByText(/pokemon details not found/i)).toBeInTheDocument();
  });

  it('returns null when no details exist', () => {
    mockedUseGetPokemonByNameQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: undefined,
      refetch: vi.fn(),
    } as ReturnType<typeof useGetPokemonByNameQuery>);

    const { container } = renderPokemonDetails();

    expect(container).toBeEmptyDOMElement();
  });
});
