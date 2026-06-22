'use client';

import Home from './features/Home/Home';
import type { PokemonListResponse } from './features/Home/home.type';

interface AppProps {
  initialData?: PokemonListResponse;
  initialPage?: number;
}

export default function App({ initialData, initialPage }: AppProps) {
  return <Home initialData={initialData} initialPage={initialPage} />;
}
