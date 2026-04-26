'use client';

import { useState } from 'react';
import styles from './faq.module.css';

type FaqEntry = {
    question: string;
    answer: string;
};

const faqs: FaqEntry[] = [
    {
        question: 'What is AI Tutor?',
        answer: "Our new platform proposes a new way of learning with personalized tutoring empowered by AI, to help you learn better, regardless if you're a student, a creative selling your own courses, or a professional looking to upskill.",
    },
    {
        question: 'How does AI Tutor personalize the learning?',
        answer: 'Our AI system assesses your learning style, strengths and weaknesses to customize lessons and practice exercises.',
    },
    {
        question: 'Which subjects does AI Tutor cover?',
        answer: 'AI Tutor covers pretty much any subject you can think of, from Maths, to Science, English, Physics, and more, for all levels.',
    },
    {
        question: 'Is AI Tutor for all ages?',
        answer: 'Yes, AI Tutor is for all ages, from elementary school to college and adult learners.',
    },
    {
        question: 'How do I sign up for AI Tutor?',
        answer: 'Click the "Generate" button at the top of this page and follow the simple sign up process.',
    },
    {
        question: 'What are the subscription plans of AI Tutor?',
        answer: 'We have monthly and annual plans. Check out our Pricing page [https://ai-tutor.ai/pricing] for details.',
    },
    {
        question: 'Can I cancel my AI Tutor subscription anytime?',
        answer: 'Yes! You can cancel anytime through your account settings with no cancellation fees.',
    },
    {
        question:
            'Do you offer plans for schools, universities, or other organizations?',
        answer: 'Yes. We provide custom plans with dedicated support for educational institutions and businesses. Please contact us to build a solution that fits your needs.',
    },
    {
        question: 'What tools are included in AI Tutor?',
        answer: 'AI Tutor includes an AI tutor chat, homework helper, content summarizer, quiz and flashcard generator, and a course generator, all designed to help you learn faster and more effectively.',
    },
];

export default function FaqAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className={styles.flexCol} data-orientation="vertical">
            {faqs.map((faq, index) => {
                const isOpen = openIndex === index;
                const buttonId = `faq-button-${index}`;
                const panelId = `faq-panel-${index}`;
                return (
                    <div
                        key={index}
                        data-open={isOpen}
                      className={styles.faqItem}
                        aria-label={faq.question}>
                        <div data-open={isOpen}>
                            <button
                                data-open={isOpen}
                                className={styles.button}
                                type="button"
                                id={buttonId}
                                aria-expanded={isOpen}
                                aria-controls={panelId}
                                onClick={() =>
                                    setOpenIndex(isOpen ? null : index)
                                }>
                                <div className={styles.flexCol}>
                                    <span className={styles.textMd}>
                                        <h3 className={styles.faqQuestion}>
                                            {faq.question}
                                        </h3>
                                    </span>
                                </div>
                                <span
                                    aria-hidden="true"
                                    className={styles.iconCircle}
                                    style={{
                                        transition: 'transform 0.2s ease',
                                        transform: isOpen
                                            ? 'rotate(180deg)'
                                            : 'rotate(0deg)',
                                    }}>
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
                        {isOpen && (
                            <section>
                                <div
                                    data-open={isOpen}
                                    className={styles.faqAnswer}
                                    id={panelId}
                                    role="region"
                                    aria-labelledby={buttonId}>
                                    <p>{faq.answer}</p>
                                </div>
                            </section>
                        )}
                    </div>
                );
            })}
        </div>
    );
}
