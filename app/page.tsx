import Navbar from '@/components/navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import Styles from './page.module.css';
import Faq from '@/components/faq/Faq';

export default function Home() {
    return (
        <div
            style={{
                background: 'rgb(242 247 255 / var(--tw-bg-opacity, 1))',
            }}>
            <Navbar />

            <Hero />

            <Faq />
        </div>
    );
}
