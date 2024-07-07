import React from 'react';

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
        <>
          <div>Something went wrong :(</div>
          <button onClick={() => this.setState({ errorMessage: '' })}>
            Clear error
          </button>
        </>
      );

    return (
      <>
        {this.state.errorMessage && (
          <div>Error occurred with message: {this.state.errorMessage}</div>
        )}
        {this.props.children}
      </>
    );
  }
}

export default ErrorBoundary;
