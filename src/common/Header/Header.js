import { useEffect, useState } from "react";

import Link from "next/link";

import { GiHamburgerMenu } from "react-icons/gi";
import { CgClose } from "react-icons/cg";

import useMediaQuery from "../../utils/useMediaQuery";

import styles from "./styles.module.css";
import Navbar from "../Navbar/Navbar";

const Header = () => {
  const [navActive, setNavActive] = useState(true);

  const mediaMatches = useMediaQuery("(max-width: 770px)");

  useEffect(() => {
    setNavActive(!mediaMatches);
  }, [mediaMatches]);

  const toggleNav = () => setNavActive((prev) => !prev);

  return (
    <header className={styles.header}>
      <div>
        <Link href="/" className={styles.brandLink}>
          <h1 className={styles.brand}>
            <span>The</span> Blog
          </h1>
        </Link>

        {mediaMatches ? (
          <button
            type="button"
            onClick={toggleNav}
            className={styles.hamburger}
          >
            {navActive ? <CgClose /> : <GiHamburgerMenu />}
          </button>
        ) : null}
      </div>

      <Navbar
        navActive={navActive}
        toggleNav={mediaMatches ? toggleNav : null}
      />
    </header>
  );
};

export default Header;
