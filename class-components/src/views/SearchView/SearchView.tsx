import { FunctionComponent, useContext, useEffect } from 'react';
import Search from '../../components/Search/Search';
import List from '../../components/List/List';
import ErrorButton from '../../components/ErrorButton/ErrorButton';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { BASE_PATH, HOME_PAGE } from '../../helpers/constants';
import useAppSelector from '../../hooks/useAppSelector';
import Controls from '../../components/Controls/Controls';
import ThemeControls from '../../components/ThemeControls/ThemeControls';
import { ThemeContextType } from '../../helpers/interfaces';
import { ThemeContext } from '../../helpers/context';
import classNames from 'classnames';

import styles from './searchView.module.css';

const SearchView: FunctionComponent = () => {
  const { page, elementId } = useParams();
  const { selectedPeople } = useAppSelector((state) => state.people);
  const { isDark } = useContext(ThemeContext) as ThemeContextType;
  const navigate = useNavigate();
  const currentPage = page ? +page : 1;

  useEffect(() => {
    if (!page) navigate(HOME_PAGE);
  }, [page, navigate]);

  function closeDetails() {
    navigate(`${BASE_PATH}/${currentPage}`);
  }

  const viewStyles = {
    'view-dark': isDark,
  };

  return (
    <div className={classNames('view', viewStyles)}>
      <div className={styles.header}>
        <div className="container">
          <div className={styles.wrapper}>
            <ErrorButton />
            <Search />
            <ThemeControls />
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.content}>
          <List />
          <Outlet />
        </div>
      </div>

      {elementId && (
        <button
          onClick={closeDetails}
          className={styles['close-button']}
          data-testid="close-button"
        />
      )}

      {!!selectedPeople.length && <Controls />}
    </div>
  );
};

export default SearchView;
