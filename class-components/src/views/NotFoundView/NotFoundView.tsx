import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import './notFoundView.css';

const NotFoundView: FunctionComponent = () => {
  return (
    <div className="not-found-view">
      <h1>404</h1>
      <h2>The page is not found</h2>
      <div>
        You can go to{' '}
        <Link to="/search/1" className="button">
          home page
        </Link>
      </div>
    </div>
  );
};

export default NotFoundView;
