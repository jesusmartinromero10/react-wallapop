import Header from './Header';

const Layout = ({ title, children }) => {
  return (
    <div>
      <Header />
      <main>
        <h2>{title}</h2>
        {children}
      </main>
      <footer>Wallapop R 2023</footer>
    </div>
  );
};
export default Layout;
