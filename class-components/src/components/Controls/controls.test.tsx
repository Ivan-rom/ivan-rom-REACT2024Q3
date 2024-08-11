import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Controls from './Controls';
import { Provider } from 'react-redux';
import { ThemeContext } from '@/helpers/context';
import { ThemeContextType } from '@/helpers/interfaces';
import { store } from '@/store/store';
import { useAppSelector } from '@/hooks/useAppSelector';

import redux from 'react-redux';

vi.mock('@/hooks/useAppSelector', () => ({
  useAppSelector: vi.fn(),
}));

vi.mock('@/hooks/useAppDispatch', () => ({
  useAppDispatch: () => vi.fn(),
}));

const mockDispatch = vi.fn();
vi.mock('react-redux', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof redux;
  return {
    ...actual,
    useDispatch: () => mockDispatch,
  };
});

const renderWithProviders = (
  ui: React.ReactElement,
  themeContextValue: ThemeContextType,
) => {
  return render(
    <Provider store={store}>
      <ThemeContext.Provider value={themeContextValue}>
        {ui}
      </ThemeContext.Provider>
    </Provider>,
  );
};

describe('Controls component', () => {
  global.URL.createObjectURL = vi.fn();

  const mockThemeContextValue: ThemeContextType = {
    isDark: false,
    setIsDark: vi.fn(),
  };

  it('renders nothing when no people are selected', () => {
    vi.mocked(useAppSelector).mockReturnValue({ selectedPeople: [] });

    renderWithProviders(<Controls />, mockThemeContextValue);

    expect(screen.queryByText(/Selected:/)).not.toBeInTheDocument();
  });

  it('renders correctly when people are selected', () => {
    const selectedPeople = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ];

    vi.mocked(useAppSelector).mockReturnValue({ selectedPeople });

    renderWithProviders(<Controls />, mockThemeContextValue);

    expect(screen.getByText(/Selected: 2 items/)).toBeInTheDocument();
  });

  it('generates a CSV download link with correct filename', () => {
    global.URL.createObjectURL = vi.fn(() => 'blob');
    const selectedPeople = [
      { id: 1, name: 'John Doe' },
      { id: 2, name: 'Jane Doe' },
    ];
    vi.mocked(useAppSelector).mockReturnValue({ selectedPeople });

    renderWithProviders(<Controls />, mockThemeContextValue);

    const downloadLink = screen.getByText(/Download/) as HTMLAnchorElement;
    expect(downloadLink).toHaveAttribute(
      'download',
      `${selectedPeople.length}_people.csv`,
    );
    expect(downloadLink.href).toMatch('http://localhost:3000/blob');
  });
});
