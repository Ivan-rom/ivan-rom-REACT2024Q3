import { describe, expect, it } from 'vitest';
import { Person } from '../../helpers/interfaces';
import { render, screen } from '@testing-library/react';
import Details from './Details';

const data: Person = {
  name: 'test name',
  gender: 'test gender',
  hair_color: 'test hair color',
  height: 'test height',
  mass: 'test mass',
  skin_color: 'test skin color',
  eye_color: 'test eye color',
  birth_year: 'test birth year',
  url: 'test/url/1/',
};

describe('Details component', () => {
  it('renders provided data', () => {
    render(<Details data={data} />);

    expect(
      screen.getByText(new RegExp(`${data.name}`, 'i')),
    ).toBeInTheDocument();
  });
});
