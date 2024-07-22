import { FC } from 'react';
import Element from '../Element/Element';
import Pagination from '../Pagination/Pagination';
import useAppSelector from '../../hooks/useAppSelector';
import { useGetPeopleQuery } from '../../helpers/api';
import Loader from '../Loader/Loader';
import { Navigate, useParams } from 'react-router-dom';
import { NOT_FOUND_PATH } from '../../helpers/constants';

import './list.css';

const List: FC = () => {
  const { searchTerm } = useAppSelector((state) => state.people);
  const { page } = useParams();
  const currentPage = page ? +page : 1;

  const { data, isError, isFetching } = useGetPeopleQuery({
    page: currentPage,
    searchTerm,
  });

  if (isError) return <Navigate to={NOT_FOUND_PATH} />;

  if (isFetching) return <Loader />;

  if (!data?.results.length) return <h2>Nothing found</h2>;

  return (
    <>
      <ul className="list">
        {data.results.map((person) => (
          <Element person={person} key={person.url} />
        ))}
      </ul>
      <Pagination elementsCount={data.count} />
    </>
  );
};

export default List;
