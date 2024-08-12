import { FC } from 'react';
import { Link } from 'react-router-dom';
import { getElementId } from '../../helpers/getElementId';
import { Person } from '../../helpers/interfaces';
import classNames from 'classnames';
import { useSearchParams } from '@remix-run/react';

import styles from './element.module.css';
import Checkbox from '../Checkbox/Checkbox';

interface Props {
  person: Person;
}

const Element: FC<Props> = ({ person }) => {
  const { url, name } = person;
  const [searchParams] = useSearchParams();

  const page = searchParams.get('page');
  const search = searchParams.get('search');

  const id = getElementId(url);

  const urlWithSearchParams = `/search/${id}?page=${page}&search=${search}`;

  return (
    <li className={styles.element}>
      <div className={styles.name}>{name}</div>
      <Checkbox person={person} />
      <Link
        to={urlWithSearchParams}
        className={classNames(styles.link, 'button')}
      >
        More details
      </Link>
    </li>
  );
};

export default Element;
