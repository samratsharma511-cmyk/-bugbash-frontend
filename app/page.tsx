import Navbar from '@/components/navbar/Navbar';
import Hero from '@/components/Hero/Hero';
import Styles from './page.module.css';
import Faq from '@/components/faq/Faq';

export default function Home() {
    return (
        <div>
            <Navbar />

            <div className={Styles.heroCont}>
                <Hero />
            </div>

            <Faq />
        </div>
    );
}
