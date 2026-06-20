import App from '../App';
import { getPokemonList } from '../lib/pokemon';

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const params = await searchParams;
  const page = Number(params.page) || 1;
  const initialData = await getPokemonList(page);

  return <App initialData={initialData} initialPage={page} />;
}
