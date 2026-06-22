'use client';

import Image from 'next/image';
import { useParams } from 'next/navigation';

import {
  StyledContainer,
  StyledTitle,
  StyledText,
  StyledRefreshButton,
} from './PokemonDetails.styled';

import Spinner from '../Spinner';
import {
  pokemonApi,
  useGetPokemonByNameQuery,
} from '../../store/api/pokemonApi';
import { useAppDispatch } from '../../store/hooks';

function PokemonDetails() {
  const params = useParams<{ name: string }>();
  const name = params?.name;

  const dispatch = useAppDispatch();

  const {
    data: details,
    isLoading,
    error,
  } = useGetPokemonByNameQuery(name ?? '', {
    skip: !name,
  });

  if (isLoading) {
    return <Spinner data-testid="spinner" />;
  }

  if (error) {
    return <StyledText>Pokemon details not found.</StyledText>;
  }

  if (!details) {
    return null;
  }

  return (
    <StyledContainer>
      <StyledRefreshButton
        onClick={() => {
          dispatch(
            pokemonApi.util.invalidateTags([
              { type: 'PokemonDetails', id: name },
            ])
          );
        }}
      >
        Refresh details
      </StyledRefreshButton>

      <StyledTitle>{details.name}</StyledTitle>

      {details.sprites.front_default && (
        <Image
          src={details.sprites.front_default}
          alt={details.name}
          width={96}
          height={96}
        />
      )}

      <StyledText>Height: {details.height}</StyledText>
      <StyledText>Weight: {details.weight}</StyledText>
    </StyledContainer>
  );
}

export default PokemonDetails;
