import React from 'react';

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
      return <p>Something went wrong</p>;
    }
    return this.props.children;
  }
}
export default ErrorBoundary;
