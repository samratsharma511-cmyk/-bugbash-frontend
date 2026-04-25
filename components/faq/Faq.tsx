'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

import styles from './faq.module.css';

const data = [
    {
        name: 'Apish',
        role: 'Student',
        text: 'With this platform you learn anything quickly and deeply.',
        img: 'https://i.pravatar.cc/100?img=1',
    },
    {
        name: 'Divyanshu',
        role: 'Student',
        text: 'Live coding + explanation makes everything crystal clear.',
        img: 'https://i.pravatar.cc/100?img=2',
    },
    {
        name: 'Samarat',
        role: 'Student',
        text: 'Feels like a real interview environment.',
        img: 'https://i.pravatar.cc/100?img=3',
    },
    {
        name: 'Ayush',
        role: 'Student',
        text: 'Best way to practice and understand deeply.',
        img: 'https://i.pravatar.cc/100?img=4',
    },
];

export default function Faq() {
    return (
        <section className={styles.section}>
            <h2 className={styles.title}>Loved by learners worldwide</h2>

            <Swiper
                modules={[EffectCoverflow, Navigation]}
                effect="coverflow"
                grabCursor={true}
                centeredSlides={true}
                slidesPerView={1.8}
                loop={true}
                navigation
                coverflowEffect={{
                    rotate: 20,
                    stretch: 0,
                    depth: 120,
                    modifier: 1,
                    slideShadows: false,
                }}
                className={styles.swiper}>
                {data.map((item, i) => (
                    <SwiperSlide key={i}>
                        <div className={styles.card}>
                            <img src={item.img} className={styles.avatar} />

                            <div className={styles.stars}>★★★★★</div>

                            <p className={styles.text}>“{item.text}”</p>

                            <h4>{item.name}</h4>
                            <span>{item.role}</span>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
