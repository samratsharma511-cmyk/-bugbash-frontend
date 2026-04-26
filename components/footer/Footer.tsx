import styles from "./footer.module.css";
import Image from "next/image";
import Link from "next/link";

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
                                    role="link"
                                >
                                    <Image
                                        alt="Logo"
                                        loading="lazy"
                                        width="30"
                                        height="32"
                                        decoding="async"
                                        data-nimg="1"
                                        // style="color: transparent"
                                        src="https://ai-tutor.ai/icons/AI Tutor Logo.svg"
                                    />
                                    <div className={styles.logoText}>
                                        DSA AI
                                    </div>
                                </Link>
                                <p className={styles.textMuted}>
                                    Practice Data Structures & Algorithms with AI-powered assignments, quizzes, and real coding challenges.
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
                                            role="link"
                                        >
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
                                            <span
                                                className={styles.emailText}
                                            >
                                                support@dsa-ai.com
                                            </span>
                                        </a>
                                        <a
                                            className={styles.footerLink}
                                            href="tel:+44 20 3576 2743"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            role="link"
                                        >
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
                                            +44 20 3576 2743
                                        </a>
                                        <a
                                            className={styles.footerLink}
                                            href="https://maps.app.goo.gl/uDrZTtYafUQozgKA8"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            role="link"
                                        >
                                            <Image
                                                alt=""
                                                loading="lazy"
                                                width="20"
                                                height="20"
                                                decoding="async"
                                                data-nimg="1"
                                                className={styles.icon}
                                                // style="color: transparent"
                                                src="https://ai-tutor.ai/icons/pin.svg"
                                            />
                                            <p className={styles.textMuted}>
                                                Lumination AI Ltd, 86-90 Paul
                                                Street London, UK
                                            </p>
                                        </a>
                                    </div>
                                </div>
                            </div>
                            <div className={styles.footerCol}>
                                <div className={styles.footerTitle}>
                                    Products
                                </div>
                                <Link className={styles.footerLink} href="/dsa">
                                    DSA Sheet
                                </Link>
                                <Link className={styles.footerLink} href="/assignments">
                                    Coding Assignments
                                </Link>
                                <Link className={styles.footerLink} href="/quizzes">
                                    DSA Quizzes
                                </Link>
                                <Link className={styles.footerLink} href="/progress">
                                    Track Progress
                                </Link>
                                <Link className={styles.footerLink} href="/interview-prep">
                                    Interview Prep
                                </Link>
                                <Link className={styles.footerLink} href="/roadmap">
                                    DSA Roadmap
                                </Link>
                                <a
                                    className={styles.footerLink}
                                    href="/blog"
                                    role="link"
                                >
                                    Blogs
                                </a>
                            </div>
                            <div className={styles.footerCol}>
                                <div className={styles.footerTitle}>Tools</div>
                                <Link className={styles.footerLink} href="/playground">
                                    Code Playground
                                </Link>
                                <Link className={styles.footerLink} href="/visualizer">
                                    Algorithm Visualizer
                                </Link>
                                <Link className={styles.footerLink} href="/compiler">
                                    Online Compiler
                                </Link>
                                <Link className={styles.footerLink} href="/flashcards">
                                    Flashcards
                                </Link>
                                <Link className={styles.footerLink} href="/quiz">
                                    Quiz Practice
                                </Link>
                            </div>
                            <div className={styles.footerCol}>
                                <div className={styles.footerTitle}>About</div>
                                <a
                                    className={styles.footerLink}
                                    href="/pricing"
                                    role="link"
                                >
                                    Plans & Pricing
                                </a>
                                <a
                                    className={styles.footerLink}
                                    href="https://ai-tutor.affonso.io"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    role="link"
                                >
                                    Affiliate Program
                                    <svg
                                        aria-hidden="true"
                                        fill="none"
                                        focusable="false"
                                        height="1em"
                                        shapeRendering="geometricPrecision"
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="1.5"
                                        viewBox="0 0 24 24"
                                        width="1em"
                                        className={styles.iconInline}
                                    >
                                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                        <path d="M15 3h6v6"></path>
                                        <path d="M10 14L21 3"></path>
                                    </svg>
                                </a>
                                <a
                                    className={styles.footerLink}
                                    href="/about-us"
                                    role="link"
                                >
                                    About Us
                                </a>
                                <a
                                    className={styles.footerLink}
                                    href="/contact-us"
                                    role="link"
                                >
                                    Contact Us
                                </a>
                                <a
                                    className={styles.footerLink}
                                    href="/privacy-policy"
                                    role="link"
                                >
                                    Privacy Policy
                                </a>
                                <a
                                    className={styles.footerLink}
                                    href="/terms-conditions"
                                    role="link"
                                >
                                    Terms &amp; Conditions
                                </a>
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
