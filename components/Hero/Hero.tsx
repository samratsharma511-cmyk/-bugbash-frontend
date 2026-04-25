'use client';

import Link from 'next/link';
import styles from './hero.module.css';

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.container}>
                {/* Heading */}
                <h1 className={styles.title}>
                    <span className={styles.light}>
                        Interactive Interview Sessions
                    </span>
                    <br />
                    <span className={styles.bold}>
                        Learn by Building in Real-Time
                    </span>
                </h1>

                {/* Subtext */}
                <p className={styles.subtitle}>
                    Create live sessions where mentors teach, give problems, and
                    let you code instantly inside an integrated playground.
                </p>

                {/* CTA */}
                <Link href="/create-session" className={styles.cta}>
                    Start a Session →
                </Link>

                {/* Secondary Actions */}
                <div className={styles.secondary}>
                    <span className={styles.secondaryTitle}>
                        Built for Developers & Learners
                    </span>

                    <div className={styles.badges}>
                        <span className={styles.badge}>Live Teaching</span>
                        <span className={styles.badge}>Code Playground</span>
                        <span className={styles.badge}>
                            Real Interview Flow
                        </span>
                    </div>
                </div>

                {/* Demo */}
                <div className={styles.demo}>
                    <div className={styles.play}></div>
                    <span>See how a live session works</span>
                </div>
            </div>
        </section>
    );
}
