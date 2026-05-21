import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { ThemeProvider } from './ThemeProvider';
import { useTheme } from './useTheme';

function TestComponent() {
  const { theme, toggleTheme } = useTheme();

  return (
    <>
      <p>Current theme: {theme}</p>
      <button onClick={toggleTheme}>Toggle theme</button>
    </>
  );
}

describe('ThemeProvider', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('data-theme');
  });

  it('sets light theme by default', () => {
    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    expect(screen.getByText(/current theme: light/i)).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('data-theme', 'light');
  });

  it('toggles theme from light to dark', async () => {
    const user = userEvent.setup();

    render(
      <ThemeProvider>
        <TestComponent />
      </ThemeProvider>
    );

    await user.click(screen.getByRole('button', { name: /toggle theme/i }));

    expect(screen.getByText(/current theme: dark/i)).toBeInTheDocument();
    expect(document.documentElement).toHaveAttribute('data-theme', 'dark');
  });
});
