'use client';

import { useState } from 'react';
import styles from './faq.module.css';

type FaqEntry = {
    question: string;
    answer: string;
};

const faqs: FaqEntry[] = [
    {
        question: 'What is this DSA platform?',
        answer: 'This platform helps you learn Data Structures and Algorithms through structured coding assignments, quizzes, and real problem-solving practice.',
    },
    {
        question: 'How does the AI help me learn DSA?',
        answer: 'The AI analyzes your performance, suggests problems based on your level, and guides you with hints and explanations to improve your understanding.',
    },
    {
        question: 'Are the assignments beginner-friendly?',
        answer: 'Yes, assignments start from basic concepts like arrays and progress to advanced topics like dynamic programming and graphs.',
    },
    {
        question: 'Do I get coding practice?',
        answer: 'Absolutely. You will solve real coding problems similar to interview questions with increasing difficulty levels.',
    },
    {
        question: 'How do quizzes work?',
        answer: 'Quizzes test your conceptual understanding of DSA topics and help reinforce what you learn through coding assignments.',
    },
    {
        question: 'Can I track my progress?',
        answer: 'Yes, you can track your solved problems, accuracy, and improvement over time as you complete assignments and quizzes.',
    },
    {
        question: 'Is this useful for coding interviews?',
        answer: 'Yes, the platform is designed to prepare you for technical interviews by focusing on commonly asked DSA problems.',
    },
    {
        question: 'Do I need prior coding experience?',
        answer: 'Basic programming knowledge is helpful, but the platform guides you step by step from beginner to advanced levels.',
    },
    {
        question: 'Can I practice daily?',
        answer: 'Yes, the platform is designed for daily practice with short assignments and quizzes to build consistency.',
    },
];

export default function FaqAccordion() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className={styles.flexCol} data-orientation="vertical" id='Faq'>
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
