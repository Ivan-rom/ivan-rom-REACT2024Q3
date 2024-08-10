import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Pagination from './Pagination';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../../../mock/createMockRouter';

// for 2 pages (10 elements per page)
const elementsCount = 20;

describe('Pagination component', () => {
  it('renders properly', () => {
    const router = createMockRouter({
      query: { page: '1', elementId: '' },
    });

    render(
      <RouterContext.Provider value={router}>
        <Pagination elementsCount={elementsCount} />
      </RouterContext.Provider>,
    );

    expect(screen.getByRole('link', { name: 'prev' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'next' })).toBeInTheDocument();
  });

  it('changes the URL when buttons are clicked', async () => {
    const router = createMockRouter({
      query: { page: '2', elementId: '' },
      pathname: '/search/1',
    });

    render(
      <RouterContext.Provider value={router}>
        <Pagination elementsCount={elementsCount} />
      </RouterContext.Provider>,
    );

    vi.spyOn(router, 'push');

    const nextButton = screen.getByText('next');
    const prevButton = screen.getByText('prev');

    fireEvent.click(nextButton);

    expect(router.push).toHaveBeenCalledWith('/search/3', '/search/3', {
      locale: undefined,
      scroll: true,
      shallow: undefined,
    });

    fireEvent.click(prevButton);

    expect(router.push).toHaveBeenCalledWith('/search/1', '/search/1', {
      locale: undefined,
      scroll: true,
      shallow: undefined,
    });
  });

  it('changes the search page without closing details when buttons are clicked', async () => {
    const detailsPage = '/details/1';

    const router = createMockRouter({
      query: { page: '2', elementId: '1' },
      pathname: '/search/1',
    });

    render(
      <RouterContext.Provider value={router}>
        <Pagination elementsCount={elementsCount} />
      </RouterContext.Provider>,
    );

    const nextButton = screen.getByText('next');
    const prevButton = screen.getByText('prev');

    fireEvent.click(nextButton);

    expect(router.push).toHaveBeenCalledWith(
      `/search/3${detailsPage}`,
      `/search/3${detailsPage}`,
      {
        locale: undefined,
        scroll: true,
        shallow: undefined,
      },
    );

    fireEvent.click(prevButton);

    expect(router.push).toHaveBeenCalledWith(
      `/search/1${detailsPage}`,
      `/search/1${detailsPage}`,
      {
        locale: undefined,
        scroll: true,
        shallow: undefined,
      },
    );
  });
});
