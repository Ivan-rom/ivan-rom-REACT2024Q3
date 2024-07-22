import { FunctionComponent, useEffect } from 'react';
import Search from '../../components/Search/Search';
import List from '../../components/List/List';
import ErrorButton from '../../components/ErrorButton/ErrorButton';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { BASE_PATH, HOME_PAGE } from '../../helpers/constants';
import useAppSelector from '../../hooks/useAppSelector';
import Controls from '../../components/Controls/Controls';

import './searchView.css';

const SearchView: FunctionComponent = () => {
  const { page, elementId } = useParams();
  const { selectedPeople } = useAppSelector((state) => state.people);
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

      {!!selectedPeople.length && <Controls />}
    </div>
  );
};

export default SearchView;
