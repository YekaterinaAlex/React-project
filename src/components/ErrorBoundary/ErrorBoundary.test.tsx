import React from 'react';
import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';

class BrokenComponent extends React.Component {
  render() {
    throw new Error('Test error');
    return null;
  }
}

describe('ErrorBoundary', () => {
  it('displays fallback UI when child component throws', () => {
    const consoleErrorMock = vi
      .spyOn(console, 'error')
      .mockImplementation(() => undefined);

    render(
      <ErrorBoundary>
        <BrokenComponent />
      </ErrorBoundary>
    );

    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
    expect(screen.getByText(/please refresh the page/i)).toBeInTheDocument();

    consoleErrorMock.mockRestore();
  });
});
