import { FC, ReactNode, useContext } from 'react';
import Search from '@/components/Search/Search';
import List from '@/components/List/List';
import ErrorButton from '@/components/ErrorButton/ErrorButton';
import { useAppSelector } from '@/hooks/useAppSelector';
import Controls from '@/components/Controls/Controls';
import classNames from 'classnames';
import { BASE_PATH } from '@/helpers/constants';
import ThemeControls from '@/components/ThemeControls/ThemeControls';
import { ThemeContext } from '@/helpers/context';
import { useRouter } from 'next/router';
import { ThemeContextType } from '@/helpers/interfaces';

import styles from './searchView.module.css';
import { wrapper } from '@/store/store';
import { getPeople, getRunningQueriesThunk } from '@/store/api/api';

type Props = {
  children?: ReactNode;
};

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (context) => {
    const { page } = context.params!;
    const currentPage = page ? +page : 1;

    const state = store.getState();
    const searchTerm = state.people.searchTerm;

    store.dispatch(getPeople.initiate({ searchTerm, page: currentPage }));

    await Promise.all(store.dispatch(getRunningQueriesThunk()));

    return {
      props: {},
    };
  },
);

const SearchView: FC<Props> = ({ children }) => {
  const router = useRouter();
  const { page, elementId } = router.query;
  const { selectedPeople } = useAppSelector((state) => state.people);
  const { isDark } = useContext(ThemeContext) as ThemeContextType;
  const currentPage = page ? +page : 1;

  function closeDetails() {
    router.push(`${BASE_PATH}/${currentPage}`);
  }

  const viewStyles = {
    'view-dark': isDark,
  };

  return (
    <div className={classNames('view', viewStyles)}>
      <div className={styles.header}>
        <div className="container">
          <div className={styles.wrapper}>
            <ErrorButton />
            <Search />
            <ThemeControls />
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.content}>
          <List />
          {children}
        </div>
      </div>

      {elementId && (
        <button
          onClick={closeDetails}
          className={styles['close-button']}
          data-testid="close-button"
        />
      )}

      {!!selectedPeople.length && <Controls />}
    </div>
  );
};

export default SearchView;
