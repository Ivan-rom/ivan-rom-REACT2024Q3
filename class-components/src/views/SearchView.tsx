import { FunctionComponent, useEffect, useState } from 'react';
import Search from '../components/Search';
import { Person } from '../helpers/interfaces';
import List from '../components/List';
import Loader from '../components/Loader';
import ErrorButton from '../components/ErrorButton';
import ErrorBoundary from '../components/ErrorBoundary';
import Pagination from '../components/Pagination';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

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
    <>
      <ErrorBoundary>
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

        <Outlet />
      </ErrorBoundary>
    </>
  );
};

export default SearchView;
