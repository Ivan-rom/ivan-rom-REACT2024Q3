import { ChangeEvent, FC, useEffect } from 'react';
import { HOME_PAGE, LOCAL_STORAGE_SEARCH_KEY } from '../../helpers/constants';
import useLocalStorage from '../../hooks/useLocalStorage';
import './search.css';
import useAppDispatch from '../../hooks/useAppDispatch';
import { updateSearchTerm } from '../../store/peopleSlice';
import { useNavigate, useParams } from 'react-router-dom';

const Search: FC = () => {
  const dispatch = useAppDispatch();
  const { page } = useParams();
  const navigate = useNavigate();
  const currentPage = page ? +page : 1;
  const [searchTerm, setSearchTerm] = useLocalStorage(LOCAL_STORAGE_SEARCH_KEY);

  useEffect(() => {
    dispatch(updateSearchTerm(searchTerm));
  }, []);

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    localStorage.setItem(LOCAL_STORAGE_SEARCH_KEY, searchTerm.trim());
    // to avoid double request and reset currentPage to avoid invalid request
    if (currentPage !== 1) navigate(HOME_PAGE);
    dispatch(updateSearchTerm(searchTerm));
  }

  function changeHandler({ target: { value } }: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(value);
  }

  return (
    <form name="search-form" onSubmit={submitHandler} className="search">
      <input
        type="text"
        name="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={changeHandler}
        className="search__input"
      />
      <button className="button">Search</button>
    </form>
  );
};

export default Search;
