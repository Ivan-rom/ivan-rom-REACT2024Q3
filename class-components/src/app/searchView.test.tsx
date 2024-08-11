import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import SearchView from './page';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import ContextProvider from '@/components/ContextProvider/ContextProvider';
import { useRouter } from 'next/navigation';

const listText = 'list text';

vi.mock('@/components/List/List', () => ({
  __esModule: true,
  default: vi.fn(() => <div>{listText}</div>),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

const mockPush = vi.fn();

describe('Search view component', () => {
  beforeEach(() => {
    vi.mocked(useRouter).mockReturnValue({
      push: mockPush,
      back: vi.fn(),
      forward: vi.fn(),
      refresh: vi.fn(),
      replace: vi.fn(),
      prefetch: vi.fn(),
    });

    const initialPath = `?page=1&search=&id=1`;
    window.history.pushState({}, 'test page', initialPath);
  });

  const component = (
    <Provider store={store}>
      <ContextProvider>
        <SearchView searchParams={{ page: '1', search: '', id: '1' }} />
      </ContextProvider>
    </Provider>
  );

  it('closes details on close button click', async () => {
    render(component);

    await waitFor(() => {
      const closeButton = screen.getByTestId('close-button');

      expect(closeButton).toBeInTheDocument();

      fireEvent.click(closeButton);

      expect(mockPush).toHaveBeenCalledWith('?page=1&search=');
    });
  });
});
