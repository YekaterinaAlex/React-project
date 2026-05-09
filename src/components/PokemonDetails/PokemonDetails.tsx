import { useEffect, useState } from 'react';
import './PokemonDetails.css';

type Props = {
  name: string;
};
type PokemonDetails = {
  name: string;
  height: number;
  weight: number;
};

function PokemonDetails({ name }: Props) {
  const [details, setDetails] = useState<PokemonDetails | null>(null);
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
        const data: PokemonDetails = await response.json();
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
    <div>
      <h2>{details.name}</h2>
      <p>Height: {details.height}</p>
      <p>Weight: {details.weight}</p>
    </div>
  );
}
export default PokemonDetails;
