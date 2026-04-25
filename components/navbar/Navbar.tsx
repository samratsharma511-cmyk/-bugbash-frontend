"use client";

import Link from "next/link";
import styles from "./navbar.module.css";

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <div className={styles.logoIcon}></div>
          <span className={styles.logoText}>App</span>
        </Link>

        {/* Center Links */}
        <div className={styles.links}>
          <Link href="/" className={styles.link}>
            Home
          </Link>
          <Link href="/sessions" className={styles.link}>
            Sessions
          </Link>
          <Link href="/playground" className={styles.link}>
            Playground
          </Link>
          <Link href="/about" className={styles.link}>
            About
          </Link>
        </div>

        {/* Right Side */}
        <div className={styles.actions}>
          <Link href="/create-session" className={styles.primaryBtn}>
            Create Session
          </Link>
        </div>

        {/* Mobile Menu Icon */}
        <div className={styles.mobileMenu}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
    </nav>
  );
}