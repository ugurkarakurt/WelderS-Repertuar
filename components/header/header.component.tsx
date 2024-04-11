import React from 'react';
import styles from "./header.module.scss";
import Navbar from '../navbar/navbar.component';
import { Audiowide } from 'next/font/google'

const audiowide = Audiowide({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <Navbar fontFamily={audiowide} />
      </div>
    </header>
  )
}

export default Header;