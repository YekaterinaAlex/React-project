'use client';

import type { ReactNode } from 'react';
import { Provider } from 'react-redux';

import { store } from '../store/store';
import { ThemeProvider } from '../context/ThemeProvider';

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <ThemeProvider>{children}</ThemeProvider>
    </Provider>
  );
}
