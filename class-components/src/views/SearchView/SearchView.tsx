import { FunctionComponent, useEffect, useState } from 'react';
import Search from '../../components/Search/Search';
import { Person } from '../../helpers/interfaces';
import List from '../../components/List/List';
import Loader from '../../components/Loader/Loader';
import ErrorButton from '../../components/ErrorButton/ErrorButton';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import Pagination from '../../components/Pagination/Pagination';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

import './searchView.css';

const SearchView: FunctionComponent = () => {
  const { page } = useParams();
  const navigate = useNavigate();
  const [elements, setElements] = useState<Person[]>([]);
  const [elementsCount, setElementsCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const currentPage = page ? +page : 1;

  useEffect(() => {
    if (!page) navigate('/search/1');
  }, [page, navigate]);

  return (
    <div className="search-view">
      <ErrorBoundary>
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
              <List elements={elements} />
              <Pagination
                currentPage={currentPage}
                elementsCount={elementsCount}
              />
            </>
          )}
        </div>

        <Outlet />
      </ErrorBoundary>
    </div>
  );
};

export default SearchView;
