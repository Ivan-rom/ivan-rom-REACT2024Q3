import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import Search from './Search';
import { LOCAL_STORAGE_SEARCH_KEY } from '../../helpers/constants';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

const mockPush = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(() => ({
    push: mockPush,
  })),
  useSearchParams: vi.fn(() => ({
    get: vi.fn((param: string) => {
      if (param === 'id') return '1';
      if (param === 'page') return '1';
      return '';
    }),
  })),
}));

const searchComponent = (
  <Provider store={store}>
    <Search />
  </Provider>
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
