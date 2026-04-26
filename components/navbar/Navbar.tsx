'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import styles from './navbar.module.css';
import Image from 'next/image';

const navItems = [
    { label: 'Home', href: '/' },
    // { label: 'Pricing', href: '/pricing' },
    { label: 'About', href: '/about' },
    { label: 'Reviews', href: '/#reviews' },
    { label: 'FAQ', href: '/#Faq' },
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
                                    {navItems.map((item) => (
                                        <Link
                                            key={item.label}
                                            className={styles.navLink}
                                            href={item.href}>
                                            {item.label}
                                        </Link>
                                    ))}
                                </div>

                                <div className={styles.actions}>
                                    <Link
                                        href="/login"
                                        className={styles.loginButton}>
                                        Log In
                                    </Link>
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
                    {navItems.map((item) => (
                        <Link
                            key={item.label}
                            className={styles.drawerLink}
                            href={item.href}
                            onClick={close}>
                            {item.label}
                        </Link>
                    ))}
                    <Link
                        href="/login"
                        className={styles.drawerLogin}
                        onClick={close}>
                        Log In
                    </Link>
                </div>
            </aside>
        </header>
    );
}
