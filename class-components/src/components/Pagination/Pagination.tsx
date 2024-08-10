import { FC } from 'react';
import classNames from 'classnames';
import Link from 'next/link';

import styles from './pagination.module.css';

const elementsPerPage = 10;

interface Props {
  elementsCount: number;
  page: string;
  id?: string;
  search: string;
}

const Pagination: FC<Props> = ({ elementsCount, page, id, search }) => {
  const currentPage = +page;

  const totalPages = Math.ceil(elementsCount / elementsPerPage);

  const prevLink = id
    ? `?page=${currentPage - 1}&search=${search}&id=${id}`
    : `?page=${currentPage - 1}&search=${search}`;

  const nextLink = id
    ? `?page=${currentPage + 1}&search=${search}&id=${id}`
    : `?page=${currentPage + 1}&search=${search}`;

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
