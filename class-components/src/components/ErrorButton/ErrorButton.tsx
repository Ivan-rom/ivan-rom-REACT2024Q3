import { FC, useState } from 'react';
import classNames from 'classnames';

import styles from './errorButton.module.css';

const ErrorButton: FC = () => {
  const [hasError, setHasError] = useState(false);

  if (hasError) throw new Error('Synthetic error');

  return (
    <button
      className={classNames(styles['error-button'], 'button')}
      onClick={() => setHasError(true)}
    >
      Create error
    </button>
  );
};

export default ErrorButton;
