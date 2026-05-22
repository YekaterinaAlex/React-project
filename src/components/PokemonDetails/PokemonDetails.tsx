import { useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import type { PokemonDetailsData } from './pokemonDetails.type';

import {
  StyledContainer,
  StyledTitle,
  StyledText,
} from './PokemonDetails.styled';
import { fetchData } from '../../utils/fetchData';

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

        const data = await fetchData<PokemonDetailsData>(
          `https://pokeapi.co/api/v2/pokemon/${name}`
        );

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
      {details.sprites.front_default && (
        <img src={details.sprites.front_default} alt={details.name} />
      )}
      <StyledText>Height: {details.height}</StyledText>

      <StyledText>Weight: {details.weight}</StyledText>
    </StyledContainer>
  );
}

export default PokemonDetails;
