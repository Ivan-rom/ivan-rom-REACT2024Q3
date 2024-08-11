import { FC } from 'react';
import Element from '../Element/Element';
import Pagination from '../Pagination/Pagination';
import { useAppSelector } from '@/hooks/useAppSelector';
import { useGetPeopleQuery } from '@/store/api/api';
import Loader from '../Loader/Loader';
import { NOT_FOUND_PATH } from '@/helpers/constants';
import { useRouter } from 'next/router';

import styles from './list.module.css';

const List: FC = () => {
  const { searchTerm } = useAppSelector((state) => state.people);

  console.log(searchTerm);

  const router = useRouter();
  const { page } = router.query;
  const currentPage = page ? +page : 1;

  const { data, isError, isFetching } = useGetPeopleQuery({
    page: currentPage,
    searchTerm,
  });

  if (isError) router.push(NOT_FOUND_PATH);

  if (isFetching) return <Loader />;

  if (!data?.results.length) return <h2>Nothing found</h2>;

  return (
    <div className={styles.list}>
      <ul className={styles.content}>
        {data.results.map((person) => (
          <Element person={person} key={person.url} />
        ))}
      </ul>
      <Pagination elementsCount={data.count} />
    </div>
  );
};

export default List;
