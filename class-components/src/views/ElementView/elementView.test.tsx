import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import ElementView from './ElementView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { HOME_PAGE } from '../../helpers/constants';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { mockedPerson } from '../../../mock/mockedResponses';

const component = (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route
          path={`/search/:page/details/:elementId`}
          element={<ElementView />}
        />
      </Routes>
    </BrowserRouter>
  </Provider>
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
        screen.getByText(new RegExp(`${mockedPerson.name}`, 'i')),
      ).toBeInTheDocument();
      expect(screen.getByRole('button')).toBeInTheDocument();
    });
  });

  it('hides the component when the close button is clicked', async () => {
    render(component);

    await waitFor(() => {
      const closeButton = screen.getByTestId('close-button');

      expect(window.location.pathname).toBe(initialPagePath);

      fireEvent.click(closeButton);

      expect(window.location.pathname).toBe(HOME_PAGE);
    });
  });
});
