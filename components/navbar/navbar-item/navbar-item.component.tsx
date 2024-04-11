import Link from 'next/link';
import React from 'react';
import styles from "./navbar-item.module.scss";

const NavbarItem: React.FC<{ content: string; route: string }> = ({ content, route }) => {
  return (
    <Link className={styles.navbarItem} href={route}>{content}</Link>
  );
};

export default NavbarItem;
