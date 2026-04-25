'use client';

import Link from 'next/link';
import styles from './hero.module.css';

export default function Hero() {
    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.heading}>
                    <span className="font-extralight">
                        Next Level AI Tutoring
                    </span>
                    <br />
                    <span className="font-light">For Lifelong Learners</span>
                </h1>
                <p className={styles.subtext}>
                    Create a custom learning pathway to help you achieve more in
                    school, work, and life.
                </p>
                <a
                    className={styles.primaryButton}
                    href="/dashboard"
                    role="button">
                    Start Learning with AI
                    <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 16 16"
                        className={styles.buttonIcon}
                        height="20"
                        width="20"
                        xmlns="http://www.w3.org/2000/svg">
                        <path
                            fillRule="evenodd"
                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path>
                    </svg>
                </a>
                <div className={styles.businessSection}>
                    <div className={styles.businessTitle}>
                        Also for Businesses and Institutions
                    </div>
                    <div className={styles.businessButtons}>
                        <a
                            className={styles.secondaryButton}
                            href="/whitelabel-ai-training"
                            role="button">
                            White-label
                        </a>
                        <a
                            className={styles.secondaryButton}
                            href="/ai-corporate-training"
                            role="button">
                            AI for Corporate Training
                        </a>
                        <a
                            className={styles.secondaryButton}
                            href="/ai-for-educators"
                            role="button">
                            AI for Educators
                        </a>
                    </div>
                </div>
                {/* <div className="flex flex-col sm:flex-row items-center gap-3 text-beta cursor-pointer hover:drop-shadow-md">
                    <img
                        alt="Play"
                        fetchpriority="high"
                        width="40"
                        height="40"
                        decoding="async"
                        data-nimg="1"
                        style="color: transparent"
                        src="/icons/play-blue.svg"
                    />
                    <span className="text-center text-sm sm:text-base underline font-inter font-medium">
                        AI Tutor explained in 165 seconds
                    </span>
                </div> */}
            </div>
        </section>
    );
}
