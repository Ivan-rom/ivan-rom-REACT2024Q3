import { FC } from 'react';
import Element from '../Element/Element';
import Pagination from '../Pagination/Pagination';
import { PeopleResponse } from '../../helpers/interfaces';

import styles from './list.module.css';
import { ClientOnly } from 'remix-utils/client-only';

type Props = {
  data: PeopleResponse;
};

const List: FC<Props> = ({ data }) => {
  if (!data?.results.length) return <h2>Nothing found</h2>;

  return (
    <div className={styles.list}>
      <ul className={styles.content}>
        {data.results.map((person) => (
          <Element person={person} key={person.url} />
        ))}
      </ul>
      <ClientOnly>{() => <Pagination elementsCount={data.count} />}</ClientOnly>
    </div>
  );
};

export default List;
