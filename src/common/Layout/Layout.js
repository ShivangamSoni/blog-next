import styles from "./styles.module.css";

import Header from "../Header/Header";
import Notification from "../Notification/Notification";

const Layout = ({ children }) => {
  return (
    <div className={styles.container}>
      <Header />
      <main>{children}</main>
      <Notification />
    </div>
  );
};

export default Layout;
