import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import store from './redux/store';
import './index.css';
import Layout from './pages/Layout/Layout';
import Home from './pages/Home/Home';
import UncontrolledFormPage from './pages/UncontrolledFormPage/UncontrolledFormPage';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="uncontrolled-form"
              element={<UncontrolledFormPage />}
            />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
