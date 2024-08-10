import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SearchView from './index';
import { HOME_PAGE } from '@/helpers/constants';
import { Provider } from 'react-redux';
import { makeStore } from '@/store/store';
import ContextProvider from '@/components/ContextProvider/ContextProvider';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../../../mock/createMockRouter';

const searchText = 'search text';
const loaderText = 'loader text';
const listText = 'list text';
const errorButtonText = 'error button text';

const store = makeStore();

const router = createMockRouter({
  query: {
    page: '1',
    elementId: '1',
  },
  route: '/search/1/details/1',
  pathname: '/search/1/details/1',
});

const component = (
  <RouterContext.Provider value={router}>
    <Provider store={store}>
      <ContextProvider>
        <SearchView />
      </ContextProvider>
    </Provider>
  </RouterContext.Provider>
);

vi.mock('@/components/Search/Search', () => ({
  __esModule: true,
  default: vi.fn(() => <div>{searchText}</div>),
}));

vi.mock('@/components/Loader/Loader', () => ({
  __esModule: true,
  default: vi.fn(() => <div>{loaderText}</div>),
}));

vi.mock('@/components/List/List', () => ({
  __esModule: true,
  default: vi.fn(() => <div>{listText}</div>),
}));

vi.mock('@/components/ErrorButton/ErrorButton', () => ({
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

    vi.spyOn(router, 'push');

    const closeButton = screen.getByTestId('close-button');

    expect(closeButton).toBeInTheDocument();

    fireEvent.click(closeButton);

    expect(router.push).toHaveBeenCalledWith(HOME_PAGE);
  });
});
