import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from '@remix-run/react';
import './tailwind.css';
import { Provider } from 'react-redux';
import { store } from './store/store';
import ContextProvider from './components/ContextProvider/ContextProvider';
import { cssBundleHref } from '@remix-run/css-bundle';
import type { LinksFunction } from '@remix-run/node'; // or cloudflare/deno

import './index.css';

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <Provider store={store}>
          <ContextProvider>
            {children}
            <ScrollRestoration />
            <Scripts />
          </ContextProvider>
        </Provider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
