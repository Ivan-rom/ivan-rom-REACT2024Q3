import { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_PATH, NOT_FOUND_PATH, URL } from '../../helpers/constants';
import { Person } from '../../helpers/interfaces';
import Loader from '../../components/Loader/Loader';
import Details from '../../components/Details/Details';

import './elementView.css';
import { fetchData } from '../../helpers/api';

const ElementView: FC = () => {
  const { elementId, page } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<Person>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);

      try {
        const data = await fetchData(`${URL}${elementId}`);
        setData(data);
        setIsLoading(false);
      } catch {
        navigate(NOT_FOUND_PATH);
      }
    };

    getData();
  }, [elementId]);

  function closeDetails() {
    navigate(`${BASE_PATH}/${page}`);
  }

  return (
    <div className="element-view">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Details data={data!} />
          <button
            data-testid="close-button"
            onClick={closeDetails}
            className="element-view__button button"
          >
            X
          </button>
        </>
      )}
    </div>
  );
};

export default ElementView;
