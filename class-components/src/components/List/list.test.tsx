import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import List from './List';
import { Provider } from 'react-redux';
import { makeStore } from '../../store/store';
import { server } from '../../../mock/server';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../../../mock/createMockRouter';

const store = makeStore();

const component = (
  <RouterContext.Provider value={createMockRouter({})}>
    <Provider store={store}>
      <List />
    </Provider>
  </RouterContext.Provider>
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

  it('renders data from server', async () => {
    render(component);

    await waitFor(() => {
      expect(screen.getByText('test name')).toBeInTheDocument();
    });
  });
});
