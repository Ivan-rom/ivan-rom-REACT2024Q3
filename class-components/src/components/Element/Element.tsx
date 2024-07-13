import { FC } from 'react';
import { Person } from '../../helpers/interfaces';
import { Link } from 'react-router-dom';
import { getElementId } from '../../helpers/getElementId';

import './element.css';

interface Props {
  data: Person;
}

const Element: FC<Props> = ({ data }) => {
  const { name, url } = data;
  const id = getElementId(url);

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
