import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import NotFoundView from './NotFoundView';
import { BrowserRouter } from 'react-router-dom';
import { HOME_PAGE, NOT_FOUND_PATH } from '../../helpers/constants';

describe('Not Found page', () => {
  it('renders content', () => {
    render(<NotFoundView />, { wrapper: BrowserRouter });

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('link')).toBeInTheDocument();
  });

  it('button on page should redirect on home page', () => {
    window.history.pushState({}, 'Test page', NOT_FOUND_PATH);

    render(<NotFoundView />, { wrapper: BrowserRouter });

    expect(location.pathname).toBe(NOT_FOUND_PATH);

    const button = screen.getByRole('link');

    fireEvent.click(button);

    expect(location.pathname).toBe(HOME_PAGE);
  });
});
