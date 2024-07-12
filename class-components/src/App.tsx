import { FunctionComponent } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import SearchView from './views/SearchView';
import ElementView from './views/ElementView';
import NotFoundView from './views/NotFoundView';

const App: FunctionComponent = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/search/:page?" element={<SearchView />}>
            <Route path="details/:elementId" element={<ElementView />} />
          </Route>
          <Route path="*" element={<NotFoundView />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
