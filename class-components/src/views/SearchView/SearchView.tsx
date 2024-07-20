import { FunctionComponent, useEffect } from 'react';
import Search from '../../components/Search/Search';

import List from '../../components/List/List';

import ErrorButton from '../../components/ErrorButton/ErrorButton';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { BASE_PATH, HOME_PAGE } from '../../helpers/constants';

import './searchView.css';

const SearchView: FunctionComponent = () => {
  const { page, elementId } = useParams();
  const navigate = useNavigate();
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
        <Search />
        <List />
      </div>

      <Outlet />

      {elementId && (
        <button onClick={closeDetails} className="search-view__close-button" />
      )}
    </div>
  );
};

export default SearchView;
