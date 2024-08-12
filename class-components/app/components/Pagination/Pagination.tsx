import { FC } from 'react';
import classNames from 'classnames';
import { useSearchParams } from '@remix-run/react';

import styles from './pagination.module.css';

const elementsPerPage = 10;

interface Props {
  elementsCount: number;
}

const Pagination: FC<Props> = ({ elementsCount }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get('page') as string;
  const search = searchParams.get('search') || '';
  const id = searchParams.get('id');
  const currentPage = +page;

  const totalPages = Math.ceil(elementsCount / elementsPerPage);

  const getNewPage = (page: number) => {
    const params = new URLSearchParams();
    const nextPage = `${page}`;
    params.set('page', nextPage);
    params.set('search', search);
    if (id) params.set('id', id);

    return params;
  };

  const prevClick = () => {
    setSearchParams(getNewPage(currentPage - 1));
  };

  const nextClick = () => {
    setSearchParams(getNewPage(currentPage + 1));
  };

  const prevStyles = {
    disabled: currentPage <= 1,
  };

  const nextStyles = {
    disabled: currentPage >= totalPages,
  };

  return (
    <div className={styles.pagination}>
      <button onClick={prevClick} className={classNames(prevStyles, 'button')}>
        prev
      </button>
      <div>{currentPage}</div>
      <button onClick={nextClick} className={classNames(nextStyles, 'button')}>
        next
      </button>
    </div>
  );
};

export default Pagination;
