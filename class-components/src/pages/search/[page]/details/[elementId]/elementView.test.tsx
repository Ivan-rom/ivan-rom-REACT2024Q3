import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import ElementView from './index';
import { HOME_PAGE } from '@/helpers/constants';
import { Provider } from 'react-redux';
import { makeStore } from '@/store/store';
import { mockedPerson } from '@/../mock/mockedResponses';
import ContextProvider from '@/components/ContextProvider/ContextProvider';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../../../../../../mock/createMockRouter';

const store = makeStore();

const router = createMockRouter({ query: { page: '1' } });

const component = (
  <RouterContext.Provider value={router}>
    <ContextProvider>
      <Provider store={store}>
        <ElementView />
      </Provider>
    </ContextProvider>
  </RouterContext.Provider>
);

const initialPagePath = `${HOME_PAGE}/details/1`;

describe('Element view component', () => {
  beforeEach(() => {
    window.history.pushState({}, 'Test page', initialPagePath);
  });

  it('renders loading component', () => {
    render(component);

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('correctly displays the detailed card data', async () => {
    render(component);

    await waitFor(() => {
      expect(
        screen.getByText(new RegExp(`name: ${mockedPerson.name}`, 'i')),
      ).toBeInTheDocument();
      expect(screen.getByTestId('details-close-button')).toBeInTheDocument();
    });
  });

  it('hides the component when the close button is clicked', async () => {
    render(component);

    await waitFor(() => {
      const closeButton = screen.getByTestId('details-close-button');

      vi.spyOn(router, 'push');

      fireEvent.click(closeButton);

      expect(router.push).toHaveBeenCalledWith(HOME_PAGE);
    });
  });
});
