import { render, screen, waitFor } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import List from './List';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { server } from '../../../mock/server';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../../../mock/createMockRouter';

describe('List component', () => {
  beforeEach(() => {
    server.resetHandlers();
    const initialPath = '/search/1';
    window.history.pushState({}, 'test page', initialPath);
  });

  it('renders data from server', async () => {
    const ResolvedList = await List({ search: '', page: '1' });

    render(
      <RouterContext.Provider value={createMockRouter({})}>
        <Provider store={store}>{ResolvedList}</Provider>
      </RouterContext.Provider>,
    );

    await waitFor(() => {
      expect(screen.getByText('test name')).toBeInTheDocument();
    });
  });
});
