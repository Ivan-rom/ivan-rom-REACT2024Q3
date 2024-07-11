import { FunctionComponent } from 'react';
import { Person } from '../helpers/interfaces';

interface ElementProps {
  data: Person;
}

const Element: FunctionComponent<ElementProps> = ({ data }) => {
  const { name, mass, height, gender } = data;
  return (
    <li>
      <div>Name: {name}</div>
      <div>Weight: {mass}kg</div>
      <div>Height: {height}</div>
      <div>Gender: {gender}</div>
    </li>
  );
};

export default Element;
