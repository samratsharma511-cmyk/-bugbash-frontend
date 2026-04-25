import Link from 'next/link';
import styles from './course.module.css';
import Image from 'next/image';

export default function Course() {
    return (
        <section className={styles.section}>
            <div className={styles.hero}>
                <Image
                    alt="trinagle"
                    loading="lazy"
                    width="80"
                    height="80"
                    decoding="async"
                    className={styles.triangleTop}
                    src="https://ai-tutor.ai/images/bg/learn-triangle.svg"
                />
                <Image
                    alt="trinagle"
                    loading="lazy"
                    width="80"
                    height="80"
                    decoding="async"
                    data-nimg="1"
                    className={styles.triangleBottom}
                    src="https://ai-tutor.ai/images/bg/learn-star.svg"
                />
                <div className={styles.heroContent}>
                    <h2 className={styles.heroTitle}>
                        With AI Tutor, you learn at your own pace
                        <br />
                        using tutoring, quizzes, and summaries. <br />
                        Start Using AI Tools <br />
                    </h2>
                    <div className={styles.centerFlex}>
                        <a className={styles.button} href="/dashboard">
                            View AI Tools
                            <svg
                                stroke="currentColor"
                                fill="currentColor"
                                strokeWidth="0"
                                viewBox="0 0 16 16"
                                className="group-hover:translate-x-1 transition"
                                height="20"
                                width="20"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    fillRule="evenodd"
                                    d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path>
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
            <div className="w-full mx-auto">
                <div className={styles.card}>
                    <div className={styles.grid}>
                        <div className={styles.leftContent}>
                            <h2 className={styles.sectionTitle}>
                                Interactive courses built to fit your goals
                            </h2>
                            <p className={styles.sectionText}>
                                Create a custom learning pathway to help you
                                achieve more in school, work, and life.
                            </p>
                            <div className="flex pt-3">
                                <a
                                    className={styles.button}
                                    href="/free-online-courses">
                                    View Other Courses
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 16 16"
                                        className="group-hover:translate-x-1 transition"
                                        height="20"
                                        width="20"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fillRule="evenodd"
                                            d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"></path>
                                    </svg>
                                </a>
                            </div>
                        </div>
                        <div className={styles.courseList}>
                            <div className="flex flex-col gap-3">
                                <a
                                    className={styles.courseItem}
                                    href="/course/fundamentals-of-machine-learning-for-beginners">
                                    <Image
                                        alt="play"
                                        loading="lazy"
                                        width="20"
                                        height="20"
                                        decoding="async"
                                        data-nimg="1"
                                        className={styles.icon}
                                        src="https://ai-tutor.ai/icons/play-blue-alpha.svg"
                                    />
                                    <div className={styles.courseText}>
                                        <h3 className={styles.courseTitle}>
                                            Fundamentals of Machine Learning for
                                            Beginners
                                        </h3>
                                        <p className={styles.courseLevel}>
                                            Beginner
                                        </p>
                                    </div>
                                </a>
                                <a
                                    className={styles.courseItem}
                                    href="/course/french-grammar-as-a-second-language-intermediate-level">
                                    <Image
                                        alt="play"
                                        loading="lazy"
                                        width="20"
                                        height="20"
                                        decoding="async"
                                        data-nimg="1"
                                        className={styles.icon}
                                        src="https://ai-tutor.ai/icons/play-blue-alpha.svg"
                                    />
                                    <div className={styles.courseText}>
                                        <h3 className={styles.courseTitle}>
                                            Intermediate French Grammar
                                        </h3>
                                        <p className={styles.courseLevel}>
                                            Beginner
                                        </p>
                                    </div>
                                </a>
                                <a
                                    className={styles.courseItem}
                                    href="/course/productivity-mastery-getting-things-done-in-the-digital-age">
                                    <Image
                                        alt="play"
                                        loading="lazy"
                                        width="20"
                                        height="20"
                                        decoding="async"
                                        data-nimg="1"
                                        className={styles.icon}
                                        src="https://ai-tutor.ai/icons/play-blue-alpha.svg"
                                    />
                                    <div className={styles.courseText}>
                                        <h3 className={styles.courseTitle}>
                                            Productivity Mastery: Getting Things
                                            Done in the Digital Age
                                        </h3>
                                        <p className={styles.courseLevel}>
                                            Beginner
                                        </p>
                                    </div>
                                </a>
                                <a
                                    className={styles.courseItem}
                                    href="/course/mindfulness-and-stress-management-for-professionals">
                                    <Image
                                        alt="play"
                                        loading="lazy"
                                        width="20"
                                        height="20"
                                        decoding="async"
                                        data-nimg="1"
                                        className={styles.icon}
                                        src="https://ai-tutor.ai/icons/play-blue-alpha.svg"
                                    />
                                    <div className={styles.courseText}>
                                        <h3 className={styles.courseTitle}>
                                            Mindfulness and Stress Management
                                            for Professionals
                                        </h3>
                                        <p className={styles.courseLevel}>
                                            Beginner
                                        </p>
                                    </div>
                                </a>
                                <a
                                    className={styles.courseItem}
                                    href="/course/creative-writing-workshop-crafting-compelling-stories">
                                    <Image
                                        alt="play"
                                        loading="lazy"
                                        width="20"
                                        height="20"
                                        decoding="async"
                                        data-nimg="1"
                                        className={styles.icon}
                                        src="https://ai-tutor.ai/icons/play-blue-alpha.svg"
                                    />
                                    <div className={styles.courseText}>
                                        <h3 className={styles.courseTitle}>
                                            Creative Writing Workshop: Crafting
                                            Compelling Stories
                                        </h3>
                                        <p className={styles.courseLevel}>
                                            Beginner
                                        </p>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
