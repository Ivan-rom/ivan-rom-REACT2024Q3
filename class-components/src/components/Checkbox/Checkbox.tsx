'use client';

import { Person } from '@/helpers/interfaces';
import { useAppSelector } from '@/hooks/useAppSelector';
import {
  addSelectedPerson,
  removeSelectedPerson,
} from '@/store/peopleSlice/peopleSlice';
import { ChangeEvent, FC, useMemo } from 'react';
import { useDispatch } from 'react-redux';

type Props = {
  person: Person;
};

export const Checkbox: FC<Props> = ({ person }) => {
  const dispatch = useDispatch();

  const { selectedPeople } = useAppSelector((state) => state.people);

  const isSelected = useMemo(
    () => Boolean(selectedPeople.find((element) => element.url === person.url)),
    [selectedPeople, person.url],
  );

  function changeHandler({ target }: ChangeEvent<HTMLInputElement>) {
    if (target.checked) {
      dispatch(addSelectedPerson(person));
    } else {
      dispatch(removeSelectedPerson(person.url));
    }
  }

  return (
    <input type="checkbox" onChange={changeHandler} checked={isSelected} />
  );
};
