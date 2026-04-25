'use client';

import Link from 'next/link';
import styles from './navbar.module.css';
import Image from 'next/image';

export default function Navbar() {
    return (
        <header className={styles.header}>
            <nav className={styles.nav}>
                <div className={styles.container}>
                    <div className={styles.glass}>
                        <div className={styles.inner}>
                            <div className={styles.row}>
                                <Link
                                    className={styles.logo}
                                    href="/"
                                    tabIndex={0}
                                    role="link">
                                    <div className={styles.logoWrapper}>
                                        <Image
                                            src="https://ai-tutor.ai/icons/AI%20Tutor%20Logo.svg"
                                            width={30}
                                            height={32}
                                            alt="Logo"
                                            data-loaded="true"
                                        />
                                        <div className={styles.logoText}>
                                            AI Tutor
                                        </div>
                                    </div>
                                </Link>
                                <div className={styles.navLinks}>
                                    <Link
                                        className={styles.navLink}
                                        href="/"
                                        tabIndex={0}
                                        role="link">
                                        Home
                                    </Link>
                                    <button
                                        className={styles.navButton}
                                        type="button"
                                        data-slot="trigger"
                                        id="react-aria-:R2inpaja:"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                        AI Homework Assistants
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            viewBox="0 0 16 16"
                                            aria-hidden="true"
                                            focusable="false"
                                            tabIndex={-1}
                                            height="16"
                                            width="16"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fillRule="evenodd"
                                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"></path>
                                        </svg>
                                    </button>
                                    <button
                                        className={styles.navButton}
                                        type="button"
                                        data-slot="trigger"
                                        aria-haspopup="true"
                                        aria-expanded="false">
                                        B2B Solutions
                                        <svg
                                            stroke="currentColor"
                                            fill="currentColor"
                                            strokeWidth="0"
                                            viewBox="0 0 16 16"
                                            aria-hidden="true"
                                            focusable="false"
                                            tabIndex={-1}
                                            height="16"
                                            width="16"
                                            xmlns="http://www.w3.org/2000/svg">
                                            <path
                                                fillRule="evenodd"
                                                d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"></path>
                                        </svg>
                                    </button>
                                    <a
                                        className={styles.navLink}
                                        href="/pricing"
                                        tabIndex={0}
                                        role="link">
                                        Pricing
                                    </a>
                                    <a
                                        className={styles.navLink}
                                        href="/about-us"
                                        tabIndex={0}
                                        role="link">
                                        About
                                    </a>
                                </div>
                                <div className={styles.actions}>
                                    <div className="flex flex-col-reverse md:flex-row items-stretch md:items-center mt-10 md:mt-0 gap-3 md:gap-0.5 transition">
                                        <button
                                            className={styles.loginButton}
                                            type="button">
                                            Log In
                                        </button>
                                    </div>
                                </div>
                                <div className={styles.mobileMenu}>
                                    <div className="z-30">
                                        <button
                                            className={styles.hamburger}
                                            aria-label="Toggle navigation menu">
                                            <div
                                                className={
                                                    styles.hamburgerLine
                                                }></div>
                                            <div
                                                className={
                                                    styles.hamburgerLine
                                                }></div>
                                            <div
                                                className={
                                                    styles.hamburgerLine
                                                }></div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    );
}
