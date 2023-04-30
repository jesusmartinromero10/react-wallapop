import Header from './Header';
import '../../styles/styleLayaud.css';

const Layout = ({ title, children }) => {
  return (
    <div className="layaud">
      <Header />
      <main className="mainLayaud">
        <h2 className="h2-layaud">{title}</h2>
        {children}
      </main>
      <footer className="footerLayaud">Wallapop R 2023</footer>
    </div>
  );
};
export default Layout;
