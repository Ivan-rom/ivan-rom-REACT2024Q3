import { FunctionComponent } from 'react';
import { Person } from '../helpers/interfaces';
import Element from './Element';

interface ListProps {
  elements: Person[];
}

const List: FunctionComponent<ListProps> = ({ elements }) => {
  return (
    <ul>
      {elements.map((element) => (
        <Element data={element} key={element.url} />
      ))}
    </ul>
  );
};

export default List;
