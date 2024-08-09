import { ChangeEvent, FC, useMemo } from 'react';
import Link from 'next/link';
import { getElementId } from '../../helpers/getElementId';
import { useAppSelector } from '../../hooks/useAppSelector';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import {
  addSelectedPerson,
  removeSelectedPerson,
} from '../../store/peopleSlice/peopleSlice';
import { Person } from '../../helpers/interfaces';
import classNames from 'classnames';

import styles from './element.module.css';
import { BASE_PATH } from '@/helpers/constants';
import { useParams } from 'next/navigation';

interface Props {
  person: Person;
}

const Element: FC<Props> = ({ person }) => {
  const { url, name } = person;
  const { page } = useParams();
  const dispatch = useAppDispatch();
  const { selectedPeople } = useAppSelector((state) => state.people);
  const isSelected = useMemo(
    () => Boolean(selectedPeople.find((element) => element.url === url)),
    [selectedPeople, url],
  );
  const id = getElementId(url);

  function changeHandler({ target }: ChangeEvent<HTMLInputElement>) {
    if (target.checked) {
      dispatch(addSelectedPerson(person));
    } else {
      dispatch(removeSelectedPerson(url));
    }
  }

  return (
    <li className={styles.element}>
      <div className={styles.name}>{name}</div>
      <input type="checkbox" onChange={changeHandler} checked={isSelected} />
      <Link
        href={`${BASE_PATH}/${page}/details/${id}`}
        className={classNames(styles.link, 'button')}
      >
        More details
      </Link>
    </li>
  );
};

export default Element;
