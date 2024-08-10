import { FC } from 'react';
import Link from 'next/link';
import { getElementId } from '../../helpers/getElementId';
import { Person } from '../../helpers/interfaces';
import { Checkbox } from '../Checkbox/Checkbox';
import classNames from 'classnames';

import styles from './element.module.css';

interface Props {
  person: Person;
  search: string;
  page: string;
}

const Element: FC<Props> = ({ person, search, page }) => {
  const { name } = person;
  const id = getElementId(person.url);

  return (
    <li className={styles.element}>
      <div className={styles.name}>{name}</div>
      <Checkbox person={person} />
      <Link
        href={`?page=${page}&search=${search}&id=${id}`}
        className={classNames(styles.link, 'button')}
      >
        More details
      </Link>
    </li>
  );
};

export default Element;
