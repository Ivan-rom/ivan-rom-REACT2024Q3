import { FunctionComponent } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import SearchView from './views/SearchView/SearchView';
import ElementView from './views/ElementView/ElementView';
import NotFoundView from './views/NotFoundView/NotFoundView';
import { NOT_FOUND_PATH } from './helpers/constants';

import './index.css';

const App: FunctionComponent = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/search/:page?" element={<SearchView />}>
            <Route path="details/:elementId" element={<ElementView />} />
          </Route>
          <Route path={NOT_FOUND_PATH} element={<NotFoundView />} />
          <Route path="*" element={<Navigate to={NOT_FOUND_PATH} />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
