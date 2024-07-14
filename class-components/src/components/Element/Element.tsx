import { FC } from 'react';
import { Link } from 'react-router-dom';
import { getElementId } from '../../helpers/getElementId';

import './element.css';

interface Props {
  name: string;
  url: string;
}

const Element: FC<Props> = ({ name, url }) => {
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
