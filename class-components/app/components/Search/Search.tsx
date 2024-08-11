import { ChangeEvent, FC, useEffect } from 'react';
import { LOCAL_STORAGE_SEARCH_KEY } from '../../helpers/constants';
import useLocalStorage from '../../hooks/useLocalStorage';
import useAppDispatch from '../../hooks/useAppDispatch';
import { updateSearchTerm } from '../../store/peopleSlice/peopleSlice';
import { useParams, useSearchParams } from '@remix-run/react';

import styles from './search.module.css';

const Search: FC = () => {
  const dispatch = useAppDispatch();
  const [, setSearchParams] = useSearchParams();
  const params = useParams();
  const [searchTerm, setSearchTerm] = useLocalStorage(LOCAL_STORAGE_SEARCH_KEY);

  useEffect(() => {
    dispatch(updateSearchTerm(searchTerm));
  }, []);

  const getNewSearchParams = () => {
    const newSearchParams = new URLSearchParams();
    newSearchParams.set('page', '1');
    newSearchParams.set('search', searchTerm);
    const { id } = params;
    if (id) newSearchParams.set('id', id);

    return newSearchParams;
  };

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem(LOCAL_STORAGE_SEARCH_KEY, searchTerm.trim());

    setSearchParams(getNewSearchParams());
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
