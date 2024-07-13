import { FunctionComponent, useEffect, useState } from 'react';
import { Person } from '../../helpers/interfaces';
import { URL } from '../../helpers/constants';
import { useNavigate } from 'react-router-dom';

import './search.css';

interface SearchProps {
  updateElements: (elements: Person[]) => void;
  updateLoader: (isLoading: boolean) => void;
  setElementsCount: (elementsCount: number) => void;
  currentPage: number;
}

const Search: FunctionComponent<SearchProps> = ({
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

    fetch(`${URL}/?page=${currentPage}&search=${search}`)
      .then((res) => res.json())
      .then((res) => {
        updateElements(res.results);
        updateLoader(false);
        setElementsCount(res.count);
      });
  }

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    // to avoid double request and reset currentPage to avoid invalid request
    if (currentPage !== 1) navigate('/search/1');
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
