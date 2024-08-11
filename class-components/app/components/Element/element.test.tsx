import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Element from './Element';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from '../../store/store';

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

    render(
      <Provider store={store}>
        <BrowserRouter>
          <Element person={testData} />
        </BrowserRouter>
      </Provider>,
    );

    expect(screen.getByText(testData.name)).toBeInTheDocument();
    expect(screen.getByText(detailsButtonText)).toBeInTheDocument();
  });
});
