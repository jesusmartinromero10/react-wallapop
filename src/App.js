import './App.css';
import Layaud from './components/layaud';
import LoginPage from './components/loginPage';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <Layaud />
      <LoginPage
        placeholderEmail="Writte your email"
        placeholderPassword="Writte your password"
        type="submit"
      >
        Login
      </LoginPage>
    </div>
  );
}

export default App;
