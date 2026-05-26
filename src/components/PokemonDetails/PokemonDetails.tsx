import { useParams } from 'react-router-dom';

import {
  StyledContainer,
  StyledTitle,
  StyledText,
} from './PokemonDetails.styled';

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
    return <StyledText>Loading details...</StyledText>;
  }

  if (error) {
    return <StyledText>Pokemon details not found.</StyledText>;
  }

  if (!details) {
    return null;
  }

  return (
    <StyledContainer>
      <button onClick={() => refetch()}>Refresh details</button>

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
