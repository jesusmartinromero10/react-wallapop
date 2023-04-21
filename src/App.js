import './App.css';
import Layaud from './components/layaud';
import LoginPage from './components/loginPage';
import axios from 'axios';

function App() {
  const handClick = async event => {
    event.preventDefault();
    const respe = await axios.get('/api/v1/adverts');

    console.log(respe);
    //console.log(event)
  };
  return (
    <div className="App">
      <Layaud />
      <LoginPage
        placeholderEmail="Writte your email"
        placeholderPassword="Writte your password"
        onClick={handClick}
        type="submit"
      >
        Login
      </LoginPage>
    </div>
  );
}

export default App;
