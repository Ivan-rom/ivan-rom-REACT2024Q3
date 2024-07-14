import { FC, useState } from 'react';

import './errorButton.css';

const ErrorButton: FC = () => {
  const [hasError, setHasError] = useState(false);

  if (hasError) throw new Error('Synthetic error');

  return (
    <button className="error-button button" onClick={() => setHasError(true)}>
      Create error
    </button>
  );
};

export default ErrorButton;
