import Header from './Header';

const Layout = ({ title, children, ...rest }) => {
  return (
    <div>
      <Header {...rest} />
      <main>
        <h2>{title}</h2>
        {children}
      </main>
      <footer>Wallapop R 2023</footer>
    </div>
  );
};
export default Layout;
