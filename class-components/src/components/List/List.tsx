import { FC } from 'react';
import { Person } from '../../helpers/interfaces';
import Element from '../Element/Element';
import Pagination from '../Pagination/Pagination';

import './list.css';

interface Props {
  elements: Person[];
  elementsCount: number;
}

const List: FC<Props> = ({ elements, elementsCount }) => {
  if (elementsCount === 0) return <h2>Nothing found</h2>;

  return (
    <>
      <ul className="list">
        {elements.map((element) => (
          <Element data={element} key={element.url} />
        ))}
      </ul>
      <Pagination elementsCount={elementsCount} />
    </>
  );
};

export default List;
