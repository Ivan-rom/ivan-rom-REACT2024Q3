import { ChangeEvent, FC, useEffect } from 'react';
import { HOME_PAGE, LOCAL_STORAGE_SEARCH_KEY } from '../../helpers/constants';
import useLocalStorage from '../../hooks/useLocalStorage';
import useAppDispatch from '../../hooks/useAppDispatch';
import { updateSearchTerm } from '../../store/peopleSlice/peopleSlice';
import { useNavigate, useParams } from 'react-router-dom';

import styles from './search.module.css';

const Search: FC = () => {
  const dispatch = useAppDispatch();
  const { page, elementId } = useParams();
  const navigate = useNavigate();
  const currentPage = page ? +page : 1;
  const searchPage = elementId
    ? `${HOME_PAGE}/details/${elementId}`
    : HOME_PAGE;
  const [searchTerm, setSearchTerm] = useLocalStorage(LOCAL_STORAGE_SEARCH_KEY);

  useEffect(() => {
    dispatch(updateSearchTerm(searchTerm));
  }, []);

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem(LOCAL_STORAGE_SEARCH_KEY, searchTerm.trim());
    // to avoid double request and reset currentPage to avoid invalid request
    if (currentPage !== 1) navigate(searchPage);
    dispatch(updateSearchTerm(searchTerm));
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
