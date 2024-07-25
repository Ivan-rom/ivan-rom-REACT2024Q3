import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Pagination from './Pagination';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HOME_PAGE } from '../../helpers/constants';

// for 2 pages (10 elements per page)
const elementsCount = 20;

describe('Pagination component', () => {
  it('changes the URL when buttons are clicked', async () => {
    window.history.pushState({}, 'Test page', HOME_PAGE);
    render(
      <Routes>
        <Route
          path="/search/:page"
          element={<Pagination elementsCount={elementsCount} />}
        />
      </Routes>,
      { wrapper: BrowserRouter },
    );
    const nextButton = screen.getByText('next');
    const prevButton = screen.getByText('prev');

    expect(window.location.pathname).toBe('/search/1');

    fireEvent.click(nextButton);

    expect(window.location.pathname).toBe('/search/2');

    fireEvent.click(prevButton);

    expect(window.location.pathname).toBe('/search/1');
  });

  it('changes the search page without closing details when buttons are clicked', async () => {
    const detailsPage = '/details/1';

    window.history.pushState({}, 'Test page', `${HOME_PAGE}${detailsPage}`);

    render(
      <Routes>
        <Route
          path="/search/:page"
          element={<Pagination elementsCount={elementsCount} />}
        >
          <Route path="details/:elementId" element={<div>Details view</div>} />
        </Route>
      </Routes>,
      { wrapper: BrowserRouter },
    );
    const nextButton = screen.getByText('next');
    const prevButton = screen.getByText('prev');

    expect(window.location.pathname).toBe(`/search/1${detailsPage}`);

    fireEvent.click(nextButton);

    expect(window.location.pathname).toBe(`/search/2${detailsPage}`);

    fireEvent.click(prevButton);

    expect(window.location.pathname).toBe(`/search/1${detailsPage}`);
  });
});
