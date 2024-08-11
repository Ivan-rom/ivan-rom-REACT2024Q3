import React from 'react';

import './errorBoundary.css';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  errorMessage: string;
}

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  state = { errorMessage: '' };

  static getDerivedStateFromError(error: Error) {
    return { errorMessage: error.message };
  }

  render() {
    if (this.state.errorMessage)
      return (
        <div className="error-boundary">
          <div>Something went wrong :(</div>
          <button
            onClick={() => this.setState({ errorMessage: '' })}
            className="button"
          >
            Clear error
          </button>
        </div>
      );

    return this.props.children;
  }
}

export default ErrorBoundary;
