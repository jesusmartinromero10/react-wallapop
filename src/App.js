import './App.css';

import LoginPage from './components/loginPage';
import { useState } from 'react';
import AdvertsPage from './components/advertsPage';
import NewAdvertPage from './components/newAdvertPage';
import { Routes, Route, Navigate } from 'react-router-dom';
import AdvertPage from './components/AdvertPage';
import NotFoundPage from './components/NotFoundPage';
import RequireAuth from './components/RequireAuth';
import { AuthContext } from './context/context';

function App({ isInitiallyLogged }) {
  const [isLogged, setIsLogged] = useState(isInitiallyLogged);
  const handleLoging = () => {
    setIsLogged(true);
  };
  const handleLogout = () => {
    setIsLogged(false);
  };

  const authValue = {
    onLogout: handleLogout,
    isLogged,
    onLogin: handleLoging,
  };
  return (
    <div className="App">
      <AuthContext.Provider value={authValue}>
        <Routes>
          <Route
            path="/login"
            element={
              <LoginPage
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
      </AuthContext.Provider>
    </div>
  );
}

export default App;
