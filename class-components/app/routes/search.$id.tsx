import { FC } from 'react';
import { BASE_URL } from '../helpers/constants';
import Details from '../components/Details/Details';
import classNames from 'classnames';
import { json, LoaderFunctionArgs } from '@remix-run/node';
import { PersonResponse } from '../helpers/interfaces';
import { Link, useLoaderData, useSearchParams } from '@remix-run/react';

import '../elementView.css';

export async function loader({ params }: LoaderFunctionArgs) {
  const { id } = params;
  const response = await fetch(`${BASE_URL}/people/${id}`);
  const data = (await response.json()) as PersonResponse;

  return json(data);
}

const ElementView: FC = () => {
  const [searchParams] = useSearchParams();
  const page = searchParams.get('page');
  const search = searchParams.get('search');
  const data = useLoaderData<typeof loader>();

  return (
    <div className="element-view">
      <Details data={data!} />
      <Link
        to={`/search?page=${page}&search=${search}`}
        data-testid="close-button"
        className={classNames('button', 'element-view-button')}
      >
        X
      </Link>
    </div>
  );
};

export default ElementView;
