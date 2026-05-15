import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import type { PokemonDetailsData } from './pokemonDetails.type';

import {
  StyledContainer,
  StyledTitle,
  StyledText,
} from './PokemonDetails.styled';

function PokemonDetails() {
  const { name } = useParams();

  const [details, setDetails] = useState<PokemonDetailsData | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!name) return;

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
    return <StyledText>Loading details...</StyledText>;
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
