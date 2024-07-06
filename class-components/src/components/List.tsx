import React from 'react';
import { Person } from '../helpers/interfaces';
import Element from './Element';

interface ListProps {
  elements: Person[];
}

class List extends React.Component<ListProps> {
  render() {
    return (
      <ul>
        {this.props.elements.map((element) => (
          <Element data={element} key={element.url} />
        ))}
      </ul>
    );
  }
}

export default List;
