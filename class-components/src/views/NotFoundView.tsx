import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

const NotFoundView: FunctionComponent = () => {
  return (
    <>
      <h1>404</h1>
      <h2>The page is not found</h2>
      <div>
        You can go to <Link to="/search/1">home page</Link>
      </div>
    </>
  );
};

export default NotFoundView;
