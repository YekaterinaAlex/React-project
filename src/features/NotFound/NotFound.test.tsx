import type { ReactNode } from 'react';
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';

import NotFound from './NotFound';

vi.mock('next/link', () => ({
  default: ({ children, href }: { children: ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('NotFound', () => {
  it('renders not found page', () => {
    render(<NotFound />);

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText(/page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/go back/i)).toBeInTheDocument();
  });
});
