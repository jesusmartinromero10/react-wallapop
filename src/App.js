import './App.css';

import LoginPage from './components/loginPage';
import { useState } from 'react';
import AdvertsPage from './components/advertsPage';
import NewAdvertPage from './components/newAdvertPage';

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
      {isLogged ? (
        <>
          <AdvertsPage onLogout={handleLogout} />
          <NewAdvertPage />
        </>
      ) : (
        <LoginPage
          setIsLogged={handleLoging}
          placeholderEmail="Writte your email"
          placeholderPassword="Writte your password"
          type="submit"
        >
          Login
        </LoginPage>
      )}
    </div>
  );
}

export default App;
