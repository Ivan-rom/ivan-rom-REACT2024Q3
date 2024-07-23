import { FC, useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import SearchView from './views/SearchView/SearchView';
import ElementView from './views/ElementView/ElementView';
import NotFoundView from './views/NotFoundView/NotFoundView';
import { NOT_FOUND_PATH } from './helpers/constants';
import { ThemeContext } from './helpers/context';

import './index.css';

const App: FC = () => {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
  }, [isDark]);

  return (
    <>
      <ThemeContext.Provider value={{ isDark, setIsDark }}>
        <BrowserRouter>
          <Routes>
            <Route path="/search/:page?" element={<SearchView />}>
              <Route path="details/:elementId" element={<ElementView />} />
            </Route>
            <Route path={NOT_FOUND_PATH} element={<NotFoundView />} />
            <Route path="*" element={<Navigate to={NOT_FOUND_PATH} />} />
          </Routes>
        </BrowserRouter>
      </ThemeContext.Provider>
    </>
  );
};

export default App;
