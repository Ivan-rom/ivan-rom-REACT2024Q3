import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import Pagination from './Pagination';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../../../mock/createMockRouter';

// for 2 pages (10 elements per page)
const elementsCount = 20;
const search = '';
const page = '2';
const router = createMockRouter({
  pathname: `?page=${page}&search=${search}`,
});

describe('Pagination component', () => {
  it('renders properly', () => {
    render(
      <RouterContext.Provider value={router}>
        <Pagination elementsCount={elementsCount} search={search} page={page} />
      </RouterContext.Provider>,
    );

    expect(screen.getByRole('link', { name: 'prev' })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'next' })).toBeInTheDocument();
  });

  it('changes the URL when buttons are clicked', async () => {
    render(
      <RouterContext.Provider value={router}>
        <Pagination elementsCount={elementsCount} search={search} page={page} />
      </RouterContext.Provider>,
    );

    vi.spyOn(router, 'push');

    const nextButton = screen.getByText('next');
    const prevButton = screen.getByText('prev');

    fireEvent.click(nextButton);

    expect(router.push).toHaveBeenCalledWith(
      '/?page=3&search=',
      '/?page=3&search=',
      {
        locale: undefined,
        scroll: true,
        shallow: undefined,
      },
    );

    fireEvent.click(prevButton);

    expect(router.push).toHaveBeenCalledWith(
      '/?page=1&search=',
      '/?page=1&search=',
      {
        locale: undefined,
        scroll: true,
        shallow: undefined,
      },
    );
  });

  it('changes the search page without closing details when buttons are clicked', async () => {
    const id = '1';

    const router = createMockRouter({
      pathname: `?page=${page}&search=${search}&id=${id}`,
    });

    render(
      <RouterContext.Provider value={router}>
        <Pagination
          elementsCount={elementsCount}
          search={search}
          page={page}
          id={id}
        />
      </RouterContext.Provider>,
    );

    const nextButton = screen.getByText('next');
    const prevButton = screen.getByText('prev');

    fireEvent.click(nextButton);

    expect(router.push).toHaveBeenCalledWith(
      `/?page=3&search=&id=${id}`,
      `/?page=3&search=&id=${id}`,
      {
        locale: undefined,
        scroll: true,
        shallow: undefined,
      },
    );

    fireEvent.click(prevButton);

    expect(router.push).toHaveBeenCalledWith(
      `/?page=1&search=&id=${id}`,
      `/?page=1&search=&id=${id}`,
      {
        locale: undefined,
        scroll: true,
        shallow: undefined,
      },
    );
  });
});
