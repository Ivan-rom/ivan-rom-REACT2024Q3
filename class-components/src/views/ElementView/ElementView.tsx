import { FC } from 'react';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { BASE_PATH, NOT_FOUND_PATH } from '../../helpers/constants';
import Loader from '../../components/Loader/Loader';
import Details from '../../components/Details/Details';
import { useGetPersonQuery } from '../../store/api/api';
import classNames from 'classnames';

import styles from './elementView.module.css';

const ElementView: FC = () => {
  const { elementId, page } = useParams();
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetPersonQuery(elementId!);

  function closeDetails() {
    navigate(`${BASE_PATH}/${page}`);
  }

  if (isError) return <Navigate to={NOT_FOUND_PATH} />;

  if (isLoading) return <Loader />;

  return (
    <div className={styles['element-view']}>
      <Details data={data!} />
      <button
        data-testid="close-button"
        onClick={closeDetails}
        className={classNames('button', styles.button)}
      >
        X
      </button>
    </div>
  );
};

export default ElementView;
