import './App.css';
import Layaud from './components/layaud';
import LoginPage from './components/loginPage';
import { useState } from 'react';

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
        <Layaud onLogout={handleLogout} />
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
