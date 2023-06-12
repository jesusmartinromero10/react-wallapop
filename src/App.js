import './App.css';

import LoginPage from './components/loginPage';
import AdvertsPage from './components/advertsPage';
import NewAdvertPage from './components/newAdvertPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdvertPage from './components/AdvertPage';
import NotFoundPage from './components/NotFoundPage';
import RequireAuth from './components/RequireAuth';

function App({ isInitiallyLogged }) {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={
            <LoginPage
              placeholderEmail="Write your email"
              placeholderPassword="Write your password"
              type="submit"
            >
              Login
            </LoginPage>
          }
        />
        <Route
          path="/adverts"
          element={
            <RequireAuth>
              {' '}
              <AdvertsPage />
            </RequireAuth>
          }
        />
        <Route
          path="/adverts/:id"
          element={
            <RequireAuth>
              {' '}
              <AdvertPage />{' '}
            </RequireAuth>
          }
        />
        <Route
          path="/adverts/new"
          element={
            <RequireAuth>
              {' '}
              <NewAdvertPage />
            </RequireAuth>
          }
        />
        <Route path="/" element={<Navigate to="/adverts" />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" />} />
      </Routes>
    </div>
  );
}

export default App;
