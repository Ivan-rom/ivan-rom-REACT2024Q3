import { MetaFunction } from '@remix-run/node';
import { useNavigate } from '@remix-run/react';
import { useEffect } from 'react';

export const meta: MetaFunction = () => {
  return [
    { title: 'Redirect' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  const navigate = useNavigate();

  useEffect(() => {
    navigate('search/?page=1&search=');
  }, []);

  return <></>;
}
