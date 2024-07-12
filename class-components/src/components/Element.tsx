import { FunctionComponent } from 'react';
import { Person } from '../helpers/interfaces';
import { Link } from 'react-router-dom';

interface ElementProps {
  data: Person;
}

const Element: FunctionComponent<ElementProps> = ({ data }) => {
  const { name, mass, height, gender, url } = data;

  // getting element id according to server data
  const urlElements = url.split('/');
  const id = urlElements[urlElements.length - 2];

  return (
    <li>
      <div>Name: {name}</div>
      <div>Weight: {mass}kg</div>
      <div>Height: {height}</div>
      <div>Gender: {gender}</div>
      <Link to={`details/${id}`}>details</Link>
    </li>
  );
};

export default Element;
