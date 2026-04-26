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
                        Master Data Structures & Algorithms <br />
                        with coding assignments and quizzes
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
                                    Structured DSA learning paths
                                </h3>
                                <p className={styles.textMuted}>
                                    Practice DSA through guided coding
                                    assignments, quizzes, and real
                                    problem-solving challenges designed to build
                                    strong fundamentals.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className={styles.whiteBox}>
                        <div className={styles.colorBox2}>
                            <div className={styles.grid2}>
                                <div className={styles.flexCol}>
                                    <h3 className={styles.heading}>
                                        Consistent practice, real improvement
                                    </h3>
                                    <p className={styles.textMuted}>
                                        Solve problems daily, track your
                                        progress, and improve your
                                        problem-solving skills step by step with
                                        structured assignments.
                                    </p>
                                </div>
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
                                        Real coding skill evaluation
                                    </h3>
                                    <p className={styles.textMuted}>
                                        Get evaluated based on real coding
                                        performance, receive feedback, and level
                                        up your DSA skills with adaptive
                                        difficulty.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={styles.whiteBox}>
                        <div className={styles.colorBox4}>
                            <div className={styles.grid2}>
                                <div className={styles.flexCol}>
                                    <h3 className={styles.heading}>
                                        Daily DSA practice made simple
                                    </h3>
                                    <p className={styles.textMuted}>
                                        Practice anytime, anywhere with short
                                        coding assignments and quizzes that fit
                                        into your daily routine.
                                    </p>
                                </div>
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
                        Frequently Asked Questions About DSA Practice
                    </h2>
                    <FaqAccordion />
                </div>
            </section>
            <section className={styles.semiFullWidth}>
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
                            Solve daily DSA challenges. <br />
                            Start your coding journey today!
                        </h2>
                        <div className={styles.ctaWrapper}>
                            <Link
                                className={styles.ctaButton}
                                href="/dashboard">
                                Get started
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
