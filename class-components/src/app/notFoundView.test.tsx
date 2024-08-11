import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NotFoundView from './not-found';
import { HOME_PAGE, NOT_FOUND_PATH } from '@/helpers/constants';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../../mock/createMockRouter';

describe('Not Found page', () => {
  it('renders content', () => {
    const router = createMockRouter({});

    render(
      <RouterContext.Provider value={router}>
        <NotFoundView />
      </RouterContext.Provider>,
    );

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('button on page should redirect on home page', () => {
    window.history.pushState({}, 'Test page', NOT_FOUND_PATH);

    const router = createMockRouter({});

    render(
      <RouterContext.Provider value={router}>
        <NotFoundView />
      </RouterContext.Provider>,
    );

    const button = screen.getByRole('link');

    fireEvent.click(button);

    expect(router.push).toBeCalledWith(HOME_PAGE, HOME_PAGE, {
      locale: undefined,
      scroll: true,
      shallow: undefined,
    });
  });
});
