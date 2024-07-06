import React from 'react';
import { Person } from '../helpers/interfaces';

interface ElementProps {
  data: Person;
}

class Element extends React.Component<ElementProps> {
  render() {
    return (
      <li>
        <div>Name: {this.props.data.name}</div>
        <div>Weight: {this.props.data.mass}kg</div>
        <div>Height: {this.props.data.height}</div>
        <div>Gender: {this.props.data.gender}</div>
      </li>
    );
  }
}

export default Element;
