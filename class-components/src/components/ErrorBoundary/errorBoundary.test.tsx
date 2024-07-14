import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import ErrorBoundary from './ErrorBoundary';

const ErrorThrowingComponent = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary component', () => {
  it('catches an error thrown by its children and displays an error message', () => {
    const errorMessage = 'Something went wrong :(';

    render(
      <ErrorBoundary>
        <ErrorThrowingComponent />
      </ErrorBoundary>,
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });

  it('renders children when there is no error', () => {
    const testText = 'Child Component';

    render(
      <ErrorBoundary>
        <div>{testText}</div>
      </ErrorBoundary>,
    );

    expect(screen.getByText(testText)).toBeInTheDocument();
  });
});
