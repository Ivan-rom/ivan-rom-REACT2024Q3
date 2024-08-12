import { json, LoaderFunctionArgs, type MetaFunction } from '@remix-run/node';
import { Outlet } from 'react-router-dom';
import { PeopleResponse, ThemeContextType } from '../helpers/interfaces';
import {
  Link,
  useLoaderData,
  useSearchParams,
  useParams,
} from '@remix-run/react';
import { BASE_URL } from '../helpers/constants';
import List from '../components/List/List';
import ErrorButton from '../components/ErrorButton/ErrorButton';
import Search from '../components/Search/Search';
import ThemeControls from '../components/ThemeControls/ThemeControls';
import { useContext } from 'react';
import { ThemeContext } from '../helpers/context';
import classNames from 'classnames';
import Controls from '../components/Controls/Controls';
import { ClientOnly } from 'remix-utils/client-only';

import '../searchView.css';

export async function loader({ request }: LoaderFunctionArgs) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page');
  const search = url.searchParams.get('search') || '';

  const response = await fetch(
    `${BASE_URL}/people/?page=${page}&search=${search}`,
  );
  const data = (await response.json()) as PeopleResponse;

  return json(data);
}

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  const data = useLoaderData<typeof loader>();
  const [searchParams] = useSearchParams();
  const params = useParams();
  const { id } = params;
  const page = searchParams.get('page');
  const search = searchParams.get('search') || '';
  const closedDetailsPage = `/search/?page=${page}&search=${search}`;

  const { isDark } = useContext(ThemeContext) as ThemeContextType;

  const viewStyles = {
    'view-dark': isDark,
  };

  return (
    <div className={classNames('view', viewStyles)}>
      <div className="search-view-header">
        <div className="container">
          <div className="search-view-wrapper">
            <ErrorButton />
            <ClientOnly>{() => <Search />}</ClientOnly>
            <ClientOnly>{() => <ThemeControls />}</ClientOnly>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="search-view-content">
          <List data={data} />
          <Outlet />
        </div>
      </div>

      {id && (
        <Link
          to={closedDetailsPage}
          data-testid="close-button"
          className="search-view-close-button"
        />
      )}

      <ClientOnly>{() => <Controls />}</ClientOnly>
    </div>
  );
}
