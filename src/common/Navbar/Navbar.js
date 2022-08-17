import { useSession, signOut } from "next-auth/react";

import styles from "./styles.module.css";

import NavLink from "../NavLink/NavLink";

const Navbar = ({ toggleNav, navActive }) => {
  const { status } = useSession();

  const isAuthenticated = status === "authenticated";

  const Links = [
    {
      id: 1,
      href: "/",
      label: "Home",
      type: "link",
      visible: true,
    },
    {
      id: 2,
      href: "/contact-us",
      label: "Contact Us",
      type: "link",
      visible: true,
    },
    {
      id: 3,
      href: "/dashboard",
      label: "Dashboard",
      type: "link",
      visible: isAuthenticated,
    },
    {
      id: 4,
      href: "/signin",
      label: "SignIn",
      type: "button",
      visible: !isAuthenticated,
    },
    {
      id: 5,
      href: "/register",
      label: "Regsiter",
      type: "button",
      visible: !isAuthenticated,
    },
  ];

  return (
    <nav className={`${styles.nav} ${!navActive ? styles.hide : ""}`}>
      <ul className={styles.linkList}>
        {Links.map((link) =>
          link.visible ? (
            <li key={link.id} onClick={toggleNav}>
              <NavLink {...link} />
            </li>
          ) : null,
        )}

        {isAuthenticated ? (
          <li>
            <button type="button" className={styles.logout} onClick={signOut}>
              Sign Out
            </button>
          </li>
        ) : null}
      </ul>
    </nav>
  );
};

export default Navbar;
