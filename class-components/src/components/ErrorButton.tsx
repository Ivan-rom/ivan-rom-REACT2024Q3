import React from 'react';

interface ErrorButtonProps {}

interface ErrorButtonState {
  hasError: boolean;
}

class ErrorButton extends React.Component<ErrorButtonProps, ErrorButtonState> {
  state = { hasError: false };

  render() {
    if (this.state.hasError) throw new Error('Synthetic error');
    return (
      <button onClick={() => this.setState({ hasError: true })}>
        Create error
      </button>
    );
  }
}

export default ErrorButton;
