import { render, screen } from '@testing-library/react';
import { expect, it, test } from 'vitest';
import '@testing-library/jest-dom';
import List from './List';

test('List component', () => {
  const messageForEmptyList = 'Nothing found';

  it('renders an appropriate message is displayed if no cards are present', () => {
    render(<List />);
    expect(screen.getByText(messageForEmptyList)).toBeInDocument();
  });
});
