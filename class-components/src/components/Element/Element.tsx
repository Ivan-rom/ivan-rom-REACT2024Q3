import { FunctionComponent } from 'react';
import { Person } from '../../helpers/interfaces';
import { Link } from 'react-router-dom';

import './element.css';

interface ElementProps {
  data: Person;
}

const Element: FunctionComponent<ElementProps> = ({ data }) => {
  const { name, url } = data;

  // getting element id according to server data
  const urlElements = url.split('/');
  const id = urlElements[urlElements.length - 2];

  return (
    <li className="element">
      <div className="element__name">{name}</div>
      <Link to={`details/${id}`} className="element__link button">
        More details
      </Link>
    </li>
  );
};

export default Element;
