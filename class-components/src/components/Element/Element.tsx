import { ChangeEvent, FC, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getElementId } from '../../helpers/getElementId';
import useAppSelector from '../../hooks/useAppSelector';
import useAppDispatch from '../../hooks/useAppDispatch';
import {
  addSelectedPerson,
  removeSelectedPerson,
} from '../../store/peopleSlice';
import { Person } from '../../helpers/interfaces';

import './element.css';

interface Props {
  person: Person;
}

const Element: FC<Props> = ({ person }) => {
  const { url, name } = person;
  const dispatch = useAppDispatch();
  const { selectedPeople } = useAppSelector((state) => state.people);
  const index = selectedPeople.findIndex((element) => element.url === url);
  const [isSelected, setIsSelected] = useState(index !== -1);
  const id = getElementId(url);

  useEffect(() => {
    const index = selectedPeople.findIndex((element) => element.url === url);
    setIsSelected(index !== -1);
  }, [selectedPeople, url]);

  function changeHandler({ target }: ChangeEvent<HTMLInputElement>) {
    setIsSelected(target.checked);
    if (target.checked) {
      dispatch(addSelectedPerson(person));
    } else {
      dispatch(removeSelectedPerson(url));
    }
  }

  return (
    <li className="element">
      <div className="element__name">{name}</div>
      <input type="checkbox" onChange={changeHandler} checked={isSelected} />
      <Link to={`details/${id}`} className="element__link button">
        More details
      </Link>
    </li>
  );
};

export default Element;
