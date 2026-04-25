'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Navigation } from 'swiper/modules';
import { Star } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/navigation';

import styles from './Review.module.css';

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
    {
        name: 'Stresth Nanwani',
        role: 'Student',
        text: 'The personalized study path actually keeps me on track every week.',
        img: 'https://i.pravatar.cc/100?img=12',
    },
    {
        name: 'Pulkit Singh Namdev',
        role: 'Student',
        text: 'I learned more in two weeks here than in months of self study.',
        img: 'https://i.pravatar.cc/100?img=15',
    },
    {
        name: 'Bhurpreet Singh',
        role: 'Student',
        text: 'The AI explanations make even tough topics feel simple and intuitive.',
        img: 'https://i.pravatar.cc/100?img=33',
    },
];

export default function Review() {
    return (
        <section className={styles.section}>
            <div className={styles.wrapper}>
                <h2 className={styles.title}>Loved by learners worldwide</h2>

                <Swiper
                    modules={[EffectCoverflow, Navigation]}
                    effect="coverflow"
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={1.6}
                    loop={true}
                    navigation
                    breakpoints={{
                        640: { slidesPerView: 2 },
                        1024: { slidesPerView: 2.4 },
                    }}
                    coverflowEffect={{
                        rotate: 14,
                        stretch: 0,
                        depth: 140,
                        modifier: 1,
                        slideShadows: false,
                    }}
                    className={styles.swiper}>
                    {data.map((item, i) => (
                        <SwiperSlide key={i}>
                            <div className={styles.card}>
                                <img
                                    src={item.img}
                                    alt={item.name}
                                    className={styles.avatar}
                                />
                                <div className={styles.stars}>
                                    {Array.from({ length: 5 }).map((_, s) => (
                                        <Star
                                            key={s}
                                            size={16}
                                            fill="currentColor"
                                            strokeWidth={0}
                                        />
                                    ))}
                                </div>
                                <p className={styles.text}>“{item.text}”</p>
                                <h4 className={styles.name}>{item.name}</h4>
                                <span className={styles.role}>{item.role}</span>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
}
