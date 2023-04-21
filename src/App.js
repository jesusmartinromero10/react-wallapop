import './App.css';
import Layaud from './components/layaud';
import LoginPage from './components/loginPage';
import { useState } from 'react';

function App() {
  const [isLogged, setIsLogged] = useState(false);
  const handleLoging = () => {
    setIsLogged(true);
  };
  return (
    <div className="App">
      {isLogged ? (
        <Layaud />
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
