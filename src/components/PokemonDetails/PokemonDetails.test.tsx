import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import PokemonDetails from './PokemonDetails';

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
  it('shows loading state in pokemon details', () => {
    mockedUseGetPokemonByNameQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      error: undefined,
      refetch: vi.fn(),
    } as ReturnType<typeof useGetPokemonByNameQuery>);

    render(<PokemonDetails />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('shows error state in pokemon details', () => {
    mockedUseGetPokemonByNameQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: { status: 404 },
      refetch: vi.fn(),
    } as ReturnType<typeof useGetPokemonByNameQuery>);

    render(<PokemonDetails />);

    expect(screen.getByText(/pokemon details not found/i)).toBeInTheDocument();
  });

  it('returns null when no details exist', () => {
    mockedUseGetPokemonByNameQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      error: undefined,
      refetch: vi.fn(),
    } as ReturnType<typeof useGetPokemonByNameQuery>);

    const { container } = render(<PokemonDetails />);

    expect(container).toBeEmptyDOMElement();
  });
});
