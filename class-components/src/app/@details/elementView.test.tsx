import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ElementView from './page';
import { HOME_PAGE } from '@/helpers/constants';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { mockedPerson } from '@/../mock/mockedResponses';
import ContextProvider from '@/components/ContextProvider/ContextProvider';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '@/../mock/createMockRouter';

const router = createMockRouter({ query: { page: '1' } });

const initialPagePath = `${HOME_PAGE}/details/1`;

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

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

describe('Element view component', () => {
  beforeEach(() => {
    window.history.pushState({}, 'Test page', initialPagePath);
  });

  it('correctly displays the detailed card data', async () => {
    const ResolvedComponent = await ElementView({
      searchParams: { page: '1', search: '', id: '1' },
    });

    render(
      <RouterContext.Provider value={router}>
        <ContextProvider>
          <Provider store={store}>{ResolvedComponent}</Provider>
        </ContextProvider>
      </RouterContext.Provider>,
    );

    await waitFor(() => {
      expect(
        screen.getByText(new RegExp(`name: ${mockedPerson.name}`, 'i')),
      ).toBeInTheDocument();
      expect(screen.getByTestId('details-close-button')).toBeInTheDocument();
    });
  });

  it('hides the component when the close button is clicked', async () => {
    const ResolvedComponent = await ElementView({
      searchParams: { page: '1', search: '', id: '1' },
    });

    render(
      <RouterContext.Provider value={router}>
        <ContextProvider>
          <Provider store={store}>{ResolvedComponent}</Provider>
        </ContextProvider>
      </RouterContext.Provider>,
    );

    await waitFor(() => {
      const closeButton = screen.getByTestId('details-close-button');

      expect(closeButton).toBeInTheDocument();

      vi.spyOn(router, 'push');

      fireEvent.click(closeButton);

      expect(mockPush).toHaveBeenCalledWith('?page=1&search=');
    });
  });
});
