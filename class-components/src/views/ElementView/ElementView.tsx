import { FunctionComponent, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { URL } from '../../helpers/constants';
import { Person } from '../../helpers/interfaces';
import Loader from '../../components/Loader/Loader';

import './elementView.css';

const ElementView: FunctionComponent = () => {
  const { elementId, page } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState<Person>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${URL}${elementId}`)
      .then((res) => res.json())
      .then((res) => {
        setData(res);
        setIsLoading(false);
      });
  }, [elementId]);

  function closeDetails() {
    navigate(`/search/${page}`);
  }

  return (
    <div className="element-view">
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div>Name: {data!.name}</div>
          <div>Weight: {data!.mass}kg</div>
          <div>Height: {data!.height}sm</div>
          <div>Gender: {data!.gender}</div>
          <div>Hair color: {data!.hair_color}</div>
          <div>Skin color: {data!.skin_color}</div>
          <div>Eye color: {data!.eye_color}</div>
          <div>Birth year: {data!.birth_year}</div>
          <button
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
