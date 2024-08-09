import { FC } from 'react';
import classNames from 'classnames';
import { useParams } from 'next/navigation';
import Link from 'next/link';

import styles from './pagination.module.css';

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

  const prevStyles = {
    disabled: currentPage <= 1,
  };

  const nextStyles = {
    disabled: currentPage >= totalPages,
  };

  return (
    <div className={styles.pagination}>
      <Link href={prevLink} className={classNames(prevStyles, 'button')}>
        prev
      </Link>
      <div>{currentPage}</div>
      <Link href={nextLink} className={classNames(nextStyles, 'button')}>
        next
      </Link>
    </div>
  );
};

export default Pagination;
