import React from "react";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <p className={styles.footerText}>
          &copy; {new Date().getFullYear()} User Data Hub. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
