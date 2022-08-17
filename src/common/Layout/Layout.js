import Header from "../Header/Header";
import Notification from "../Notification/Notification";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main>{children}</main>
      <Notification />
    </>
  );
};

export default Layout;
