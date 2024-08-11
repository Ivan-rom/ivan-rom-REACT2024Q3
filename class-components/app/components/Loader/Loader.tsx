import { FC } from 'react';

import styles from './loader.module.css';

const Loader: FC = () => {
  return (
    <div data-testid="loader" className={styles.loader}>
      Loading...
    </div>
  );
};

export default Loader;
