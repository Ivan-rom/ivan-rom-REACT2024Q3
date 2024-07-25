import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import List from './List';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { server } from '../../../mock/server';

const component = (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/search/:page?" element={<List />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);

describe('List component', () => {
  beforeEach(() => {
    server.resetHandlers();
    const initialPath = '/search/1';
    window.history.pushState({}, 'test page', initialPath);
  });

  it('renders loading component', () => {
    render(component);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  // BUG: server.use() or BeforeEach(() => server.resetHandlers()) don't work

  // it('renders an appropriate message is displayed if no cards are present', async () => {
  //   server.use(
  //     http.get(`${BASE_URL}/people/`, () => {
  //       return HttpResponse.json({ count: 0, results: [] });
  //     }),
  //   );
  //   const messageForEmptyList = 'Nothing found';

  //   const initialPath = '/search/1';
  //   window.history.pushState({}, 'test page', initialPath);

  //   render(component);

  //   await waitFor(() => {
  //     expect(screen.getByText(messageForEmptyList)).toBeInTheDocument();
  //   });
  // });

  it('renders data from server', async () => {
    render(component);

    await waitFor(() => {
      expect(screen.getByText('test name')).toBeInTheDocument();
    });
  });
});
