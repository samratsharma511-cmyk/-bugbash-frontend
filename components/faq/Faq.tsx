import Link from 'next/link';
import styles from './faq.module.css';
import Image from 'next/image';
import FaqAccordion from './FaqAccordion';

export default function Faq() {
    return (
        <>
            <section className={styles.fullWidth}>
                <div className={styles.bannerContainer}>
                    <h2 className={styles.heading}>
                        Learn what interests you <br />
                        in as little as 10 minutes a day
                    </h2>
                    <div className={styles.colorBox1}>
                        <div className={styles.grid2}>
                            <div className={styles.flexCenter}>
                                <Image
                                    alt="start"
                                    loading="lazy"
                                    width="256"
                                    height="256"
                                    decoding="async"
                                    data-nimg="1"
                                    className={styles.largeIcon}
                                    src="https://ai-tutor.ai/images/bg/interest-star.svg"
                                />
                            </div>
                            <div className={styles.flexCol}>
                                <h3 className={styles.heading}>
                                    Effective, bite-sized learning
                                </h3>
                                <p className={styles.textMuted}>
                                    Our AI tutor offers lessons, quizzes,
                                    flashcards, and summaries to help you master
                                    new skills efficiently.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.whiteBox}>
                        <div className={styles.colorBox2}>
                            <div className={styles.grid2}>
                                <div>
                                    <Image
                                        alt="start"
                                        loading="lazy"
                                        width="256"
                                        height="256"
                                        decoding="async"
                                        data-nimg="1"
                                        className={styles.largeIcon}
                                        src="https://ai-tutor.ai/images/bg/interest-triangle.svg"
                                    />
                                </div>
                                <div className={styles.flexCol}>
                                    <h3 className={styles.heading}>
                                        Inspired learning, affordable pricing
                                    </h3>
                                    <p className={styles.textMuted}>
                                        Personal tutoring is not a luxury
                                        anymore. Start your journey for as
                                        little as the price of a cup of coffee.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.whiteBox}>
                        <div className={styles.colorBox3}>
                            <div className={styles.grid2}>
                                <div>
                                    <Image
                                        alt="start"
                                        loading="lazy"
                                        width="256"
                                        height="256"
                                        decoding="async"
                                        data-nimg="1"
                                        className={styles.largeIcon}
                                        src="https://ai-tutor.ai/images/bg/interest-pentagon.svg"
                                    />
                                </div>
                                <div className={styles.flexCol}>
                                    <h3 className={styles.heading}>
                                        Real-life skill assessments
                                    </h3>
                                    <p className={styles.textMuted}>
                                        Sharpen your skills with personalized
                                        guidance, practice, and review. Our AI
                                        tutor adapts to your level and supports
                                        you as you grow.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.whiteBox}>
                        <div className={styles.colorBox4}>
                            <div className={styles.grid2}>
                                <div>
                                    <Image
                                        alt="start"
                                        loading="lazy"
                                        width="256"
                                        height="256"
                                        decoding="async"
                                        data-nimg="1"
                                        className={styles.largeIcon}
                                        src="https://ai-tutor.ai/images/bg/interest-square.svg"
                                    />
                                </div>
                                <div className={styles.flexCol}>
                                    <h3 className={styles.heading}>
                                        Fit learning into your work-life balance
                                    </h3>
                                    <p className={styles.textMuted}>
                                        Access TutorAI on your preferred device
                                        and turn spare moments into powerful
                                        learning opportunities.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section
                className={styles.faqSection}
                aria-labelledby="faq-heading"
                id="faq-section">
                <div className={styles.faqContainer}>
                    <h2 id="faq-heading" className={styles.heading}>
                        Frequently Asked Questions About AI Tutor
                    </h2>
                    <FaqAccordion />
                </div>
            </section>
            <section className={styles.fullWidth}>
                <div className={styles.ctaBox}>
                    <Image
                        alt="trinagle"
                        loading="lazy"
                        width="80"
                        height="80"
                        decoding="async"
                        data-nimg="1"
                        className={styles.bgShapeTop}
                        src="https://ai-tutor.ai/images/bg/learn-triangle.svg"
                    />
                    <Image
                        alt="trinagle"
                        loading="lazy"
                        width="80"
                        height="80"
                        decoding="async"
                        data-nimg="1"
                        className={styles.bgShapeBottom}
                        src="https://ai-tutor.ai/images/bg/learn-star.svg"
                    />
                    <div className={styles.flexColCenter}>
                        <h2 className={styles.heading}>
                            Effective lessons, big results. <br />
                            Start learning with AI Tutor today!
                        </h2>
                        <div className={styles.ctaWrapper}>
                            <a
                                className={styles.ctaButton}
                                href="/dashboard"
                                role="button">
                                Get started
                            </a>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
