import { FC, useEffect } from 'react';
import { Person } from '../../helpers/interfaces';
import {
  HOME_PAGE,
  LOCAL_STORAGE_SEARCH_KEY,
  NOT_FOUND_PATH,
  URL,
} from '../../helpers/constants';
import { useNavigate } from 'react-router-dom';
import { fetchData } from '../../helpers/api';
import useLocalStorage from '../../hooks/useLocalStorage';

import './search.css';

interface Props {
  updateElements: (elements: Person[]) => void;
  updateLoader: (isLoading: boolean) => void;
  setElementsCount: (elementsCount: number) => void;
  currentPage: number;
}

const Search: FC<Props> = ({
  updateLoader,
  updateElements,
  setElementsCount,
  currentPage,
}) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useLocalStorage(LOCAL_STORAGE_SEARCH_KEY);

  useEffect(() => {
    makeRequest();
  }, [currentPage]);

  async function makeRequest() {
    updateLoader(true);

    try {
      const data = await fetchData(
        `${URL}/?page=${currentPage}&search=${searchTerm.trim()}`,
      );
      updateElements(data.results);
      updateLoader(false);
      setElementsCount(data.count);
    } catch {
      navigate(NOT_FOUND_PATH);
    }
  }

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    // to avoid double request and reset currentPage to avoid invalid request
    localStorage.setItem(LOCAL_STORAGE_SEARCH_KEY, searchTerm.trim());
    if (currentPage !== 1) navigate(HOME_PAGE);
    else makeRequest();
  }

  return (
    <form name="search-form" onSubmit={submitHandler} className="search">
      <input
        type="text"
        name="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={({ target }) => setSearchTerm(target.value)}
        className="search__input"
      />
      <button className="button">Search</button>
    </form>
  );
};

export default Search;
