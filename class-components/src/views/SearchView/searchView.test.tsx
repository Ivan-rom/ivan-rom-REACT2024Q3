import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SearchView from './SearchView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HOME_PAGE } from '../../helpers/constants';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import ContextProvider from '../../components/ContextProvider/ContextProvider';

const searchText = 'search text';
const loaderText = 'loader text';
const listText = 'list text';
const errorButtonText = 'error button text';

const component = (
  <Provider store={store}>
    <ContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/search/:page" element={<SearchView />}>
            <Route path="details/:elementId" element={<div>Test Outlet</div>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ContextProvider>
  </Provider>
);

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
  beforeEach(() => {
    const initialPath = `${HOME_PAGE}/details/1`;
    window.history.pushState({}, 'test page', initialPath);
  });

  it('renders Search component', () => {
    render(component);

    expect(screen.getByText(searchText)).toBeInTheDocument();
  });

  it('renders ErrorButton component', () => {
    render(component);

    expect(screen.getByText(errorButtonText)).toBeInTheDocument();
  });

  it('closes details on close button click', () => {
    render(component);

    const closeButton = screen.getByTestId('close-button');

    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    expect(window.location.pathname).toBe(HOME_PAGE);
  });
});
