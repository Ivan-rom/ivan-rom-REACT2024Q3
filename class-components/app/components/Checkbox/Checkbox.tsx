import { useDispatch } from 'react-redux';
import { Person } from '../../helpers/interfaces';
import {
  addSelectedPerson,
  removeSelectedPerson,
} from '../../store/peopleSlice/peopleSlice';
import { ChangeEvent, FC, useMemo } from 'react';
import useAppSelector from '../../hooks/useAppSelector';

type Props = {
  person: Person;
};

const Checkbox: FC<Props> = ({ person }) => {
  const { url } = person;
  const dispatch = useDispatch();
  const { selectedPeople } = useAppSelector((state) => state.people);

  const isSelected = useMemo(
    () => Boolean(selectedPeople.find((element) => element.url === url)),
    [selectedPeople, url],
  );

  function changeHandler({ target }: ChangeEvent<HTMLInputElement>) {
    if (target.checked) {
      dispatch(addSelectedPerson(person));
    } else {
      dispatch(removeSelectedPerson(url));
    }
  }

  return (
    <input type="checkbox" onChange={changeHandler} checked={isSelected} />
  );
};

export default Checkbox;
