import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import List from './List';
import { BrowserRouter } from 'react-router-dom';

describe('List component', () => {
  const messageForEmptyList = 'Nothing found';

  it('renders an appropriate message is displayed if no cards are present', () => {
    render(<List elements={[]} elementsCount={0} />);
    expect(screen.getByText(messageForEmptyList)).toBeInTheDocument();
  });

  it('renders the specified number of cards', () => {
    function createElements(length: number) {
      const elements = [];

      for (let i = 0; i < length; i++) {
        elements.push({ name: `test name ${i}`, url: `test/url/${i}/` });
      }

      return elements;
    }

    const testLength = 20;

    const elements = createElements(testLength);

    render(<List elements={elements} elementsCount={testLength} />, {
      wrapper: BrowserRouter,
    });

    for (let i = 0; i < elements.length; i++) {
      expect(
        screen.getByText(new RegExp(`${elements[i].name}$`, 'i')),
      ).toBeInTheDocument();
    }
  });
});
