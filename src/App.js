import './App.css';
import Layaud from './components/layaud';
import LoginPage from './components/loginPage';

function App() {
  return (
    <div className="App">
      <Layaud />
      <LoginPage
        placeholderEmail="Writte your email"
        placeholderPassword="Writte your password"
      >
        Login
      </LoginPage>
    </div>
  );
}

export default App;
