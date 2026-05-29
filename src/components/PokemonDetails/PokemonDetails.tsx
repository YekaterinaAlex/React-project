import { useParams } from 'react-router-dom';

import {
  StyledContainer,
  StyledTitle,
  StyledText,
  StyledRefreshButton,
} from './PokemonDetails.styled';

import Spinner from '../Spinner';

import { useGetPokemonByNameQuery } from '../../store/api/pokemonApi';

function PokemonDetails() {
  const { name } = useParams();

  const {
    data: details,
    isLoading,
    error,
    refetch,
  } = useGetPokemonByNameQuery(name ?? '', {
    skip: !name,
  });

  if (isLoading) {
    return <Spinner />;
  }

  if (error) {
    return <StyledText>Pokemon details not found.</StyledText>;
  }

  if (!details) {
    return null;
  }

  return (
    <StyledContainer>
      <StyledRefreshButton onClick={() => refetch()}>
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
