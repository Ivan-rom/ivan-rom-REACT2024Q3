import { FC } from 'react';
import { Person } from '../../helpers/interfaces';

interface Props {
  data: Person;
}

const Details: FC<Props> = ({ data }) => {
  const {
    name,
    mass,
    height,
    gender,
    hair_color,
    skin_color,
    eye_color,
    birth_year,
  } = data;

  return (
    <>
      <div>Name: {name}</div>
      <div>Weight: {mass}kg</div>
      <div>Height: {height}sm</div>
      <div>Gender: {gender}</div>
      <div>Hair color: {hair_color}</div>
      <div>Skin color: {skin_color}</div>
      <div>Eye color: {eye_color}</div>
      <div>Birth year: {birth_year}</div>
    </>
  );
};

export default Details;
