import { render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import List from './List';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

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
    const initialPath = '/search/1';
    window.history.pushState({}, 'test page', initialPath);
  });

  it('renders loading component', () => {
    render(component);
    expect(screen.getByTestId('loader')).toBeInTheDocument();
  });

  // BUG: server.use() or BeforeEach(() => server.resetHandlers()) don't work

  // it('renders an appropriate message is displayed if no cards are present', async () => {
  //   const messageForEmptyList = 'Nothing found';
  //   server.use(
  //     http.get(`${BASE_URL}/people/`, () => {
  //       return HttpResponse.json({ count: 0, results: [] });
  //     }),
  //   );

  //   const initialPath = '/search/1';
  //   window.history.pushState({}, 'test page', initialPath);

  //   render(component);

  //   await waitFor(() => {
  //     expect(screen.getByText(messageForEmptyList)).toBeInTheDocument();
  //   });
  // });

  // it('renders the specified number of cards', async () => {
  //   function createElements(length: number) {
  //     const elements = [];

  //     for (let i = 0; i < length; i++) {
  //       elements.push({ name: `test name ${i}`, url: `test/url/${i}/` });
  //     }

  //     return elements;
  //   }

  //   const testLength = 20;

  //   const elements = createElements(testLength);

  //   server.use(
  //     http.get(`${BASE_URL}/people/`, () => {
  //       return HttpResponse.json({ count: testLength, results: elements });
  //     }),
  //   );

  //   render(component);

  //   await waitFor(() => {
  //     for (let i = 0; i < elements.length; i++) {
  //       expect(
  //         screen.getByText(new RegExp(`${elements[i].name}$`, 'i')),
  //       ).toBeInTheDocument();
  //     }
  //   });
  // });
});
