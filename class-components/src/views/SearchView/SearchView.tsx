import { FunctionComponent, useEffect, useState } from 'react';
import Search from '../../components/Search/Search';
import { Person } from '../../helpers/interfaces';
import List from '../../components/List/List';
import Loader from '../../components/Loader/Loader';
import ErrorButton from '../../components/ErrorButton/ErrorButton';
import Pagination from '../../components/Pagination/Pagination';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { BASE_PATH, HOME_PAGE } from '../../helpers/constants';

import './searchView.css';

const SearchView: FunctionComponent = () => {
  const { page, elementId } = useParams();
  const navigate = useNavigate();
  const [elements, setElements] = useState<Person[]>([]);
  const [elementsCount, setElementsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const currentPage = page ? +page : 1;

  useEffect(() => {
    if (!page) navigate(HOME_PAGE);
  }, [page, navigate]);

  function closeDetails() {
    navigate(`${BASE_PATH}/${currentPage}`);
  }

  return (
    <div className="search-view">
      <div className="search-view__content">
        <ErrorButton />
        <Search
          currentPage={currentPage}
          updateElements={setElements}
          updateLoader={setIsLoading}
          setElementsCount={setElementsCount}
        />
        {isLoading ? (
          <Loader />
        ) : (
          <>
            {elements.length ? (
              <>
                <List elements={elements} />
                <Pagination
                  currentPage={currentPage}
                  elementsCount={elementsCount}
                />
              </>
            ) : (
              <h2>Nothing found</h2>
            )}
          </>
        )}
      </div>

      <Outlet />

      {elementId && (
        <button onClick={closeDetails} className="search-view__close-button" />
      )}
    </div>
  );
};

export default SearchView;
