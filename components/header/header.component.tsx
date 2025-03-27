"use client";

import React from "react";
import styles from "./header.module.scss";
import Navbar from "../navbar/navbar.component";
import { Audiowide } from "next/font/google";
import ThemeToggle from "@/components/theme-toggle/theme-toggle.component";

const audiowide = Audiowide({
  weight: ["400"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
});

const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerContainer}>
        <div className={styles.headerTop}>
          <Navbar fontFamily={audiowide} />
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};

export default Header;
