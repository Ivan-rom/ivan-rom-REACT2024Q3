import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import Search from './Search';
import { LOCAL_STORAGE_SEARCH_KEY } from '../../helpers/constants';
import { Provider } from 'react-redux';
import { makeStore } from '../../store/store';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../../../mock/createMockRouter';

const store = makeStore();

const searchComponent = (
  <RouterContext.Provider value={createMockRouter({})}>
    <Provider store={store}>
      <Search />
    </Provider>
  </RouterContext.Provider>
);

describe('Search component', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('saves the entered search term to localStorage on submit', () => {
    render(searchComponent);
    const testValue = 'test value';

    const input = screen.getByRole('textbox');
    const form = screen.getByRole('form');

    fireEvent.change(input, { target: { value: testValue } });
    fireEvent.submit(form);

    expect(localStorage.getItem(LOCAL_STORAGE_SEARCH_KEY)).toBe(testValue);
  });

  it('retrieves data from localStorage on mounting', () => {
    const testValue = 'test value';

    localStorage.setItem(LOCAL_STORAGE_SEARCH_KEY, testValue);

    render(searchComponent);

    const input = screen.getByRole('textbox');

    expect(input).toHaveValue(testValue);
  });
});
