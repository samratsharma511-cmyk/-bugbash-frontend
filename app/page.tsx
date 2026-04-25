import Navbar from '@/components/navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import Styles from './page.module.css';
import Course from '@/components/course/course';
import Review from '@/components/revew/Review';
import Faq from '@/components/faq/Faq';

export default function Home() {
    return (
        <div
            style={{
                background: 'rgb(242 247 255 / var(--tw-bg-opacity, 1))',
            }}>
            <Navbar />

            <Hero />

            <Review />
            <Course />
            <Faq />
        </div>
    );
}
