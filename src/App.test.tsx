import { render, screen } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';

import App from './App';
import { Providers } from './app/providers';
import messages from '../messages/en.json';

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    refresh: vi.fn(),
  }),
  useSearchParams: () => new URLSearchParams('page=1'),
  usePathname: () => '/',
}));

describe('App', () => {
  it('renders home page', () => {
    render(
      <NextIntlClientProvider locale="en" messages={messages}>
        <Providers>
          <App />
        </Providers>
      </NextIntlClientProvider>
    );

    expect(screen.getByText(/refresh/i)).toBeInTheDocument();
  });
});
