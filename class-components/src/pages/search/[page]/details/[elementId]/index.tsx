import { FC } from 'react';
import { BASE_PATH, NOT_FOUND_PATH } from '@/helpers/constants';
import Loader from '@/components/Loader/Loader';
import Details from '@/components/Details/Details';
import {
  getPeople,
  getPerson,
  getRunningQueriesThunk,
  useGetPersonQuery,
} from '@/store/api/api';
import classNames from 'classnames';
import { useRouter } from 'next/router';
import SearchLayout from '../../index';
import { wrapper } from '@/store/store';

import styles from './elementView.module.css';

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { elementId, page } = context.params!;

    const currentPage = page ? +page : 1;

    const state = store.getState();
    const searchTerm = state.people.searchTerm;

    store.dispatch(getPeople.initiate({ searchTerm, page: currentPage }));

    store.dispatch(getPerson.initiate(elementId as string));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  },
);

const ElementView: FC = () => {
  const router = useRouter();
  const { elementId, page } = router.query;
  const { data, isLoading, isError } = useGetPersonQuery(elementId as string);

  function closeDetails() {
    router.push(`${BASE_PATH}/${page}`);
  }

  if (isError) router.push(NOT_FOUND_PATH);

  if (isLoading) return <Loader />;

  return (
    <SearchLayout>
      <div className={styles['element-view']}>
        <Details data={data!} />
        <button
          data-testid="details-close-button"
          onClick={closeDetails}
          className={classNames('button', styles.button)}
        >
          X
        </button>
      </div>
    </SearchLayout>
  );
};

export default ElementView;
