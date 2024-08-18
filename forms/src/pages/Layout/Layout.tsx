import { ReactNode } from 'react';
import Header from '../../components/Header/Header';

function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
    </>
  );
}

export default Layout;
