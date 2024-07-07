import React from 'react';
import { Person } from '../helpers/interfaces';

interface ElementProps {
  data: Person;
}

class Element extends React.Component<ElementProps> {
  render() {
    const { name, mass, height, gender } = this.props.data;
    return (
      <li>
        <div>Name: {name}</div>
        <div>Weight: {mass}kg</div>
        <div>Height: {height}</div>
        <div>Gender: {gender}</div>
      </li>
    );
  }
}

export default Element;
