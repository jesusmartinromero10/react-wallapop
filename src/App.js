import './App.css';

import LoginPage from './components/loginPage';
import { useState } from 'react';
import AdvertsPage from './components/advertsPage';
import NewAdvertPage from './components/newAdvertPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdvertPage from './components/AdvertPage';
import NotFoundPage from './components/NotFoundPage';
import RequireAuth from './components/RequireAuth';

function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);
  const handleLoging = () => {
    setIsLogged(true);
  };
  const handleLogout = () => {
    setIsLogged(false);
  };
  return (
    <div className="App">
      <Routes>
        <Route
          path="/login"
          element={
            <LoginPage
              setIsLogged={handleLoging}
              placeholderEmail="Writte your email"
              placeholderPassword="Writte your password"
              type="submit"
            >
              Login
            </LoginPage>
          }
        />
        <Route
          path="/adverts"
          element={
            <RequireAuth isLogged={isLogged}>
              {' '}
              <AdvertsPage onLogout={handleLogout} isLogged={isLogged} />
            </RequireAuth>
          }
        />
        <Route
          path="/adverts/:id"
          element={
            <RequireAuth isLogged={isLogged}>
              {' '}
              <AdvertPage onLogout={handleLogout} isLogged={isLogged} />{' '}
            </RequireAuth>
          }
        />
        <Route
          path="/adverts/new"
          element={
            <RequireAuth isLogged={isLogged}>
              {' '}
              <NewAdvertPage onLogout={handleLogout} isLogged={isLogged} />
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
