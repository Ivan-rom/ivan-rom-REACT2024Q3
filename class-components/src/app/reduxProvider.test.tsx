import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ReduxProvider } from './ReduxProvider';

vi.mock('@/store/store', () => ({
  __esModule: true,
  store: {
    getState: vi.fn(),
    dispatch: vi.fn(),
    subscribe: vi.fn(),
  },
}));

describe('ReduxProvider Component', () => {
  it('renders children within the Redux Provider', () => {
    render(
      <ReduxProvider>
        <div>Test Child</div>
      </ReduxProvider>,
    );

    // Verify that the child is rendered
    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });
});
