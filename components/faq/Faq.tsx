import Link from 'next/link';
import styles from './faq.module.css';
import Image from 'next/image';

export default function Faq() {
    return (
        <main className={styles.main}>
            <main className={styles.container}>
                <section className={styles.section}>
                    <div className={styles.card}>
                        <Image
                            alt="trinagle"
                            loading="lazy"
                            width="80"
                            height="80"
                            decoding="async"
                            data-nimg="1"
                            className="z-0 absolute top-5 sm:top-8 left-5 sm:left-8 w-[calc(10%+2dvw)] h-auto"
                            // style="color: transparent"
                            src="https://ai-tutor.ai/images/bg/learn-triangle.svg"
                        />
                        <Image
                            alt="trinagle"
                            loading="lazy"
                            width="80"
                            height="80"
                            decoding="async"
                            data-nimg="1"
                            className="z-0 absolute bottom-5 sm:bottop-8 right-5 sm:right-8 w-[calc(10%+2dvw)] h-auto"
                            // style="color: transparent"
                            src="https://ai-tutor.ai/images/bg/learn-star.svg"
                        />
                        <div className="space-y-6 z-10">
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
                                        stroke-width="0"
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
                        <div className="bg-white shadow px-4 md:px-12 py-8 rounded-2xl">
                            <div className={styles.grid2}>
                                <div className={styles.flexCenter}>
                                    <h2 className="text-2xl sm:text-3xl text-center md:text-start">
                                        Interactive courses built to fit your
                                        goals
                                    </h2>
                                    <p className="opacity-80 text-center md:text-start">
                                        Create a custom learning pathway to help
                                        you achieve more in school, work, and
                                        life.
                                    </p>
                                    <div className="flex pt-3">
                                        <a
                                            className={styles.btnPrimary}
                                            href="/free-online-courses">
                                            View Other Courses
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                stroke-width="0"
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
                                <div className="bg-beta-100 px-4 sm:px-6 py-4 sm:py-6 rounded-2xl">
                                    <div className="flex flex-col gap-3">
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
                                                className="size-10"
                                                // style="color: transparent"
                                                src="https://ai-tutor.ai/icons/play-blue-alpha.svg"
                                            />
                                            <div className="flex flex-col gap-0.5">
                                                <h3 className="text-base sm:text-lg">
                                                    Fundamentals of Machine
                                                    Learning for Beginners
                                                </h3>
                                                <p className="text-sm text-beta group-hover:text-white transition">
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
                                                className="size-10"
                                                // style="color: transparent"
                                                src="https://ai-tutor.ai/icons/play-blue-alpha.svg"
                                            />
                                            <div className="flex flex-col gap-0.5">
                                                <h3 className="text-base sm:text-lg">
                                                    Intermediate French Grammar
                                                </h3>
                                                <p className="text-sm text-beta group-hover:text-white transition">
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
                                                className="size-10"
                                                // style="color: transparent"
                                                src="https://ai-tutor.ai/icons/play-blue-alpha.svg"
                                            />
                                            <div className="flex flex-col gap-0.5">
                                                <h3 className="text-base sm:text-lg">
                                                    Productivity Mastery:
                                                    Getting Things Done in the
                                                    Digital Age
                                                </h3>
                                                <p className="text-sm text-beta group-hover:text-white transition">
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
                                                className="size-10"
                                                // style="color: transparent"
                                                src="https://ai-tutor.ai/icons/play-blue-alpha.svg"
                                            />
                                            <div className="flex flex-col gap-0.5">
                                                <h3 className="text-base sm:text-lg">
                                                    Mindfulness and Stress
                                                    Management for Professionals
                                                </h3>
                                                <p className="text-sm text-beta group-hover:text-white transition">
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
                                                className="size-10"
                                                // style="color: transparent"
                                                src="https://ai-tutor.ai/icons/play-blue-alpha.svg"
                                            />
                                            <div className="flex flex-col gap-0.5">
                                                <h3 className="text-base sm:text-lg">
                                                    Creative Writing Workshop:
                                                    Crafting Compelling Stories
                                                </h3>
                                                <p className="text-sm text-beta group-hover:text-white transition">
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
                <section className="w-full max-w-[84rem] mx-auto px-4 sm:px-5">
                    <div className="w-full mx-auto py-8">
                        <h2 className="text-center text-3xl sm:text-4xl mb-8">
                            Learn what interests you <br />
                            in as little as 10 minutes a day
                        </h2>
                        <div className="bg-[#91D8EC] rounded-2xl px-10 sm:px-16 pt-6 pb-12 sm:py-10">
                            <div className="grid sm:grid-cols-2 items-center gap-6 sm:gap-24 md:gap-48">
                                <div className="flex items-center justify-center">
                                    <Image
                                        alt="start"
                                        loading="lazy"
                                        width="256"
                                        height="256"
                                        decoding="async"
                                        data-nimg="1"
                                        className="size-64"
                                        // style="color: transparent"
                                        src="https://ai-tutor.ai/images/bg/interest-star.svg"
                                    />
                                </div>
                                <div className="max-w-xs flex flex-col items-center mx-auto gap-3">
                                    <h3 className="text-3xl text-center sm:text-start">
                                        Effective, bite-sized learning
                                    </h3>
                                    <p className="text-sm text-center sm:text-start">
                                        Our AI tutor offers lessons, quizzes,
                                        flashcards, and summaries to help you
                                        master new skills efficiently.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white pt-2 rounded-2xl overflow-hidden -mt-6">
                            <div className="bg-[#FFBAC4] px-10 sm:px-16 pt-6 pb-12 sm:py-10 rounded-xl">
                                <div className="grid sm:grid-cols-2 items-center gap-6 sm:gap-24 md:gap-48">
                                    <div className="order-1 sm:order-2 flex items-center justify-center">
                                        <Image
                                            alt="start"
                                            loading="lazy"
                                            width="256"
                                            height="256"
                                            decoding="async"
                                            data-nimg="1"
                                            className="size-64"
                                            // style="color: transparent"
                                            src="https://ai-tutor.ai/images/bg/interest-triangle.svg"
                                        />
                                    </div>
                                    <div className="order-2 sm:order-1 max-w-xs flex flex-col items-center mx-auto gap-3">
                                        <h3 className="text-3xl text-center sm:text-start">
                                            Inspired learning, affordable
                                            pricing
                                        </h3>
                                        <p className="text-sm text-center sm:text-start">
                                            Personal tutoring is not a luxury
                                            anymore. Start your journey for as
                                            little as the price of a cup of
                                            coffee.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white pt-2 rounded-2xl overflow-hidden -mt-6">
                            <div className="bg-[#F6893C] px-10 sm:px-16 pt-6 pb-12 sm:py-10 rounded-xl">
                                <div className="grid sm:grid-cols-2 items-center gap-6 sm:gap-24 md:gap-48">
                                    <div className="order-1 flex items-center justify-center">
                                        <Image
                                            alt="start"
                                            loading="lazy"
                                            width="256"
                                            height="256"
                                            decoding="async"
                                            data-nimg="1"
                                            className="size-64"
                                            // style="color: transparent"
                                            src="https://ai-tutor.ai/images/bg/interest-pentagon.svg"
                                        />
                                    </div>
                                    <div className="order-2 max-w-xs flex flex-col items-center mx-auto gap-3">
                                        <h3 className="text-3xl text-center sm:text-start">
                                            Real-life skill assessments
                                        </h3>
                                        <p className="text-sm text-center sm:text-start">
                                            Sharpen your skills with
                                            personalized guidance, practice, and
                                            review. Our AI tutor adapts to your
                                            level and supports you as you grow.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="bg-white pt-2 rounded-2xl overflow-hidden -mt-6">
                            <div className="bg-[#FFDA00] px-10 sm:px-16 pt-6 pb-12 sm:py-10 rounded-xl">
                                <div className="grid sm:grid-cols-2 items-center gap-6 sm:gap-24 md:gap-48">
                                    <div className="order-1 sm:order-2 flex items-center justify-center">
                                        <Image
                                            alt="start"
                                            loading="lazy"
                                            width="256"
                                            height="256"
                                            decoding="async"
                                            data-nimg="1"
                                            className="size-64"
                                            // style="color: transparent"
                                            src="https://ai-tutor.ai/images/bg/interest-square.svg"
                                        />
                                    </div>
                                    <div className="order-2 sm:order-1 max-w-xs flex flex-col items-center mx-auto gap-3">
                                        <h3 className="text-3xl text-center sm:text-start">
                                            Fit learning into your work-life
                                            balance
                                        </h3>
                                        <p className="text-sm text-center sm:text-start">
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
                    className="w-full max-w-[84rem] mx-auto px-4 sm:px-5 mt-10"
                    aria-labelledby="faq-heading"
                    id="faq-section">
                    <div className="w-full mx-auto rounded-2xl bg-beta text-white px-4 sm:px-8 py-8">
                        <h2
                            id="faq-heading"
                            className="text-center text-3xl mb-5">
                            Frequently Asked Questions About AI Tutor
                        </h2>
                        <div
                            className="px-2 flex flex-col gap-2 w-full"
                            data-orientation="vertical">
                            <div
                                data-open="true"
                                className="rounded-medium px-0 mb-2.5 bg-transparent shadow-none"
                                aria-label="What is AI Tutor?">
                                <div data-open="true">
                                    <button
                                        data-open="true"
                                        className={styles.button}
                                        type="button"
                                        id=":R4d7jt7paja:"
                                        aria-expanded="true"
                                        aria-controls=":R4d7jt7pajaH1:">
                                        <div className="flex-1 flex flex-col text-start">
                                            <span
                                                data-open="true"
                                                className="text-base text-white data-[open=true]:text-black sm:text-lg transition-all font-normal">
                                                <h3 className="faq-question">
                                                    What is AI Tutor?
                                                </h3>
                                                <p className="sr-only faq-answer">
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
                                            data-open="true"
                                            className="rtl:-rotate-180 rtl:data-[open=true]:-rotate-90 bg-white data-[open=true]:bg-beta data-[open=true]:text-white text-beta size-8 rounded-full flex items-center justify-center rotate-180 data-[open=true]:rotate-0 transition-all flex-shrink-0">
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                stroke-width="0"
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
                                        className="px-4 sm:px-6 py-4 text-white text-sm sm:text-base"
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
                                className="rounded-medium px-0 mb-2.5 bg-transparent shadow-none"
                                aria-label="How does AI Tutor personalize the learning?">
                                <div data-open="true">
                                    <button
                                        data-open="true"
                                        className="flex w-full h-full gap-3 items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 py-2 ps-6 pe-2 rounded-full bg-white/15 border border-white/20 drop-shadow-sm data-[open=true]:bg-white transition-all"
                                        type="button"
                                        id=":R4l7jt7paja:"
                                        aria-expanded="true"
                                        aria-controls=":R4l7jt7pajaH1:">
                                        <div className="flex-1 flex flex-col text-start">
                                            <span
                                                data-open="true"
                                                className="text-base text-white data-[open=true]:text-black sm:text-lg transition-all font-normal">
                                                <h3 className="faq-question">
                                                    How does AI Tutor
                                                    personalize the learning?
                                                </h3>
                                                <p className="sr-only faq-answer">
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
                                            data-open="true"
                                            className="rtl:-rotate-180 rtl:data-[open=true]:-rotate-90 bg-white data-[open=true]:bg-beta data-[open=true]:text-white text-beta size-8 rounded-full flex items-center justify-center rotate-180 data-[open=true]:rotate-0 transition-all flex-shrink-0">
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                stroke-width="0"
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
                                        className="px-4 sm:px-6 py-4 text-white text-sm sm:text-base"
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
                                className="rounded-medium px-0 mb-2.5 bg-transparent shadow-none"
                                aria-label="Which subjects does AI Tutor cover?">
                                <div data-open="true">
                                    <button
                                        data-open="true"
                                        className="flex w-full h-full gap-3 items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 py-2 ps-6 pe-2 rounded-full bg-white/15 border border-white/20 drop-shadow-sm data-[open=true]:bg-white transition-all"
                                        type="button"
                                        id=":R4t7jt7paja:"
                                        aria-expanded="true"
                                        aria-controls=":R4t7jt7pajaH1:">
                                        <div className="flex-1 flex flex-col text-start">
                                            <span
                                                data-open="true"
                                                className="text-base text-white data-[open=true]:text-black sm:text-lg transition-all font-normal">
                                                <h3 className="faq-question">
                                                    Which subjects does AI Tutor
                                                    cover?
                                                </h3>
                                                <p className="sr-only faq-answer">
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
                                            data-open="true"
                                            className="rtl:-rotate-180 rtl:data-[open=true]:-rotate-90 bg-white data-[open=true]:bg-beta data-[open=true]:text-white text-beta size-8 rounded-full flex items-center justify-center rotate-180 data-[open=true]:rotate-0 transition-all flex-shrink-0">
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                stroke-width="0"
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
                                        className="px-4 sm:px-6 py-4 text-white text-sm sm:text-base"
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
                                className="rounded-medium px-0 mb-2.5 bg-transparent shadow-none"
                                aria-label="Is AI Tutor for all ages?">
                                <div data-open="true">
                                    <button
                                        data-open="true"
                                        className="flex w-full h-full gap-3 items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 py-2 ps-6 pe-2 rounded-full bg-white/15 border border-white/20 drop-shadow-sm data-[open=true]:bg-white transition-all"
                                        type="button"
                                        id=":R557jt7paja:"
                                        aria-expanded="true"
                                        aria-controls=":R557jt7pajaH1:">
                                        <div className="flex-1 flex flex-col text-start">
                                            <span
                                                data-open="true"
                                                className="text-base text-white data-[open=true]:text-black sm:text-lg transition-all font-normal">
                                                <h3 className="faq-question">
                                                    Is AI Tutor for all ages?
                                                </h3>
                                                <p className="sr-only faq-answer">
                                                    Yes, AI Tutor is for all
                                                    ages, from elementary school
                                                    to college and adult
                                                    learners.
                                                </p>
                                            </span>
                                        </div>
                                        <span
                                            aria-hidden="true"
                                            data-open="true"
                                            className="rtl:-rotate-180 rtl:data-[open=true]:-rotate-90 bg-white data-[open=true]:bg-beta data-[open=true]:text-white text-beta size-8 rounded-full flex items-center justify-center rotate-180 data-[open=true]:rotate-0 transition-all flex-shrink-0">
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                stroke-width="0"
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
                                        className="px-4 sm:px-6 py-4 text-white text-sm sm:text-base"
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
                                className="rounded-medium px-0 mb-2.5 bg-transparent shadow-none"
                                aria-label="How do I sign up for AI Tutor?">
                                <div data-open="true">
                                    <button
                                        data-open="true"
                                        className="flex w-full h-full gap-3 items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 py-2 ps-6 pe-2 rounded-full bg-white/15 border border-white/20 drop-shadow-sm data-[open=true]:bg-white transition-all"
                                        type="button"
                                        id=":R5d7jt7paja:"
                                        aria-expanded="true"
                                        aria-controls=":R5d7jt7pajaH1:">
                                        <div className="flex-1 flex flex-col text-start">
                                            <span
                                                data-open="true"
                                                className="text-base text-white data-[open=true]:text-black sm:text-lg transition-all font-normal">
                                                <h3 className="faq-question">
                                                    How do I sign up for AI
                                                    Tutor?
                                                </h3>
                                                <p className="sr-only faq-answer">
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
                                            data-open="true"
                                            className="rtl:-rotate-180 rtl:data-[open=true]:-rotate-90 bg-white data-[open=true]:bg-beta data-[open=true]:text-white text-beta size-8 rounded-full flex items-center justify-center rotate-180 data-[open=true]:rotate-0 transition-all flex-shrink-0">
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                stroke-width="0"
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
                                        className="px-4 sm:px-6 py-4 text-white text-sm sm:text-base"
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
                                className="rounded-medium px-0 mb-2.5 bg-transparent shadow-none"
                                aria-label="What are the subscription plans of AI Tutor?">
                                <div data-open="true">
                                    <button
                                        data-open="true"
                                        className="flex w-full h-full gap-3 items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 py-2 ps-6 pe-2 rounded-full bg-white/15 border border-white/20 drop-shadow-sm data-[open=true]:bg-white transition-all"
                                        type="button"
                                        id=":R5l7jt7paja:"
                                        aria-expanded="true"
                                        aria-controls=":R5l7jt7pajaH1:">
                                        <div className="flex-1 flex flex-col text-start">
                                            <span
                                                data-open="true"
                                                className="text-base text-white data-[open=true]:text-black sm:text-lg transition-all font-normal">
                                                <h3 className="faq-question">
                                                    What are the subscription
                                                    plans of AI Tutor?
                                                </h3>
                                                <p className="sr-only faq-answer">
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
                                            data-open="true"
                                            className="rtl:-rotate-180 rtl:data-[open=true]:-rotate-90 bg-white data-[open=true]:bg-beta data-[open=true]:text-white text-beta size-8 rounded-full flex items-center justify-center rotate-180 data-[open=true]:rotate-0 transition-all flex-shrink-0">
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                stroke-width="0"
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
                                        className="px-4 sm:px-6 py-4 text-white text-sm sm:text-base"
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
                                className="rounded-medium px-0 mb-2.5 bg-transparent shadow-none"
                                aria-label="Can I cancel my AI Tutor subscription anytime?">
                                <div data-open="true">
                                    <button
                                        data-open="true"
                                        className="flex w-full h-full gap-3 items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 py-2 ps-6 pe-2 rounded-full bg-white/15 border border-white/20 drop-shadow-sm data-[open=true]:bg-white transition-all"
                                        type="button"
                                        id=":R5t7jt7paja:"
                                        aria-expanded="true"
                                        aria-controls=":R5t7jt7pajaH1:">
                                        <div className="flex-1 flex flex-col text-start">
                                            <span
                                                data-open="true"
                                                className="text-base text-white data-[open=true]:text-black sm:text-lg transition-all font-normal">
                                                <h3 className="faq-question">
                                                    Can I cancel my AI Tutor
                                                    subscription anytime?
                                                </h3>
                                                <p className="sr-only faq-answer">
                                                    Yes! You can cancel anytime
                                                    through your account
                                                    settings with no
                                                    cancellation fees.
                                                </p>
                                            </span>
                                        </div>
                                        <span
                                            aria-hidden="true"
                                            data-open="true"
                                            className="rtl:-rotate-180 rtl:data-[open=true]:-rotate-90 bg-white data-[open=true]:bg-beta data-[open=true]:text-white text-beta size-8 rounded-full flex items-center justify-center rotate-180 data-[open=true]:rotate-0 transition-all flex-shrink-0">
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                stroke-width="0"
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
                                        className="px-4 sm:px-6 py-4 text-white text-sm sm:text-base"
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
                                className="rounded-medium px-0 mb-2.5 bg-transparent shadow-none"
                                aria-label="Do you offer plans for schools, universities, or other organizations?">
                                <div data-open="true">
                                    <button
                                        data-open="true"
                                        className="flex w-full h-full gap-3 items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 py-2 ps-6 pe-2 rounded-full bg-white/15 border border-white/20 drop-shadow-sm data-[open=true]:bg-white transition-all"
                                        type="button"
                                        id=":R657jt7paja:"
                                        aria-expanded="true"
                                        aria-controls=":R657jt7pajaH1:">
                                        <div className="flex-1 flex flex-col text-start">
                                            <span
                                                data-open="true"
                                                className="text-base text-white data-[open=true]:text-black sm:text-lg transition-all font-normal">
                                                <h3 className="faq-question">
                                                    Do you offer plans for
                                                    schools, universities, or
                                                    other organizations?
                                                </h3>
                                                <p className="sr-only faq-answer">
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
                                            data-open="true"
                                            className="rtl:-rotate-180 rtl:data-[open=true]:-rotate-90 bg-white data-[open=true]:bg-beta data-[open=true]:text-white text-beta size-8 rounded-full flex items-center justify-center rotate-180 data-[open=true]:rotate-0 transition-all flex-shrink-0">
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                stroke-width="0"
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
                                        className="px-4 sm:px-6 py-4 text-white text-sm sm:text-base"
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
                                className="rounded-medium px-0 mb-2.5 bg-transparent shadow-none"
                                aria-label="What tools are included in AI Tutor?">
                                <div data-open="true">
                                    <button
                                        data-open="true"
                                        className="flex w-full h-full gap-3 items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 py-2 ps-6 pe-2 rounded-full bg-white/15 border border-white/20 drop-shadow-sm data-[open=true]:bg-white transition-all"
                                        type="button"
                                        id=":R6d7jt7paja:"
                                        aria-expanded="true"
                                        aria-controls=":R6d7jt7pajaH1:">
                                        <div className="flex-1 flex flex-col text-start">
                                            <span
                                                data-open="true"
                                                className="text-base text-white data-[open=true]:text-black sm:text-lg transition-all font-normal">
                                                <h3 className="faq-question">
                                                    What tools are included in
                                                    AI Tutor?
                                                </h3>
                                                <p className="sr-only faq-answer">
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
                                            data-open="true"
                                            className="rtl:-rotate-180 rtl:data-[open=true]:-rotate-90 bg-white data-[open=true]:bg-beta data-[open=true]:text-white text-beta size-8 rounded-full flex items-center justify-center rotate-180 data-[open=true]:rotate-0 transition-all flex-shrink-0">
                                            <svg
                                                stroke="currentColor"
                                                fill="currentColor"
                                                stroke-width="0"
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
                                        className="px-4 sm:px-6 py-4 text-white text-sm sm:text-base"
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
                <section className="w-full max-w-[84rem] mx-auto px-4 sm:px-5">
                    <div className="relative w-full mx-auto rounded-2xl bg-alpha text-white shadow px-12 py-10 my-8">
                        <Image
                            alt="trinagle"
                            loading="lazy"
                            width="80"
                            height="80"
                            decoding="async"
                            data-nimg="1"
                            className="z-0 absolute top-8 left-8 w-[calc(10%+2dvw)] h-auto"
                            // style="color: transparent"
                            src="https://ai-tutor.ai/images/bg/learn-triangle.svg"
                        />
                        <Image
                            alt="trinagle"
                            loading="lazy"
                            width="80"
                            height="80"
                            decoding="async"
                            data-nimg="1"
                            className="z-0 absolute bottom-8 right-8 w-[calc(10%+2dvw)] h-auto"
                            // style="color: transparent"
                            src="https://ai-tutor.ai/images/bg/learn-star.svg"
                        />
                        <div className="static z-10 flex flex-col items-center gap-5 py-5">
                            <h2 className="z-10 text-center text-3xl">
                                Effective lessons, big results. <br />
                                Start learning with AI Tutor today!
                            </h2>
                            <div className="mt-4 relative max-w-sm w-full mb-10">
                                <a
                                    className="tap-highlight-transparent no-underline hover:opacity-80 active:opacity-disabled z-0 group relative justify-center box-border appearance-none select-none whitespace-nowrap font-normal subpixel-antialiased overflow-hidden tap-highlight-transparent data-[pressed=true]:scale-[0.97] outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 min-w-20 h-10 rounded-full [&amp;&gt;svg]:max-w-[theme(spacing.8)] transition-transform-colors-opacity motion-reduce:transition-none bg-primary text-primary-foreground data-[hover=true]:opacity-hover w-full mt-4 sm:mt-0 text-sm sm:text-base py-3 px-1.5 sm:px-4 flex items-center gap-1.5 hover:scale-105 transition"
                                    href="/dashboard"
                                    role="button">
                                    Get started
                                </a>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <footer className="w-full">
                <div className="w-full relative mx-auto pb-6 pt-3">
                    <Image
                        alt=""
                        loading="lazy"
                        width="464"
                        height="572"
                        decoding="async"
                        data-nimg="1"
                        className="absolute bottom-0 left-0 z-0 max-w-[22rem] w-[calc(20%+1dvw)] h-auto"
                        // style="color: transparent"
                        src="https://ai-tutor.ai/images/bg/footer-left.svg"
                    />
                    <Image
                        alt=""
                        loading="lazy"
                        width="401"
                        height="592"
                        decoding="async"
                        data-nimg="1"
                        className="absolute bottom-0 right-0 z-0 max-w-[22rem] w-[calc(20%+1dvw)] h-auto"
                        // style="color: transparent"
                        src="https://ai-tutor.ai/images/bg/footer-right.svg"
                    />
                    <div className="max-w-[128rem] w-full mx-auto px-4 sm:px-5 z-10 relative">
                        <div className="w-full mx-auto bg-white rounded-2xl px-10 py-4">
                            <div className="w-full py-8 grid md:grid-cols-4 gap-8 md:gap-6">
                                <div className="flex flex-col gap-4 items-center md:items-start">
                                    <Link
                                        className="relative tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 text-medium text-primary no-underline hover:opacity-80 active:opacity-disabled flex items-center gap-2 select-none hover:drop-shadow-md hover:scale-105 transition"
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
                                        <div className="font-albra text-xl md:text-3xl font-bold flex-shrink-0 text-black tracking-wide mt-1.5">
                                            TutorAI
                                        </div>
                                    </Link>
                                    <p className="text-center md:text-start">
                                        Next level AI tutoring for life-long
                                        learners
                                    </p>
                                    <div className="mt-4">
                                        <div className="font-medium text-lg mb-3">
                                            Contact
                                        </div>
                                        <div className="flex flex-col gap-3">
                                            <a
                                                className="relative tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 no-underline hover:opacity-80 active:opacity-disabled hover:translate-x-1 transition-all duration-300 flex items-center gap-2 text-black text-sm"
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
                                                    className="__cf_email__"
                                                    data-cfemail="ec8489808083ac8d85c1989998839ec28d85">
                                                    [email&#160;protected]
                                                </span>
                                            </a>
                                            <a
                                                className="relative tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 no-underline hover:opacity-80 active:opacity-disabled hover:translate-x-1 transition-all duration-300 flex items-center gap-2 text-black text-sm"
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
                                                className="relative tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 no-underline hover:opacity-80 active:opacity-disabled hover:translate-x-1 transition-all duration-300 flex items-start gap-2 text-black text-sm"
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
                                                    className="mt-0.5"
                                                    // style="color: transparent"
                                                    src="https://ai-tutor.ai/icons/pin.svg"
                                                />
                                                <p className="text-start">
                                                    Lumination AI Ltd, 86-90
                                                    Paul Street London, UK
                                                </p>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                                <div className="list-none flex flex-col items-center md:items-start gap-3">
                                    <div className="font-medium text-lg mb-2">
                                        Products
                                    </div>
                                    <a
                                        className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 hover:underline hover:opacity-80 active:opacity-disabled underline-offset-4 hover:translate-x-1 transition-all duration-300 text-black text-sm"
                                        href="/api"
                                        role="link">
                                        B2B Tutor API
                                    </a>
                                    <a
                                        className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 hover:underline hover:opacity-80 active:opacity-disabled underline-offset-4 hover:translate-x-1 transition-all duration-300 text-black text-sm"
                                        href="/homeworkify"
                                        role="link">
                                        Homeworkify
                                    </a>
                                    <a
                                        className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 hover:underline hover:opacity-80 active:opacity-disabled underline-offset-4 hover:translate-x-1 transition-all duration-300 text-black text-sm"
                                        href="/free-online-courses"
                                        role="link">
                                        Free Online Courses
                                    </a>
                                    <a
                                        className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 hover:underline hover:opacity-80 active:opacity-disabled underline-offset-4 hover:translate-x-1 transition-all duration-300 text-black text-sm"
                                        href="/whitelabel-ai-training"
                                        role="link">
                                        White Label AI Training
                                    </a>
                                    <a
                                        className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 hover:underline hover:opacity-80 active:opacity-disabled underline-offset-4 hover:translate-x-1 transition-all duration-300 text-black text-sm"
                                        href="/ai-for-educators"
                                        role="link">
                                        AI For Educators
                                    </a>
                                    <a
                                        className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 hover:underline hover:opacity-80 active:opacity-disabled underline-offset-4 hover:translate-x-1 transition-all duration-300 text-black text-sm"
                                        href="/ai-corporate-training"
                                        role="link">
                                        AI Corporate Training
                                    </a>
                                    <a
                                        className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 hover:underline hover:opacity-80 active:opacity-disabled underline-offset-4 hover:translate-x-1 transition-all duration-300 text-black text-sm"
                                        href="/blog"
                                        role="link">
                                        Blogs
                                    </a>
                                </div>
                                <div className="list-none flex flex-col items-center md:items-start gap-3">
                                    <div className="font-medium text-lg mb-2">
                                        Tools
                                    </div>
                                    <a
                                        className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 hover:underline hover:opacity-80 active:opacity-disabled underline-offset-4 hover:translate-x-1 transition-all duration-300 text-black text-sm"
                                        href="/ai-math-tutor"
                                        role="link">
                                        AI Math Solver
                                    </a>
                                    <a
                                        className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 hover:underline hover:opacity-80 active:opacity-disabled underline-offset-4 hover:translate-x-1 transition-all duration-300 text-black text-sm"
                                        href="/ai-answer-solver"
                                        role="link">
                                        AI Answer Solver
                                    </a>
                                    <a
                                        className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 hover:underline hover:opacity-80 active:opacity-disabled underline-offset-4 hover:translate-x-1 transition-all duration-300 text-black text-sm"
                                        href="/ai-chemistry-solver"
                                        role="link">
                                        AI Chemistry Solver
                                    </a>
                                    <a
                                        className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 hover:underline hover:opacity-80 active:opacity-disabled underline-offset-4 hover:translate-x-1 transition-all duration-300 text-black text-sm"
                                        href="/ai-biology-solver"
                                        role="link">
                                        AI Biology Solver
                                    </a>
                                    <a
                                        className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 hover:underline hover:opacity-80 active:opacity-disabled underline-offset-4 hover:translate-x-1 transition-all duration-300 text-black text-sm"
                                        href="/flashcards"
                                        role="link">
                                        Flashcards
                                    </a>
                                    <a
                                        className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 hover:underline hover:opacity-80 active:opacity-disabled underline-offset-4 hover:translate-x-1 transition-all duration-300 text-black text-sm"
                                        href="/quiz-ai"
                                        role="link">
                                        Quiz AI
                                    </a>
                                </div>
                                <div className="list-none flex flex-col items-center md:items-start gap-3">
                                    <div className="font-medium text-lg mb-2">
                                        About
                                    </div>
                                    <a
                                        className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 hover:underline hover:opacity-80 active:opacity-disabled underline-offset-4 hover:translate-x-1 transition-all duration-300 text-black text-sm"
                                        href="/pricing"
                                        role="link">
                                        Pricing
                                    </a>
                                    <a
                                        className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 hover:underline hover:opacity-80 active:opacity-disabled underline-offset-4 hover:translate-x-1 transition-all duration-300 text-black text-sm"
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
                                            shape-rendering="geometricPrecision"
                                            stroke="currentColor"
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="1.5"
                                            viewBox="0 0 24 24"
                                            width="1em"
                                            className="flex mx-1 text-current self-center">
                                            <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                            <path d="M15 3h6v6"></path>
                                            <path d="M10 14L21 3"></path>
                                        </svg>
                                    </a>
                                    <a
                                        className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 hover:underline hover:opacity-80 active:opacity-disabled underline-offset-4 hover:translate-x-1 transition-all duration-300 text-black text-sm"
                                        href="/about-us"
                                        role="link">
                                        About Us
                                    </a>
                                    <a
                                        className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 hover:underline hover:opacity-80 active:opacity-disabled underline-offset-4 hover:translate-x-1 transition-all duration-300 text-black text-sm"
                                        href="/contact-us"
                                        role="link">
                                        Contact Us
                                    </a>
                                    <a
                                        className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 hover:underline hover:opacity-80 active:opacity-disabled underline-offset-4 hover:translate-x-1 transition-all duration-300 text-black text-sm"
                                        href="/privacy-policy"
                                        role="link">
                                        Privacy Policy
                                    </a>
                                    <a
                                        className="relative inline-flex items-center tap-highlight-transparent outline-none data-[focus-visible=true]:z-10 data-[focus-visible=true]:outline-2 data-[focus-visible=true]:outline-focus data-[focus-visible=true]:outline-offset-2 hover:underline hover:opacity-80 active:opacity-disabled underline-offset-4 hover:translate-x-1 transition-all duration-300 text-black text-sm"
                                        href="/terms-conditions"
                                        role="link">
                                        Terms &amp; Conditions
                                    </a>
                                </div>
                            </div>
                            <div className="border-t text-black py-4">
                                <p>© AI Tutor 2025 | All Rights Reserved</p>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}
