import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import SearchView from './SearchView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HOME_PAGE } from '../../helpers/constants';

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

  it('renders ErrorButton component', () => {
    render(<SearchView />, { wrapper: BrowserRouter });

    expect(screen.getByText(errorButtonText)).toBeInTheDocument();
  });

  it('closes details on close button click', () => {
    const initialPath = `${HOME_PAGE}/details/1`;
    window.history.pushState({}, 'test page', initialPath);

    render(
      <BrowserRouter>
        <Routes>
          <Route path="/search/:page" element={<SearchView />}>
            <Route path="details/:elementId" element={<div>Test Outlet</div>} />
          </Route>
        </Routes>
      </BrowserRouter>,
    );

    const closeButton = screen.getByRole('button');

    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    expect(window.location.pathname).toBe(HOME_PAGE);
  });
});
