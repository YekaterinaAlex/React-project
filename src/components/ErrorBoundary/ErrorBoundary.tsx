import React from 'react';
import type {
  ErrorBoundaryProps,
  ErrorBoundaryState,
} from './errorBoundary.type';
import {
  StyledFallback,
  StyledTitle,
  StyledText,
} from './ErrorBoundary.styled';

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state: ErrorBoundaryState = {
    hasError: false,
  };
  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }
  componentDidCatch(error: Error): void {
    console.error(error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <StyledFallback>
          <StyledTitle>Something went wrong</StyledTitle>

          <StyledText>Please refresh the page.</StyledText>
        </StyledFallback>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
