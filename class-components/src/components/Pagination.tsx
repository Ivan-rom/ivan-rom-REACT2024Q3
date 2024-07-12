import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

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
    <>
      <Link
        to={`/search/${currentPage - 1}`}
        className={currentPage <= 1 ? 'disabled' : ''}
      >
        prev
      </Link>
      <div>{currentPage}</div>
      <Link
        to={`/search/${currentPage + 1}`}
        className={currentPage >= totalPages ? 'disabled' : ''}
      >
        next
      </Link>
    </>
  );
};

export default Pagination;
