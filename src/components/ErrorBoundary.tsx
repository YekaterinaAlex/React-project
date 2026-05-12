import React from 'react';
import './ErrorBoundary.css';

type Props = {
  children: React.ReactNode;
};

type State = {
  hasError: boolean;
};
class ErrorBoundary extends React.Component<Props, State> {
  state: State = {
    hasError: false,
  };
  static getDerivedStateFromError(): State {
    return { hasError: true };
  }
  componentDidCatch(error: Error): void {
    console.error(error);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="fallback">
          <h2>Something went wrong</h2>
          <p>Please refresh the page.</p>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
