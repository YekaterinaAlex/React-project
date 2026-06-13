import { useParams } from 'react-router-dom';

import {
  StyledContainer,
  StyledTitle,
  StyledText,
  StyledRefreshButton,
} from './PokemonDetails.styled';

import Spinner from '../Spinner';

import { useGetPokemonByNameQuery } from '../../store/api/pokemonApi';

import { pokemonApi } from '../../store/api/pokemonApi';
import { useAppDispatch } from '../../store/hooks';

function PokemonDetails() {
  const { name } = useParams();
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
          if (name) {
            dispatch(
              pokemonApi.util.invalidateTags([
                { type: 'PokemonDetails', id: name },
              ])
            );
          }
        }}
      >
        Refresh details
      </StyledRefreshButton>

      <StyledTitle>{details.name}</StyledTitle>

      {details.sprites.front_default && (
        <img src={details.sprites.front_default} alt={details.name} />
      )}

      <StyledText>Height: {details.height}</StyledText>
      <StyledText>Weight: {details.weight}</StyledText>
    </StyledContainer>
  );
}

export default PokemonDetails;
