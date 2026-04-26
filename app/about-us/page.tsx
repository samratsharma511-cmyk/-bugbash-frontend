import type { Metadata } from 'next';
import AboutPage from '@/components/about/AboutPage';

export const metadata: Metadata = {
    title: 'About Us | DSA AI',
    description:
        'Learn about DSA AI, an AI-powered platform for structured data structures and algorithms practice.',
};

export default function Page() {
    return <AboutPage />;
}
