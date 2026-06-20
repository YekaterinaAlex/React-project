import Image from 'next/image';

import { getPokemonByName } from '../../../lib/pokemon';

export default async function PokemonPage({
  params,
}: {
  params: Promise<{ name: string }>;
}) {
  const { name } = await params;
  const pokemon = await getPokemonByName(name);

  return (
    <section>
      <h1>{pokemon.name}</h1>

      {pokemon.sprites.front_default && (
        <Image
          src={pokemon.sprites.front_default}
          alt={pokemon.name}
          width={96}
          height={96}
        />
      )}

      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
    </section>
  );
}
