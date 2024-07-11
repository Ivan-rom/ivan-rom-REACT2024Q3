import { FunctionComponent, useEffect, useState } from 'react';
import { Person } from '../helpers/interfaces';

const URL = 'https://swapi.dev/api/people/';

interface SearchProps {
  updateElements: (elements: Person[]) => void;
  updateLoader: (isLoading: boolean) => void;
}

const Search: FunctionComponent<SearchProps> = ({
  updateLoader,
  updateElements,
}) => {
  const [searchTerm, setSearchTerm] = useState(
    localStorage.getItem('search-term') || '',
  );

  useEffect(() => {
    makeRequest(searchTerm);
  }, []);

  function makeRequest(search = '') {
    updateLoader(true);
    fetch(search ? `${URL}/?search=${search}` : URL)
      .then((res) => res.json())
      .then((res) => {
        updateElements(res.results);
        updateLoader(false);
      });
  }

  function submitHandler(e: React.FormEvent) {
    e.preventDefault();
    const search = searchTerm.trim();
    localStorage.setItem('search-term', search);
    makeRequest(search);
  }

  return (
    <form onSubmit={submitHandler}>
      <input
        type="text"
        name="search"
        placeholder="Search..."
        value={searchTerm}
        onChange={({ target }) => setSearchTerm(target.value)}
      />
      <button>Search</button>
    </form>
  );
};

export default Search;
