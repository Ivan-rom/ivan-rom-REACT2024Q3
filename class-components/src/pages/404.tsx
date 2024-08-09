import { FC } from 'react';
import { HOME_PAGE } from '@/helpers/constants';
import Link from 'next/link';

import styles from './notFoundView.module.css';

const NotFoundView: FC = () => {
  return (
    <div className={styles['not-found-view']}>
      <h1>404</h1>
      <h2>The page is not found</h2>
      <div>
        You can go to{' '}
        <Link href={HOME_PAGE} className="button">
          home page
        </Link>
      </div>
    </div>
  );
};

export default NotFoundView;
