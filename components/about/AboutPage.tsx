import Link from 'next/link';
import {
    ArrowRight,
    BookOpenCheck,
    BrainCircuit,
    Code2,
    FileText,
    LineChart,
    Mail,
    ShieldCheck,
    Sparkles,
    Target,
} from 'lucide-react';
import Navbar from '@/components/navbar/Navbar';
import Footer from '@/components/footer/Footer';
import styles from './about.module.css';

const values = [
    {
        icon: BrainCircuit,
        title: 'AI that explains the why',
        text: 'Students get guided hints, feedback, and code reviews that focus on reasoning instead of memorizing answers.',
    },
    {
        icon: Code2,
        title: 'Practice that feels real',
        text: 'Assignments, playground sessions, quizzes, and interview drills are built around practical DSA problem solving.',
    },
    {
        icon: LineChart,
        title: 'Progress you can see',
        text: 'Learners can track strengths, weak topics, and next steps so every session has a clear purpose.',
    },
];

const stats = [
    { value: '100+', label: 'DSA concepts' },
    { value: '24/7', label: 'AI support' },
    { value: '10x', label: 'More focused practice' },
];

export default function AboutPage() {
    return (
        <div className={styles.page}>
            <Navbar />
            <main>
                <section className={styles.hero}>
                    <div className={styles.container}>
                        <div className={styles.heroText}>
                            <span className={styles.eyebrow}>
                                <Sparkles size={16} />
                                About DSA AI
                            </span>
                            <h1>Learn data structures with a tutor that stays with you.</h1>
                            <p>
                                DSA AI helps developers build interview-ready
                                problem solving skills through structured
                                lessons, real coding practice, and AI feedback
                                that meets learners where they are.
                            </p>
                            <div className={styles.actions}>
                                <Link href="/login" className={styles.primaryButton}>
                                    Start learning
                                    <ArrowRight size={18} />
                                </Link>
                                <Link href="/#Faq" className={styles.secondaryButton}>
                                    View FAQ
                                </Link>
                            </div>
                        </div>

                        <div className={styles.mediaPanel} aria-label="Learning preview">
                            <video
                                className={styles.heroVideo}
                                src="/video/mission.mp4"
                                autoPlay
                                muted
                                loop
                                playsInline
                            />
                        </div>
                    </div>
                </section>

                <section className={styles.statsBand}>
                    <div className={styles.statsGrid}>
                        {stats.map((item) => (
                            <div className={styles.statItem} key={item.label}>
                                <strong>{item.value}</strong>
                                <span>{item.label}</span>
                            </div>
                        ))}
                    </div>
                </section>

                <section className={styles.section}>
                    <div className={styles.sectionHeader}>
                        <span className={styles.smallLabel}>Our mission</span>
                        <h2>Make DSA practice clearer, faster, and more personal.</h2>
                        <p>
                            Most learners do not need more random questions.
                            They need a path, useful feedback, and enough
                            repetition to turn concepts into instincts.
                        </p>
                    </div>

                    <div className={styles.valueGrid}>
                        {values.map((item) => {
                            const Icon = item.icon;
                            return (
                                <article className={styles.valueCard} key={item.title}>
                                    <div className={styles.iconBox}>
                                        <Icon size={24} />
                                    </div>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </article>
                            );
                        })}
                    </div>
                </section>

                <section className={styles.storySection}>
                    <div className={styles.storyVisual}>
                        <div className={styles.topicCard}>
                            <BookOpenCheck size={28} />
                            <span>Structured roadmap</span>
                        </div>
                        <div className={styles.topicCard}>
                            <Target size={28} />
                            <span>Interview-focused drills</span>
                        </div>
                    </div>
                    <div className={styles.storyCopy}>
                        <span className={styles.smallLabel}>Why we built it</span>
                        <h2>DSA becomes easier when feedback is immediate.</h2>
                        <p>
                            The platform is designed for learners who want to
                            move from confusion to confidence without waiting
                            for office hours, mentors, or answer keys.
                        </p>
                        <p>
                            Every feature supports the same loop: learn a
                            concept, solve a real problem, understand mistakes,
                            and return stronger for the next challenge.
                        </p>
                    </div>
                </section>

                <section className={styles.infoSection}>
                    <article className={styles.infoCard} id="contact-us">
                        <div className={styles.infoIcon}>
                            <Mail size={24} />
                        </div>
                        <div>
                            <span className={styles.smallLabel}>Contact Us</span>
                            <h2>Need help with DSA AI?</h2>
                            <p>
                                Reach out for support, product questions, or
                                partnership inquiries. Our team will help you
                                find the right next step.
                            </p>
                            <a
                                className={styles.textLink}
                                href="mailto:support@dsa-ai.com">
                                support@dsa-ai.com
                            </a>
                        </div>
                    </article>

                    <article className={styles.infoCard} id="privacy-policy">
                        <div className={styles.infoIcon}>
                            <ShieldCheck size={24} />
                        </div>
                        <div>
                            <span className={styles.smallLabel}>
                                Privacy Policy
                            </span>
                            <h2>Your learning data should stay protected.</h2>
                            <p>
                                We use account, progress, and practice data to
                                provide the platform, personalize learning, and
                                improve reliability. We do not sell personal
                                information.
                            </p>
                        </div>
                    </article>

                    <article className={styles.infoCard} id="terms-conditions">
                        <div className={styles.infoIcon}>
                            <FileText size={24} />
                        </div>
                        <div>
                            <span className={styles.smallLabel}>
                                Terms & Conditions
                            </span>
                            <h2>Use DSA AI responsibly and fairly.</h2>
                            <p>
                                By using DSA AI, learners agree to use the
                                platform for lawful learning purposes, respect
                                service limits, and avoid misusing content,
                                systems, or other users&apos; access.
                            </p>
                        </div>
                    </article>
                </section>
            </main>
            <Footer />
        </div>
    );
}
