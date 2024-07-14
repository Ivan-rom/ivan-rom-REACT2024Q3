import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import App from './App';
import { Outlet } from 'react-router-dom';
import { NOT_FOUND_PATH } from './helpers/constants';

const searchText = 'Search View';
const elementText = 'Element View';
const NotFoundText = 'Not Found View';

vi.mock('./views/SearchView/SearchView', () => ({
  __esModule: true,
  default: vi.fn(() => (
    <div>
      {searchText} <Outlet />
    </div>
  )),
}));

vi.mock('./views/ElementView/ElementView', () => ({
  __esModule: true,
  default: vi.fn(() => <div>{elementText}</div>),
}));

vi.mock('./views/NotFoundView/NotFoundView', () => ({
  __esModule: true,
  default: vi.fn(() => <div>{NotFoundText}</div>),
}));

describe('App component', () => {
  it('renders SearchView component for /search path', () => {
    window.history.pushState({}, 'search page', '/search/');

    render(<App />);

    expect(screen.getByText(searchText)).toBeInTheDocument();
  });

  it('renders SearchView component for /search/:page path', () => {
    window.history.pushState({}, 'search page', '/search/1');

    render(<App />);

    expect(screen.getByText(searchText)).toBeInTheDocument();
  });

  it('renders ElementView component for search/:page/details/:elementId path', () => {
    window.history.pushState({}, 'details page', '/search/1/details/1');

    render(<App />);

    expect(screen.getByText(elementText)).toBeInTheDocument();
  });

  it('renders NotFoundView for NOT_FOUND_PATH', () => {
    window.history.pushState({}, 'details page', NOT_FOUND_PATH);

    render(<App />);

    expect(screen.getByText(NotFoundText)).toBeInTheDocument();
  });

  it('redirects to NOT_FOUND_PATH for undefined paths', () => {
    const initialPath = '/';

    window.history.pushState({}, 'details page', initialPath);

    expect(location.pathname).toBe(initialPath);

    render(<App />);

    expect(location.pathname).toBe(NOT_FOUND_PATH);
  });
});
