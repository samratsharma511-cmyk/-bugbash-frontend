import Link from 'next/link';
import styles from './faq.module.css';
import Image from 'next/image';

export default function Faq() {
    return (
        <main className={styles.main}>
            <div className={styles.container}>
                <section className={styles.section}>
                    <div className={styles.card}>
                        <div className={styles.stack}>
                            <h2 className={styles.heading}>
                                With AI Tutor, you learn at your own pace
                                <br />
                                using tutoring, quizzes, and summaries.
                                <br />
                                Start Using AI Tools <br />
                            </h2>
                            <div className={styles.flexCenter}>
                                <a
                                    className={styles.btnPrimary}
                                    href="/dashboard">
                                    View AI Tools
                                    <svg
                                        stroke="currentColor"
                                        fill="currentColor"
                                        strokeWidth="0"
                                        viewBox="0 0 16 16"
                                        className={styles.iconHover}
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
                    <div className={styles.fullWidth}>
                        <div className={styles.whiteBox}>
                            <div className={styles.grid2}>
                                <div className={styles.flexCenter}>
                                    <h2 className={styles.heading}>
                                        Interactive courses built to fit your
                                        goals
                                    </h2>
                                    <p className={styles.textMuted}>
                                        Create a custom learning pathway to help
                                        you achieve more in school, work, and
                                        life.
                                    </p>
                                    <div className={styles.flex}>
                                        <a
                                            className={styles.btnPrimary}
                                            href="/free-online-courses">
                                            View Other Courses
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth="0"
                                                viewBox="0 0 16 16"
                                                className={styles.iconHover}
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
                                <div className={styles.boxLight}>
                                    <div className={styles.flexCol}>
                                        <a
                                            className={styles.courseItemClean}
                                            href="/course/fundamentals-of-machine-learning-for-beginners">
                                            <Image
                                                alt="play"
                                                loading="lazy"
                                                width="20"
                                                height="20"
                                                decoding="async"
                                                data-nimg="1"
                                                className={styles.icon}
                                                // style="color: transparent"
                                                src="https://ai-tutor.ai/icons/play-blue-alpha.svg"
                                            />
                                            <div
                                                className={styles.flexColSmall}>
                                                <h3 className={styles.textMd}>
                                                    Fundamentals of Machine
                                                    Learning for Beginners
                                                </h3>
                                                <p className={styles.textSm}>
                                                    Beginner
                                                </p>
                                            </div>
                                        </a>
                                        <a
                                            className={styles.courseItemClean}
                                            href="/course/french-grammar-as-a-second-language-intermediate-level">
                                            <Image
                                                alt="play"
                                                loading="lazy"
                                                width="20"
                                                height="20"
                                                decoding="async"
                                                data-nimg="1"
                                                className={styles.icon}
                                                // style="color: transparent"
                                                src="https://ai-tutor.ai/icons/play-blue-alpha.svg"
                                            />
                                            <div
                                                className={styles.flexColSmall}>
                                                <h3 className={styles.textMd}>
                                                    Intermediate French Grammar
                                                </h3>
                                                <p className={styles.textSm}>
                                                    Beginner
                                                </p>
                                            </div>
                                        </a>
                                        <a
                                            className={styles.courseItemClean}
                                            href="/course/productivity-mastery-getting-things-done-in-the-digital-age">
                                            <Image
                                                alt="play"
                                                loading="lazy"
                                                width="20"
                                                height="20"
                                                decoding="async"
                                                data-nimg="1"
                                                className={styles.icon}
                                                // style="color: transparent"
                                                src="https://ai-tutor.ai/icons/play-blue-alpha.svg"
                                            />
                                            <div
                                                className={styles.flexColSmall}>
                                                <h3 className={styles.textMd}>
                                                    Productivity Mastery:
                                                    Getting Things Done in the
                                                    Digital Age
                                                </h3>
                                                <p className={styles.textSm}>
                                                    Beginner
                                                </p>
                                            </div>
                                        </a>
                                        <a
                                            className={styles.courseItemClean}
                                            href="/course/mindfulness-and-stress-management-for-professionals">
                                            <Image
                                                alt="play"
                                                loading="lazy"
                                                width="20"
                                                height="20"
                                                decoding="async"
                                                data-nimg="1"
                                                className={styles.icon}
                                                // style="color: transparent"
                                                src="https://ai-tutor.ai/icons/play-blue-alpha.svg"
                                            />
                                            <div
                                                className={styles.flexColSmall}>
                                                <h3 className={styles.textMd}>
                                                    Mindfulness and Stress
                                                    Management for Professionals
                                                </h3>
                                                <p className={styles.textSm}>
                                                    Beginner
                                                </p>
                                            </div>
                                        </a>
                                        <a
                                            className={styles.courseItemClean}
                                            href="/course/creative-writing-workshop-crafting-compelling-stories">
                                            <Image
                                                alt="play"
                                                loading="lazy"
                                                width="20"
                                                height="20"
                                                decoding="async"
                                                data-nimg="1"
                                                className={styles.icon}
                                                // style="color: transparent"
                                                src="https://ai-tutor.ai/icons/play-blue-alpha.svg"
                                            />
                                            <div
                                                className={styles.flexColSmall}>
                                                <h3 className={styles.textMd}>
                                                    Creative Writing Workshop:
                                                    Crafting Compelling Stories
                                                </h3>
                                                <p className={styles.textSm}>
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
                <section className={styles.fullWidth}>
                    <div className={styles.sectionPadding}>
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
                                        flashcards, and summaries to help you
                                        master new skills efficiently.
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
                                            Inspired learning, affordable
                                            pricing
                                        </h3>
                                        <p className={styles.textMuted}>
                                            Personal tutoring is not a luxury
                                            anymore. Start your journey for as
                                            little as the price of a cup of
                                            coffee.
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
                                            Sharpen your skills with
                                            personalized guidance, practice, and
                                            review. Our AI tutor adapts to your
                                            level and supports you as you grow.
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
                                            Fit learning into your work-life
                                            balance
                                        </h3>
                                        <p className={styles.textMuted}>
                                            Access TutorAI on your preferred
                                            device and turn spare moments into
                                            powerful learning opportunities.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section
                    style={{
                        display: 'block',
                        padding: '40px 16px',
                        maxWidth: '84rem',
                        margin: '0 auto',
                    }}
                    aria-labelledby="faq-heading"
                    id="faq-section">
                    <div className={styles.faqContainer}>
                        <h2 id="faq-heading" className={styles.heading}>
                            Frequently Asked Questions About AI Tutor
                        </h2>
                        <div
                            className={styles.flexCol}
                            data-orientation="vertical">
                            <div
                                data-open="true"
                                className={styles.faqItem}
                                aria-label="What is AI Tutor?">
                                <div data-open="true">
                                    <button
                                        data-open="true"
                                        className={styles.button}
                                        type="button"
                                        id=":R4d7jt7paja:"
                                        aria-expanded="true"
                                        aria-controls=":R4d7jt7pajaH1:">
                                        <div className={styles.flexCol}>
                                            <span className={styles.textMd}>
                                                <h3
                                                    className={
                                                        styles.faqQuestion
                                                    }>
                                                    What is AI Tutor?
                                                </h3>
                                                <p
                                                    className={
                                                        styles.faqAnswerText
                                                    }>
                                                    Our new platform proposes a
                                                    new way of learning with
                                                    personalized tutoring
                                                    empowered by AI, to help you
                                                    learn better, regardless if
                                                    you&#x27;re a student, a
                                                    creative selling your own
                                                    courses, or a professional
                                                    looking to upskill.
                                                </p>
                                            </span>
                                        </div>
                                        <span
                                            aria-hidden="true"
                                            className={styles.iconCircle}>
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth="0"
                                                viewBox="0 0 16 16"
                                                height="1em"
                                                width="1em"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                                <section
                                // style="
                                //     will-change: auto;
                                //     opacity: 1;
                                //     height: auto;
                                //     overflow-y: unset;
                                // "
                                >
                                    <div
                                        data-open="true"
                                        className={styles.faqAnswer}
                                        id=":R4d7jt7pajaH1:"
                                        role="region"
                                        aria-labelledby=":R4d7jt7paja:">
                                        <p>
                                            Our new platform proposes a new way
                                            of learning with personalized
                                            tutoring empowered by AI, to help
                                            you learn better, regardless if
                                            you&#x27;re a student, a creative
                                            selling your own courses, or a
                                            professional looking to upskill.
                                        </p>
                                    </div>
                                </section>
                            </div>
                            <div
                                data-open="true"
                                className={styles.faqItem}
                                aria-label="How does AI Tutor personalize the learning?">
                                <div data-open="true">
                                    <button
                                        data-open="true"
                                        className={styles.button}
                                        type="button"
                                        id=":R4l7jt7paja:"
                                        aria-expanded="true"
                                        aria-controls=":R4l7jt7pajaH1:">
                                        <div className={styles.flexCol}>
                                            <span className={styles.textMd}>
                                                <h3
                                                    className={
                                                        styles.faqQuestion
                                                    }>
                                                    How does AI Tutor
                                                    personalize the learning?
                                                </h3>
                                                <p
                                                    className={
                                                        styles.faqAnswerText
                                                    }>
                                                    Our AI system assesses your
                                                    learning style, strengths
                                                    and weaknesses to customize
                                                    lessons and practice
                                                    exercises.
                                                </p>
                                            </span>
                                        </div>
                                        <span
                                            aria-hidden="true"
                                            className={styles.iconCircle}>
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth="0"
                                                viewBox="0 0 16 16"
                                                height="1em"
                                                width="1em"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                                <section
                                // style="
                                //     will-change: auto;
                                //     opacity: 1;
                                //     height: auto;
                                //     overflow-y: unset;
                                // "
                                >
                                    <div
                                        data-open="true"
                                        className={styles.faqAnswer}
                                        id=":R4l7jt7pajaH1:"
                                        role="region"
                                        aria-labelledby=":R4l7jt7paja:">
                                        <p>
                                            Our AI system assesses your learning
                                            style, strengths and weaknesses to
                                            customize lessons and practice
                                            exercises.
                                        </p>
                                    </div>
                                </section>
                            </div>
                            <div
                                data-open="true"
                                className={styles.faqItem}
                                aria-label="Which subjects does AI Tutor cover?">
                                <div data-open="true">
                                    <button
                                        data-open="true"
                                        className={styles.button}
                                        type="button"
                                        id=":R4t7jt7paja:"
                                        aria-expanded="true"
                                        aria-controls=":R4t7jt7pajaH1:">
                                        <div className={styles.flexCol}>
                                            <span className={styles.textMd}>
                                                <h3
                                                    className={
                                                        styles.faqQuestion
                                                    }>
                                                    Which subjects does AI Tutor
                                                    cover?
                                                </h3>
                                                <p
                                                    className={
                                                        styles.faqAnswerText
                                                    }>
                                                    AI Tutor covers pretty much
                                                    any subject you can think
                                                    of, from Maths, to Science,
                                                    English, Physics, and more,
                                                    for all levels.
                                                </p>
                                            </span>
                                        </div>
                                        <span
                                            aria-hidden="true"
                                            className={styles.iconCircle}>
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth="0"
                                                viewBox="0 0 16 16"
                                                height="1em"
                                                width="1em"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                                <section
                                // style="
                                //     will-change: auto;
                                //     opacity: 1;
                                //     height: auto;
                                //     overflow-y: unset;
                                // "
                                >
                                    <div
                                        data-open="true"
                                        className={styles.faqAnswer}
                                        id=":R4t7jt7pajaH1:"
                                        role="region"
                                        aria-labelledby=":R4t7jt7paja:">
                                        <p>
                                            AI Tutor covers pretty much any
                                            subject you can think of, from
                                            Maths, to Science, English, Physics,
                                            and more, for all levels.
                                        </p>
                                    </div>
                                </section>
                            </div>
                            <div
                                data-open="true"
                                className={styles.faqItem}
                                aria-label="Is AI Tutor for all ages?">
                                <div data-open="true">
                                    <button
                                        data-open="true"
                                        className={styles.button}
                                        type="button"
                                        id=":R557jt7paja:"
                                        aria-expanded="true"
                                        aria-controls=":R557jt7pajaH1:">
                                        <div className={styles.flexCol}>
                                            <span className={styles.textMd}>
                                                <h3
                                                    className={
                                                        styles.faqQuestion
                                                    }>
                                                    Is AI Tutor for all ages?
                                                </h3>
                                                <p
                                                    className={
                                                        styles.faqAnswerText
                                                    }>
                                                    Yes, AI Tutor is for all
                                                    ages, from elementary school
                                                    to college and adult
                                                    learners.
                                                </p>
                                            </span>
                                        </div>
                                        <span
                                            aria-hidden="true"
                                            className={styles.iconCircle}>
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth="0"
                                                viewBox="0 0 16 16"
                                                height="1em"
                                                width="1em"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                                <section
                                // style="
                                //     will-change: auto;
                                //     opacity: 1;
                                //     height: auto;
                                //     overflow-y: unset;
                                // "
                                >
                                    <div
                                        data-open="true"
                                        className={styles.faqAnswer}
                                        id=":R557jt7pajaH1:"
                                        role="region"
                                        aria-labelledby=":R557jt7paja:">
                                        <p>
                                            Yes, AI Tutor is for all ages, from
                                            elementary school to college and
                                            adult learners.
                                        </p>
                                    </div>
                                </section>
                            </div>
                            <div
                                data-open="true"
                                className={styles.faqItem}
                                aria-label="How do I sign up for AI Tutor?">
                                <div data-open="true">
                                    <button
                                        data-open="true"
                                        className={styles.button}
                                        type="button"
                                        id=":R5d7jt7paja:"
                                        aria-expanded="true"
                                        aria-controls=":R5d7jt7pajaH1:">
                                        <div className={styles.flexCol}>
                                            <span className={styles.textMd}>
                                                <h3
                                                    className={
                                                        styles.faqQuestion
                                                    }>
                                                    How do I sign up for AI
                                                    Tutor?
                                                </h3>
                                                <p
                                                    className={
                                                        styles.faqAnswerText
                                                    }>
                                                    Click the
                                                    &quot;Generate&quot; button
                                                    at the top of this page and
                                                    follow the simple sign up
                                                    process.
                                                </p>
                                            </span>
                                        </div>
                                        <span
                                            aria-hidden="true"
                                            className={styles.iconCircle}>
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth="0"
                                                viewBox="0 0 16 16"
                                                height="1em"
                                                width="1em"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                                <section
                                // style="
                                //     will-change: auto;
                                //     opacity: 1;
                                //     height: auto;
                                //     overflow-y: unset;
                                // "
                                >
                                    <div
                                        data-open="true"
                                        className={styles.faqAnswer}
                                        id=":R5d7jt7pajaH1:"
                                        role="region"
                                        aria-labelledby=":R5d7jt7paja:">
                                        <p>
                                            Click the &quot;Generate&quot;
                                            button at the top of this page and
                                            follow the simple sign up process.
                                        </p>
                                    </div>
                                </section>
                            </div>
                            <div
                                data-open="true"
                                className={styles.faqItem}
                                aria-label="What are the subscription plans of AI Tutor?">
                                <div data-open="true">
                                    <button
                                        data-open="true"
                                        className={styles.button}
                                        type="button"
                                        id=":R5l7jt7paja:"
                                        aria-expanded="true"
                                        aria-controls=":R5l7jt7pajaH1:">
                                        <div className={styles.flexCol}>
                                            <span className={styles.textMd}>
                                                <h3
                                                    className={
                                                        styles.faqQuestion
                                                    }>
                                                    What are the subscription
                                                    plans of AI Tutor?
                                                </h3>
                                                <p
                                                    className={
                                                        styles.faqAnswerText
                                                    }>
                                                    We have monthly and annual
                                                    plans. Check out our Pricing
                                                    page
                                                    [https://ai-tutor.ai/pricing]
                                                    for details.
                                                </p>
                                            </span>
                                        </div>
                                        <span
                                            aria-hidden="true"
                                            className={styles.iconCircle}>
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth="0"
                                                viewBox="0 0 16 16"
                                                height="1em"
                                                width="1em"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                                <section
                                //         style="
                                //     will-change: auto;
                                //     opacity: 1;
                                //     height: auto;
                                //     overflow-y: unset;
                                // "
                                >
                                    <div
                                        data-open="true"
                                        className={styles.faqAnswer}
                                        id=":R5l7jt7pajaH1:"
                                        role="region"
                                        aria-labelledby=":R5l7jt7paja:">
                                        <p>
                                            We have monthly and annual plans.
                                            Check out our Pricing page
                                            [https://ai-tutor.ai/pricing] for
                                            details.
                                        </p>
                                    </div>
                                </section>
                            </div>
                            <div
                                data-open="true"
                                className={styles.faqItem}
                                aria-label="Can I cancel my AI Tutor subscription anytime?">
                                <div data-open="true">
                                    <button
                                        data-open="true"
                                        className={styles.button}
                                        type="button"
                                        id=":R5t7jt7paja:"
                                        aria-expanded="true"
                                        aria-controls=":R5t7jt7pajaH1:">
                                        <div className={styles.flexCol}>
                                            <span className={styles.textMd}>
                                                <h3
                                                    className={
                                                        styles.faqQuestion
                                                    }>
                                                    Can I cancel my AI Tutor
                                                    subscription anytime?
                                                </h3>
                                                <p
                                                    className={
                                                        styles.faqAnswerText
                                                    }>
                                                    Yes! You can cancel anytime
                                                    through your account
                                                    settings with no
                                                    cancellation fees.
                                                </p>
                                            </span>
                                        </div>
                                        <span
                                            aria-hidden="true"
                                            className={styles.iconCircle}>
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth="0"
                                                viewBox="0 0 16 16"
                                                height="1em"
                                                width="1em"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                                <section
                                // style="
                                //     will-change: auto;
                                //     opacity: 1;
                                //     height: auto;
                                //     overflow-y: unset;
                                // "
                                >
                                    <div
                                        data-open="true"
                                        className={styles.faqAnswer}
                                        id=":R5t7jt7pajaH1:"
                                        role="region"
                                        aria-labelledby=":R5t7jt7paja:">
                                        <p>
                                            Yes! You can cancel anytime through
                                            your account settings with no
                                            cancellation fees.
                                        </p>
                                    </div>
                                </section>
                            </div>
                            <div
                                data-open="true"
                                className={styles.faqItem}
                                aria-label="Do you offer plans for schools, universities, or other organizations?">
                                <div data-open="true">
                                    <button
                                        data-open="true"
                                        className={styles.button}
                                        type="button"
                                        id=":R657jt7paja:"
                                        aria-expanded="true"
                                        aria-controls=":R657jt7pajaH1:">
                                        <div className={styles.flexCol}>
                                            <span className={styles.textMd}>
                                                <h3
                                                    className={
                                                        styles.faqQuestion
                                                    }>
                                                    Do you offer plans for
                                                    schools, universities, or
                                                    other organizations?
                                                </h3>
                                                <p
                                                    className={
                                                        styles.faqAnswerText
                                                    }>
                                                    Yes. We provide custom plans
                                                    with dedicated support for
                                                    educational institutions and
                                                    businesses. Please contact
                                                    us to build a solution that
                                                    fits your needs.
                                                </p>
                                            </span>
                                        </div>
                                        <span
                                            aria-hidden="true"
                                            className={styles.iconCircle}>
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth="0"
                                                viewBox="0 0 16 16"
                                                height="1em"
                                                width="1em"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                                <section
                                // style="
                                //     will-change: auto;
                                //     opacity: 1;
                                //     height: auto;
                                //     overflow-y: unset;
                                // "
                                >
                                    <div
                                        data-open="true"
                                        className={styles.faqAnswer}
                                        id=":R657jt7pajaH1:"
                                        role="region"
                                        aria-labelledby=":R657jt7paja:">
                                        <p>
                                            Yes. We provide custom plans with
                                            dedicated support for educational
                                            institutions and businesses. Please
                                            contact us to build a solution that
                                            fits your needs.
                                        </p>
                                    </div>
                                </section>
                            </div>
                            <div
                                data-open="true"
                                className={styles.faqItem}
                                aria-label="What tools are included in AI Tutor?">
                                <div data-open="true">
                                    <button
                                        data-open="true"
                                        className={styles.button}
                                        type="button"
                                        id=":R6d7jt7paja:"
                                        aria-expanded="true"
                                        aria-controls=":R6d7jt7pajaH1:">
                                        <div className={styles.flexCol}>
                                            <span className={styles.textMd}>
                                                <h3
                                                    className={
                                                        styles.faqQuestion
                                                    }>
                                                    What tools are included in
                                                    AI Tutor?
                                                </h3>
                                                <p
                                                    className={
                                                        styles.faqAnswerText
                                                    }>
                                                    AI Tutor includes an AI
                                                    tutor chat, homework helper,
                                                    content summarizer, quiz and
                                                    flashcard generator, and a
                                                    course generator, all
                                                    designed to help you learn
                                                    faster and more effectively.
                                                </p>
                                            </span>
                                        </div>
                                        <span
                                            aria-hidden="true"
                                            className={styles.iconCircle}>
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                strokeWidth="0"
                                                viewBox="0 0 16 16"
                                                height="1em"
                                                width="1em"
                                                xmlns="http://www.w3.org/2000/svg">
                                                <path
                                                    fillRule="evenodd"
                                                    d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5"></path>
                                            </svg>
                                        </span>
                                    </button>
                                </div>
                                <section
                                // style="
                                //     will-change: auto;
                                //     opacity: 1;
                                //     height: auto;
                                //     overflow-y: unset;
                                // "
                                >
                                    <div
                                        data-open="true"
                                        className={styles.faqAnswer}
                                        id=":R6d7jt7pajaH1:"
                                        role="region"
                                        aria-labelledby=":R6d7jt7paja:">
                                        <p>
                                            AI Tutor includes an AI tutor chat,
                                            homework helper, content summarizer,
                                            quiz and flashcard generator, and a
                                            course generator, all designed to
                                            help you learn faster and more
                                            effectively.
                                        </p>
                                    </div>
                                </section>
                            </div>
                        </div>
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
            </div>
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
                                            src="https://ai-tutor.ai/icons/AI Tutor Logo.svg"
                                        />
                                        <div className={styles.logoText}>
                                            TutorAI
                                        </div>
                                    </Link>
                                    <p className={styles.textMuted}>
                                        Next level AI tutoring for life-long
                                        learners
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
                                                <span
                                                    className={styles.emailText}
                                                    data-cfemail="ec8489808083ac8d85c1989998839ec28d85">
                                                    [email&#160;protected]
                                                </span>
                                            </a>
                                            <a
                                                className={styles.footerLink}
                                                href="tel:+44 20 3576 2743"
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
                                                +44 20 3576 2743
                                            </a>
                                            <a
                                                className={styles.footerLink}
                                                href="https://maps.app.goo.gl/uDrZTtYafUQozgKA8"
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
                                                    className={styles.icon}
                                                    // style="color: transparent"
                                                    src="https://ai-tutor.ai/icons/pin.svg"
                                                />
                                                <p className={styles.textMuted}>
                                                    Lumination AI Ltd, 86-90
                                                    Paul Street London, UK
                                                </p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className={styles.footerCol}>
                                    <div className={styles.footerTitle}>
                                        Products
                                    </div>
                                    <a
                                        className={styles.footerLink}
                                        href="/api"
                                        role="link">
                                        B2B Tutor API
                                    </a>
                                    <a
                                        className={styles.footerLink}
                                        href="/homeworkify"
                                        role="link">
                                        Homeworkify
                                    </a>
                                    <a
                                        className={styles.footerLink}
                                        href="/free-online-courses"
                                        role="link">
                                        Free Online Courses
                                    </a>
                                    <a
                                        className={styles.footerLink}
                                        href="/whitelabel-ai-training"
                                        role="link">
                                        White Label AI Training
                                    </a>
                                    <a
                                        className={styles.footerLink}
                                        href="/ai-for-educators"
                                        role="link">
                                        AI For Educators
                                    </a>
                                    <a
                                        className={styles.footerLink}
                                        href="/ai-corporate-training"
                                        role="link">
                                        AI Corporate Training
                                    </a>
                                    <a
                                        className={styles.footerLink}
                                        href="/blog"
                                        role="link">
                                        Blogs
                                    </a>
                                </div>
                                <div className={styles.footerCol}>
                                    <div className={styles.footerTitle}>
                                        Tools
                                    </div>
                                    <a
                                        className={styles.footerLink}
                                        href="/ai-math-tutor"
                                        role="link">
                                        AI Math Solver
                                    </a>
                                    <a
                                        className={styles.footerLink}
                                        href="/ai-answer-solver"
                                        role="link">
                                        AI Answer Solver
                                    </a>
                                    <a
                                        className={styles.footerLink}
                                        href="/ai-chemistry-solver"
                                        role="link">
                                        AI Chemistry Solver
                                    </a>
                                    <a
                                        className={styles.footerLink}
                                        href="/ai-biology-solver"
                                        role="link">
                                        AI Biology Solver
                                    </a>
                                    <a
                                        className={styles.footerLink}
                                        href="/flashcards"
                                        role="link">
                                        Flashcards
                                    </a>
                                    <a
                                        className={styles.footerLink}
                                        href="/quiz-ai"
                                        role="link">
                                        Quiz AI
                                    </a>
                                </div>
                                <div className={styles.footerCol}>
                                    <div className={styles.footerTitle}>
                                        About
                                    </div>
                                    <a
                                        className={styles.footerLink}
                                        href="/pricing"
                                        role="link">
                                        Pricing
                                    </a>
                                    <a
                                        className={styles.footerLink}
                                        href="https://ai-tutor.affonso.io"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        role="link">
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
                                            className={styles.iconInline}>
                                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                            <path d="M15 3h6v6"></path>
                                            <path d="M10 14L21 3"></path>
                                        </svg>
                                    </a>
                                    <a
                                        className={styles.footerLink}
                                        href="/about-us"
                                        role="link">
                                        About Us
                                    </a>
                                    <a
                                        className={styles.footerLink}
                                        href="/contact-us"
                                        role="link">
                                        Contact Us
                                    </a>
                                    <a
                                        className={styles.footerLink}
                                        href="/privacy-policy"
                                        role="link">
                                        Privacy Policy
                                    </a>
                                    <a
                                        className={styles.footerLink}
                                        href="/terms-conditions"
                                        role="link">
                                        Terms &amp; Conditions
                                    </a>
                                </div>
                            </div>
                            <div className={styles.footerBottom}>
                                <p>© AI Tutor 2025 | All Rights Reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
