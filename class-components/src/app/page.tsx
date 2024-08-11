import CloseButton from '@/components/CloseButton/CloseButton';
import List from '@/components/List/List';
import { redirect } from 'next/navigation';
import { FC } from 'react';
import { HOME_PAGE } from '@/helpers/constants';

import styles from './searchView.module.css';

type Props = {
  searchParams: {
    search: string;
    page: string;
    id: string;
  };
};

const Page: FC<Props> = ({ searchParams }) => {
  const { page, search, id } = searchParams;

  if (!page) redirect(HOME_PAGE);

  return (
    <>
      <List page={page} search={search} id={id} />

      {id && (
        <CloseButton
          page={page}
          search={search}
          data-testid="close-button"
          className={styles['close-button']}
        />
      )}
    </>
  );
};

export default Page;
