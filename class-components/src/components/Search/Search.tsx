'use client';

import { ChangeEvent, FC, useEffect } from 'react';
import { LOCAL_STORAGE_SEARCH_KEY } from '@/helpers/constants';
import useLocalStorage from '@/hooks/useLocalStorage';
import { useRouter, useSearchParams } from 'next/navigation';

import styles from './search.module.css';

const Search: FC = () => {
  const router = useRouter();
  const params = useSearchParams();
  const id = params.get('id');
  const page = params.get('page');
  const [searchTerm, setSearchTerm] = useLocalStorage(LOCAL_STORAGE_SEARCH_KEY);

  useEffect(() => {
    const idParam = id ? `&id=${id}` : '';
    const searchParams = `?page=${page}&search=${searchTerm}${idParam}`;
    router.push(searchParams);
  }, []);

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem(LOCAL_STORAGE_SEARCH_KEY, searchTerm.trim());
    const idParam = id ? `&id=${id}` : '';
    const searchParams = `?page=1&search=${searchTerm}${idParam}`;
    router.push(searchParams);
  }

  function changeHandler({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(value);
  }

  return (
    <form name="search-form" onSubmit={submitHandler} className={styles.search}>
      <input
        type="text"
        name="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={changeHandler}
        className={styles.input}
      />
      <button className="button">Search</button>
    </form>
  );
};

export default Search;
