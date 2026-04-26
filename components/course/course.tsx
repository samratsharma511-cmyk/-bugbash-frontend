import Link from 'next/link';
import styles from './course.module.css';
import Image from 'next/image';

const assignments = [
    {
        title: 'Arrays Basics',
        level: 'Easy',
        href: '/dashboard',
    },
    {
        title: 'Binary Search',
        level: 'Medium',
        href: '/dashboard',
    },
    {
        title: 'Linked List Fundamentals',
        level: 'Medium',
        href: '/dashboard',
    },
    {
        title: 'Stacks & Queues',
        level: 'Medium',
        href: '/dashboard',
    },
    {
        title: 'Dynamic Programming Intro',
        level: 'Hard',
        href: '/dashboard',
    },
];

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
                        Master DSA with structured assignments
                        <br />
                        practice problems, track progress, and improve daily.{' '}
                        <br />
                        Start Solving Now <br />
                    </h2>
                    <div className={styles.centerFlex}>
                        <Link className={styles.button} href="/dashboard">
                            View AI Tools
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
                        </Link>
                    </div>
                </div>
            </div>
            <div className={styles.fullWidth}>
                <div className={styles.card}>
                    <div className={styles.grid}>
                        <div className={styles.leftContent}>
                            <h2 className={styles.sectionTitle}>
                                DSA Assignments tailored for your growth
                            </h2>
                            <p className={styles.sectionText}>
                                Solve curated DSA problems from beginner to
                                advanced and build strong problem-solving
                                skills.
                            </p>
                            <div className={styles.buttonRow}>
                                <Link
                                    className={styles.button}
                                    href="/dashboard">
                                    View Other Courses
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
                                </Link>
                            </div>
                        </div>
                        <div className={styles.courseList}>
                            <div className={styles.courseItems}>
                                {assignments.map((item, index) => (
                                    <Link
                                        key={index}
                                        className={styles.courseItem}
                                        href={item.href}>
                                        <Image
                                            alt="play"
                                            loading="lazy"
                                            width="20"
                                            height="20"
                                            decoding="async"
                                            className={styles.icon}
                                            src="https://ai-tutor.ai/icons/play-blue-alpha.svg"
                                        />
                                        <div className={styles.courseText}>
                                            <h3 className={styles.courseTitle}>
                                                {item.title}
                                            </h3>
                                            <p className={styles.courseLevel}>
                                                {item.level}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
