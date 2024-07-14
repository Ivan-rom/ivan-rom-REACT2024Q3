import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';

import './pagination.css';

const elementsPerPage = 10;

interface Props {
  elementsCount: number;
}

const Pagination: FC<Props> = ({ elementsCount }) => {
  const { page } = useParams();
  const currentPage = +page!;

  const totalPages = Math.ceil(elementsCount / elementsPerPage);

  return (
    <div className="pagination">
      <Link
        to={`/search/${currentPage - 1}`}
        className={currentPage > 1 ? 'button' : 'button disabled'}
      >
        prev
      </Link>
      <div>{currentPage}</div>
      <Link
        to={`/search/${currentPage + 1}`}
        className={currentPage < totalPages ? 'button' : 'button disabled'}
      >
        next
      </Link>
    </div>
  );
};

export default Pagination;
