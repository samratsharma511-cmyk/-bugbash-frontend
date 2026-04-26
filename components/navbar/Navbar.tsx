'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './navbar.module.css';
import Image from 'next/image';

const navItems = [
    { label: 'Home', href: '/' },
    { label: 'AI Homework Assistants', href: '#', hasDropdown: true },
    { label: 'B2B Solutions', href: '#', hasDropdown: true },
    { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about-us' },
];

export default function Navbar() {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (open) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [open]);

    const close = () => setOpen(false);

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
                                    onClick={close}>
                                    <div className={styles.logoWrapper}>
                                        <Image
                                            src="https://ai-tutor.ai/icons/AI%20Tutor%20Logo.svg"
                                            width={30}
                                            height={32}
                                            alt="Logo"
                                        />
                                        <div className={styles.logoText}>
                                            AI Tutor
                                        </div>
                                    </div>
                                </Link>

                                <div className={styles.navLinks}>
                                    {navItems.map((item) =>
                                        item.hasDropdown ? (
                                            <button
                                                key={item.label}
                                                className={styles.navButton}
                                                type="button">
                                                {item.label}
                                                <svg
                                                    viewBox="0 0 16 16"
                                                    height="14"
                                                    width="14"
                                                    fill="currentColor"
                                                    xmlns="http://www.w3.org/2000/svg">
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708"
                                                    />
                                                </svg>
                                            </button>
                                        ) : (
                                            <Link
                                                key={item.label}
                                                className={styles.navLink}
                                                href={item.href}>
                                                {item.label}
                                            </Link>
                                        ),
                                    )}
                                </div>

                                <div className={styles.actions}>
                                    <button
                                        className={styles.loginButton}
                                        type="button">
                                        Log In
                                    </button>
                                </div>

                                <button
                                    className={`${styles.hamburger} ${open ? styles.hamburgerOpen : ''}`}
                                    aria-label="Toggle navigation menu"
                                    aria-expanded={open}
                                    onClick={() => setOpen((v) => !v)}
                                    type="button">
                                    <span className={styles.hamburgerLine} />
                                    <span className={styles.hamburgerLine} />
                                    <span className={styles.hamburgerLine} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div
                className={`${styles.backdrop} ${open ? styles.backdropOpen : ''}`}
                onClick={close}
                aria-hidden="true"
            />

            <aside
                className={`${styles.drawer} ${open ? styles.drawerOpen : ''}`}
                aria-hidden={!open}>
                <div className={styles.drawerInner}>
                    {navItems.map((item) =>
                        item.hasDropdown ? (
                            <button
                                key={item.label}
                                className={styles.drawerLink}
                                type="button">
                                {item.label}
                            </button>
                        ) : (
                            <Link
                                key={item.label}
                                className={styles.drawerLink}
                                href={item.href}
                                onClick={close}>
                                {item.label}
                            </Link>
                        ),
                    )}
                    <button className={styles.drawerLogin} type="button">
                        Log In
                    </button>
                </div>
            </aside>
        </header>
    );
}
