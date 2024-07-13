import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import './pagination.css';

interface PaginationProps {
  elementsCount: number;
  currentPage: number;
}

const Pagination: FunctionComponent<PaginationProps> = ({
  elementsCount,
  currentPage,
}) => {
  const elementsPerPage = 10;
  const totalPages = Math.ceil(elementsCount / elementsPerPage);

  return (
    <div className="pagination">
      <Link
        to={`/search/${currentPage - 1}`}
        className={currentPage <= 1 ? 'button disabled' : 'button'}
      >
        prev
      </Link>
      <div>{currentPage}</div>
      <Link
        to={`/search/${currentPage + 1}`}
        className={currentPage >= totalPages ? 'button disabled' : 'button'}
      >
        next
      </Link>
    </div>
  );
};

export default Pagination;
