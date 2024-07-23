import { FC } from 'react';
import { Link, useParams } from 'react-router-dom';

import './pagination.css';

const elementsPerPage = 10;

interface Props {
  elementsCount: number;
}

const Pagination: FC<Props> = ({ elementsCount }) => {
  const { page, elementId } = useParams();
  const currentPage = +page!;

  const totalPages = Math.ceil(elementsCount / elementsPerPage);

  const prevLink = elementId
    ? `/search/${currentPage - 1}/details/${elementId}`
    : `/search/${currentPage - 1}`;

  const nextLink = elementId
    ? `/search/${currentPage + 1}/details/${elementId}`
    : `/search/${currentPage + 1}`;

  return (
    <div className="pagination">
      <Link
        to={prevLink}
        className={currentPage > 1 ? 'button' : 'button disabled'}
      >
        prev
      </Link>
      <div>{currentPage}</div>
      <Link
        to={nextLink}
        className={currentPage < totalPages ? 'button' : 'button disabled'}
      >
        next
      </Link>
    </div>
  );
};

export default Pagination;
