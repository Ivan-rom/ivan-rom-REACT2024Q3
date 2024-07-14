import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SearchView from './SearchView';
import { BrowserRouter } from 'react-router-dom';

const searchText = 'search text';
const loaderText = 'loader text';
const listText = 'list text';
const errorButtonText = 'error button text';

vi.mock('../../components/Search/Search', () => ({
  __esModule: true,
  default: vi.fn(() => <div>{searchText}</div>),
}));

vi.mock('../../components/Loader/Loader', () => ({
  __esModule: true,
  default: vi.fn(() => <div>{loaderText}</div>),
}));

vi.mock('../../components/List/List', () => ({
  __esModule: true,
  default: vi.fn(() => <div>{listText}</div>),
}));

vi.mock('../../components/ErrorButton/ErrorButton', () => ({
  __esModule: true,
  default: vi.fn(() => <div>{errorButtonText}</div>),
}));

describe('Search view component', () => {
  it('renders Search component', () => {
    render(<SearchView />, { wrapper: BrowserRouter });

    expect(screen.getByText(searchText)).toBeInTheDocument();
  });

  it('renders Loader component', () => {
    render(<SearchView />, { wrapper: BrowserRouter });

    expect(screen.getByText(loaderText)).toBeInTheDocument();
  });

  it('renders ErrorButton component', () => {
    render(<SearchView />, { wrapper: BrowserRouter });

    expect(screen.getByText(errorButtonText)).toBeInTheDocument();
  });
});
