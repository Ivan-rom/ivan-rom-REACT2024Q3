import { FC } from 'react';
import { Person } from '../../helpers/interfaces';
import Element from '../Element/Element';

import './list.css';

interface Props {
  elements: Person[];
}

const List: FC<Props> = ({ elements }) => {
  return (
    <ul className="list">
      {elements.map((element) => (
        <Element data={element} key={element.url} />
      ))}
    </ul>
  );
};

export default List;
