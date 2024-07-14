import { FC } from 'react';

import './loader.css';

const Loader: FC = () => {
  return (
    <div data-testid="loader" className="loader">
      Loading...
    </div>
  );
};

export default Loader;
