import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Element from './Element';
import { BrowserRouter } from 'react-router-dom';

describe('Element component', () => {
  it('renders the relevant card data', () => {
    const testData = {
      name: 'test name',
      url: 'test/url/1/',
    };

    const detailsButtonText = 'More details';

    render(
      <BrowserRouter>
        <Element name={testData.name} url={testData.url} />
      </BrowserRouter>,
    );

    expect(screen.getByText(testData.name)).toBeInTheDocument();
    expect(screen.getByText(detailsButtonText)).toBeInTheDocument();
  });
});
