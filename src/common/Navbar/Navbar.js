import styles from "./styles.module.css";

import NavLink from "../NavLink/NavLink";

const Links = [
  {
    id: 1,
    href: "/",
    label: "Home",
    type: "link",
  },
  {
    id: 2,
    href: "/contact-us",
    label: "Contact Us",
    type: "link",
  },
  {
    id: 3,
    href: "/signin",
    label: "SignIn",
    type: "button",
  },
];

const Navbar = ({ toggleNav, navActive }) => {
  return (
    <nav className={`${styles.nav} ${!navActive ? styles.hide : ""}`}>
      <ul className={styles.linkList}>
        {Links.map((link) => (
          <li key={link.id} onClick={toggleNav}>
            <NavLink {...link} />
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
