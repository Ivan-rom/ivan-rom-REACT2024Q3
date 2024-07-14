import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { describe, expect, it, Mock, vi } from 'vitest';
import ElementView from './ElementView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HOME_PAGE } from '../../helpers/constants';
import { Person } from '../../helpers/interfaces';
import { fetchData } from '../../helpers/api';

const mockElementData: Person = {
  name: 'test name',
  gender: 'test gender',
  hair_color: 'test hair color',
  height: 'test height',
  mass: 'test mass',
  skin_color: 'test skin color',
  eye_color: 'test eye color',
  birth_year: 'test birth year',
  url: 'test/url/1/',
};

vi.mock('../../helpers/api', () => ({
  fetchData: vi.fn(),
}));

describe('Element view component', () => {
  it('renders loading component', () => {
    render(<ElementView />, { wrapper: BrowserRouter });

    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  it('correctly displays the detailed card data', () => {
    const initialPagePath = `${HOME_PAGE}/details/1`;
    window.history.pushState({}, 'Test page', initialPagePath);

    (fetchData as Mock).mockResolvedValue(mockElementData);

    render(
      <Routes>
        <Route path="/details/:elementId" element={<ElementView />} />
      </Routes>,
      { wrapper: BrowserRouter },
    );

    waitFor(() => {
      expect(screen.getByText(mockElementData.name)).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  it('hides the component when the close button is clicked', async () => {
    const initialPagePath = `${HOME_PAGE}/details/1`;
    window.history.pushState({}, 'Test page', initialPagePath);

    (fetchData as Mock).mockResolvedValue(mockElementData);

    render(
      <Routes>
        <Route path="/details/:elementId" element={<ElementView />} />
      </Routes>,
      { wrapper: BrowserRouter },
    );

    waitFor(() => {
      const closeButton = screen.getByTestId('close-button');

      expect(window.location.pathname).toBe(initialPagePath);

      fireEvent.click(closeButton);

      expect(window.location.pathname).toBe(HOME_PAGE);
    });
  });
});
