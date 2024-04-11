"use client"
import React from 'react'
import NavbarItem from './navbar-item/navbar-item.component';
import styles from "./navbar.module.scss";
import { usePathname } from 'next/navigation';
import Link from 'next/link';

interface LogoProps {
  fontFamily: {
    className: string;
  };
}

const Navbar: React.FC<LogoProps> = ({ fontFamily }) => {
  const pathname = usePathname();

  return (
    <nav className={styles.navbarContainer}>
      <Link href={"/"}>
        <h1 className={fontFamily.className}>WelderS Repertuar</h1>
      </Link>
      {/* <ul className={fontFamily.className}>
        <li className={`${pathname === '/costs' && styles.active}`}>
          <NavbarItem route="/costs" content="Maliyetler" />
        </li>
        <li className={`${pathname === '/mockups' && styles.active}`}>
          <NavbarItem route="/mockups" content="Mockups" />
        </li>
      </ul> */}
    </nav >
  )
}


export default Navbar;