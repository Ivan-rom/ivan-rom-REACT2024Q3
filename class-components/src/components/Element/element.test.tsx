import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Element from './Element';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { RouterContext } from 'next/dist/shared/lib/router-context.shared-runtime';
import { createMockRouter } from '../../../mock/createMockRouter';

describe('Element component', () => {
  it('renders the relevant card data', () => {
    const testData = {
      name: 'test name',
      height: 'test height',
      mass: 'test mass',
      gender: 'test gender',
      hair_color: 'test hair color',
      skin_color: 'test skin color',
      eye_color: 'test eye color',
      birth_year: 'test birth year',
      url: 'test/url/1/',
    };

    const detailsButtonText = 'More details';

    const router = createMockRouter({ pathname: '?page=1&search=' });

    render(
      <RouterContext.Provider value={router}>
        <Provider store={store}>
          <Element person={testData} search="" page="1" />
        </Provider>
      </RouterContext.Provider>,
    );

    expect(screen.getByText(testData.name)).toBeInTheDocument();
    expect(screen.getByText(detailsButtonText)).toBeInTheDocument();
  });
});
