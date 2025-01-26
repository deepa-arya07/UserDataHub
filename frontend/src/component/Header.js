import React from "react";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

const NavList = () => (
  <ul className={styles.navList}>
    <li>
      <Link to="/" className={styles.navLink}>
        Add User
      </Link>
    </li>
    <li>
      <Link to="/user-detail" className={styles.navLink}>
        User Details
      </Link>
    </li>
  </ul>
);

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>User Data Hub</div>
      <nav className={styles.nav}>
        <NavList />
      </nav>
    </header>
  );
};

export default Header;
