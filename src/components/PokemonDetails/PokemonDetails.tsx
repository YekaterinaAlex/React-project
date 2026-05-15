import { useEffect, useState } from 'react';
import { StyledContainer, StyledTitle, StyledText } from './Pokemon.styled';
import type {
  PokemonDetailsProps,
  PokemonDetailsData,
} from './pokemonDetails.type';

function PokemonDetails({ name }: PokemonDetailsProps) {
  const [details, setDetails] = useState<PokemonDetailsData | null>(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        setDetails(null);
        const response = await fetch(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch details');
        }
        const data: PokemonDetailsData = await response.json();
        setDetails(data);
      } catch (error) {
        console.error(error);
        setDetails(null);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [name]);
  if (loading) {
    return <p>Loading details...</p>;
  }
  if (!details) return null;
  return (
    <StyledContainer>
      <StyledTitle>{details.name}</StyledTitle>

      <StyledText>Height: {details.height}</StyledText>

      <StyledText>Weight: {details.weight}</StyledText>
    </StyledContainer>
  );
}

export default PokemonDetails;
