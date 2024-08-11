import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RootLayout from './layout';
import { metadata } from './layout';

// Mock child components used within RootLayout
vi.mock('@/components/ErrorButton/ErrorButton', () => ({
  __esModule: true,
  default: () => <div>ErrorButton Component</div>,
}));

vi.mock('@/components/Search/Search', () => ({
  __esModule: true,
  default: () => <div>Search Component</div>,
}));

vi.mock('@/components/ThemeControls/ThemeControls', () => ({
  __esModule: true,
  default: () => <div>ThemeControls Component</div>,
}));

vi.mock('@/components/Controls/Controls', () => ({
  __esModule: true,
  default: () => <div>Controls Component</div>,
}));

vi.mock('@/components/ContextProvider/ContextProvider', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('./ReduxProvider', () => ({
  __esModule: true,
  ReduxProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('RootLayout Component', () => {
  it('renders the RootLayout with all child components', () => {
    render(
      <RootLayout details={<div>Details Component</div>}>
        <div>Children Component</div>
      </RootLayout>,
    );

    // Verify the presence of child components
    expect(screen.getByText('ErrorButton Component')).toBeInTheDocument();
    expect(screen.getByText('Search Component')).toBeInTheDocument();
    expect(screen.getByText('ThemeControls Component')).toBeInTheDocument();
    expect(screen.getByText('Controls Component')).toBeInTheDocument();
    expect(screen.getByText('Details Component')).toBeInTheDocument();
    expect(screen.getByText('Children Component')).toBeInTheDocument();
  });

  it('sets the correct metadata', () => {
    expect(metadata.title).toBe('StarWars API');
  });
});
