import { FC, useEffect, useState } from 'react';
import { Person } from '../../helpers/interfaces';
import { HOME_PAGE, NOT_FOUND_PATH, URL } from '../../helpers/constants';
import { useNavigate } from 'react-router-dom';

import './search.css';
import { getData } from '../../helpers/api';

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
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('search-term') || '',
  );

  useEffect(() => {
    makeRequest();
  }, [currentPage]);

  function makeRequest() {
    updateLoader(true);

    const search = searchTerm.trim();
    localStorage.setItem('search-term', search);

    getData(`${URL}/?page=${currentPage}&search=${search}`)
      .then((res) => {
        updateElements(res.results);
        updateLoader(false);
        setElementsCount(res.count);
      })
      .catch(() => navigate(NOT_FOUND_PATH));
  }

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    // to avoid double request and reset currentPage to avoid invalid request
    if (currentPage !== 1) navigate(HOME_PAGE);
    else makeRequest();
  }

  return (
    <form onSubmit={submitHandler} className="search">
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
