import { FC, useState } from 'react';
import classNames from 'classnames';

import './errorButton.css';

const ErrorButton: FC = () => {
  const [hasError, setHasError] = useState(false);

  if (hasError) throw new Error('Synthetic error');

  return (
    <button
      className={classNames('button', 'error-button')}
      onClick={() => setHasError(true)}
    >
      Create error
    </button>
  );
};

export default ErrorButton;
