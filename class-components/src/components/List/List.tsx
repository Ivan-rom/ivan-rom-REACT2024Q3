import { FC } from 'react';
import Element from '../Element/Element';
import Pagination from '../Pagination/Pagination';

import './list.css';

interface Props {
  elements: { name: string; url: string }[];
  elementsCount: number;
}

const List: FC<Props> = ({ elements, elementsCount }) => {
  if (elementsCount === 0) return <h2>Nothing found</h2>;

  return (
    <>
      <ul className="list">
        {elements.map((element) => (
          <Element name={element.name} url={element.url} key={element.url} />
        ))}
      </ul>
      <Pagination elementsCount={elementsCount} />
    </>
  );
};

export default List;
