import styles from './footer.module.css';
import Image from 'next/image';
import image from '@/public/logo.png';
import Link from 'next/link';

export default function Footer() {
    return (
        <footer className={styles.fullWidth}>
            <div className={styles.footerWrapper}>
                <Image
                    alt=""
                    loading="lazy"
                    width="464"
                    height="572"
                    decoding="async"
                    data-nimg="1"
                    className={styles.footerLeft}
                    src="https://ai-tutor.ai/images/bg/footer-left.svg"
                />
                <Image
                    alt=""
                    loading="lazy"
                    width="401"
                    height="592"
                    decoding="async"
                    data-nimg="1"
                    className={styles.footerRight}
                    src="https://ai-tutor.ai/images/bg/footer-right.svg"
                />
                <div className={styles.footerContainer}>
                    <div className={styles.footerCard}>
                        <div className={styles.footerGrid}>
                            <div className={styles.footerCol}>
                                <Link
                                    className={styles.footerLogo}
                                    href="/"
                                    role="link">
                                    <Image
                                        alt="Logo"
                                        loading="lazy"
                                        width="30"
                                        height="32"
                                        decoding="async"
                                        data-nimg="1"
                                        // style="color: transparent"
                                        src={image}
                                    />
                                    <div className={styles.logoText}>
                                        AlGO VERSE
                                    </div>
                                </Link>
                                <p className={styles.textMuted}>
                                    Practice Data Structures & Algorithms with
                                    AI-powered assignments, quizzes, and real
                                    coding challenges.
                                </p>
                                <div className={styles.marginTop}>
                                    <div className={styles.footerTitle}>
                                        Contact
                                    </div>
                                    <div className={styles.flexCol}>
                                        <a
                                            className={styles.footerLink}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            role="link">
                                            <Image
                                                alt=""
                                                loading="lazy"
                                                width="20"
                                                height="20"
                                                decoding="async"
                                                data-nimg="1"
                                                // style="color: transparent"
                                                src="https://ai-tutor.ai/icons/mail.svg"
                                            />
                                            <span className={styles.emailText}>
                                                support@algoverse.com
                                            </span>
                                        </a>
                                        <a
                                            className={styles.footerLink}
                                            href="tel:+91 00000 00000"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            role="link">
                                            <Image
                                                alt=""
                                                loading="lazy"
                                                width="20"
                                                height="20"
                                                decoding="async"
                                                data-nimg="1"
                                                // style="color: transparent"
                                                src="https://ai-tutor.ai/icons/phone.svg"
                                            />
                                            +91 00000 00000
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.footerCol}>
                                <div className={styles.footerTitle}>
                                    Products
                                </div>
                                <Link
                                    className={styles.footerLink}
                                    href="/dashboard">
                                    DSA Sheet
                                </Link>
                                <Link
                                    className={styles.footerLink}
                                    href="/dashboard">
                                    Coding Assignments
                                </Link>
                                <Link
                                    className={styles.footerLink}
                                    href="/dashboard">
                                    DSA Quizzes
                                </Link>
                                <Link
                                    className={styles.footerLink}
                                    href="/dashboard">
                                    Track Progress
                                </Link>
                                <Link
                                    className={styles.footerLink}
                                    href="/dashboard">
                                    Interview Prep
                                </Link>
                                <Link
                                    className={styles.footerLink}
                                    href="/dashboard">
                                    DSA Roadmap
                                </Link>
                            </div>
                            <div className={styles.footerCol}>
                                <div className={styles.footerTitle}>Tools</div>
                                <Link
                                    className={styles.footerLink}
                                    href="/playground/1">
                                    Code Playground
                                </Link>
                                <Link
                                    className={styles.footerLink}
                                    href="/compiler/1">
                                    Online Compiler
                                </Link>
                                <Link
                                    className={styles.footerLink}
                                    href="/dashboard">
                                    Quiz Practice
                                </Link>
                            </div>
                            <div className={styles.footerCol}>
                                <div className={styles.footerTitle}>About</div>
                                <Link
                                    className={styles.footerLink}
                                    href="/about">
                                    About Us
                                </Link>
                                <Link
                                    className={styles.footerLink}
                                    href="/about#contact-us">
                                    Contact Us
                                </Link>
                                <Link
                                    className={styles.footerLink}
                                    href="/about#privacy-policy">
                                    Privacy Policy
                                </Link>
                                <Link
                                    className={styles.footerLink}
                                    href="/about#terms-conditions">
                                    Terms &amp; Conditions
                                </Link>
                            </div>
                        </div>
                        <div className={styles.footerBottom}>
                            <p>© DSA AI 2026 | Built for coders</p>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
