import Link from "next/link";
import { useRouter } from "next/router";

import styles from "./styles.module.css";

const NavLink = ({ href, label, type }) => {
  const { pathname } = useRouter();
  const isActive = pathname === href;

  const className = `${type === "button" ? styles.btn : styles.link} ${
    isActive ? styles.active : ""
  }`;

  return (
    <Link href={href}>
      <a className={className}>{label}</a>
    </Link>
  );
};

export default NavLink;
