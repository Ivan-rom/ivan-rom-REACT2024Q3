import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import List from './List';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { server } from '../../../mock/server';
import { PeopleResponse } from '@/helpers/interfaces';
import { mockedPerson } from '../../../mock/mockedResponses';

const mockData: PeopleResponse = {
  count: 1,
  results: [mockedPerson],
};

const component = (
  <Provider store={store}>
    <BrowserRouter>
      <Routes>
        <Route path="/search/:page?" element={<List data={mockData} />} />
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

  it('renders data from server', async () => {
    render(component);

    await waitFor(() => {
      expect(screen.getByText('test name')).toBeInTheDocument();
    });
  });
});
