import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import ErrorButton from './ErrorButton';

describe('Error button component', () => {
  it('renders correct text', () => {
    const testText = /create error/i;

    render(<ErrorButton />);

    expect(screen.getByText(testText)).toBeInTheDocument();
  });

  it('throws an error when the button is clicked', () => {
    // Suppress the error output to the console
    const consoleError = console.error;
    console.error = vi.fn();

    render(<ErrorButton />);

    const button = screen.getByText('Create error');

    expect(() => {
      fireEvent.click(button);
    }).toThrow('Synthetic error');

    console.error = consoleError;
  });
});
