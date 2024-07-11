import { FunctionComponent, useState } from 'react';

const ErrorButton: FunctionComponent = () => {
  const [hasError, setHasError] = useState(false);

  if (hasError) throw new Error('Synthetic error');

  return <button onClick={() => setHasError(true)}>Create error</button>;
};

export default ErrorButton;
