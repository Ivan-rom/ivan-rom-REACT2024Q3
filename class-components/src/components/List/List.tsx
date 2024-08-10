import { FC } from 'react';
import Element from '../Element/Element';
import Pagination from '../Pagination/Pagination';
import { BASE_URL } from '@/helpers/constants';
import { PeopleResponse } from '@/helpers/interfaces';

import styles from './list.module.css';

type Props = {
  page: string;
  search: string;
  id?: string;
};

const List: FC<Props> = async ({ page, search, id }) => {
  const response = await fetch(
    `${BASE_URL}/people/?page=${page}&search=${search}`,
  );

  const data = (await response.json()) as PeopleResponse;

  if (!data?.results.length) return <h2>Nothing found</h2>;

  return (
    <div className={styles.list}>
      <ul className={styles.content}>
        {data.results.map((person) => (
          <Element
            person={person}
            key={person.url}
            page={page}
            search={search}
          />
        ))}
      </ul>
      <Pagination
        elementsCount={data.count}
        page={page}
        id={id}
        search={search}
      />
    </div>
  );
};

export default List;
