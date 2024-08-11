import Details from '@/components/Details/Details';
import { BASE_URL } from '@/helpers/constants';
import classNames from 'classnames';
import { FC } from 'react';
import CloseButton from '@/components/CloseButton/CloseButton';

import styles from './ElementView.module.css';

type Props = {
  searchParams: {
    search: string;
    page: string;
    id: string;
  };
};

const ElementView: FC<Props> = async ({ searchParams }) => {
  const { id, page, search } = searchParams;

  if (!id) return <></>;

  const response = await fetch(`${BASE_URL}/people/${id}`);
  const data = await response.json();

  return (
    <div className={styles['element-view']}>
      <Details data={data!} />
      <CloseButton
        page={page}
        search={search}
        data-testid="details-close-button"
        className={classNames('button', styles.button)}
      >
        X
      </CloseButton>
    </div>
  );
};

export default ElementView;
