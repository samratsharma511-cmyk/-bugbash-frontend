// app/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

const stats = [
  { value: "120K", label: "Sessions Created" },
  { value: "8M", label: "Code Runs" },
  { value: "24", label: "Practice Tracks" },
  { value: "96%", label: "Learner Satisfaction" },
];

const testimonials = [
  {
    name: "Apish",
    role: "Student",
    quote: "This platform makes interviews feel real. The live coding and teaching combo is insanely useful.",
    img: "https://i.pravatar.cc/160?img=1",
  },
  {
    name: "Divyanshu",
    role: "Student",
    quote: "Way better than watching tutorials. You actually learn by doing in real-time sessions.",
    img: "https://i.pravatar.cc/160?img=2",
  },
  {
    name: "Samarat",
    role: "Student",
    quote: "The playground plus live guidance helped me understand concepts much faster.",
    img: "https://i.pravatar.cc/160?img=3",
  },
  {
    name: "Ayush",
    role: "Student",
    quote: "Feels like a real interview environment. Super helpful for preparation.",
    img: "https://i.pravatar.cc/160?img=4",
  },
];

export default function Home() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <nav className={styles.navbar}>
          <div className={styles.navInner}>
            <Link href="/" className={styles.logo}>
              <div className={styles.logoIcon} />
              <span className={styles.logoText}>App</span>
            </Link>

            <div className={styles.links}>
              <Link href="/" className={styles.link}>
                Home
              </Link>
              <Link href="/sessions" className={styles.link}>
                Sessions
              </Link>
              <Link href="/playground" className={styles.link}>
                Playground
              </Link>
              <Link href="/about" className={styles.link}>
                About
              </Link>
            </div>

            <div className={styles.actions}>
              <Link href="/login" className={styles.primaryBtn}>
                Create Session
              </Link>
            </div>

            <button className={styles.mobileMenu} aria-label="Toggle navigation menu">
              <span />
              <span />
              <span />
            </button>
          </div>
        </nav>
      </header>

      <section className={styles.heroSection}>
        <div className={styles.container}>
          <h1 className={styles.heroTitle}>
            <span className={styles.heroLight}>Live Interview Sessions</span>
            <br />
            <span className={styles.heroBold}>Learn by Building in Real-Time</span>
          </h1>

          <p className={styles.heroText}>
            Create a session, join an interview room, and teach or solve problems
            while coding inside one smooth workspace.
          </p>

          <Link href="/create-session" className={styles.heroCta}>
            Start a Session
            <span className={styles.ctaArrow}>→</span>
          </Link>

          <div className={styles.heroTagsWrap}>
            <div className={styles.heroTagsTitle}>Built for Developers &amp; Learners</div>
            <div className={styles.heroTags}>
              <span className={styles.tag}>Live Teaching</span>
              <span className={styles.tag}>Code Playground</span>
              <span className={styles.tag}>Real Interview Flow</span>
            </div>
          </div>

          <a href="#testimonials" className={styles.playLink}>
            <span className={styles.playIcon}>
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
            <span>See how a live session works</span>
          </a>
        </div>
      </section>

      <section className={styles.statsSection}>
        <div className={styles.container}>
          <div className={styles.statsCard}>
            <div className={styles.statsGrid}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.statItem}>
                  <p className={styles.statValue}>
                    {stat.value}
                    <span className={styles.statPlus}></span>
                  </p>
                  <p className={styles.statLabel}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="testimonials" className={styles.testimonialsSection}>
        <div className={styles.container}>
          <div className={styles.testimonialsShell}>
            <h2 className={styles.testimonialsTitle}>Loved by students worldwide</h2>

            <div className={styles.swiperWrap}>
              <Swiper
                modules={[EffectCoverflow, Navigation]}
                effect="coverflow"
                centeredSlides
                grabCursor
                loop={false}
                navigation
                slidesPerView={1.1}
                breakpoints={{
                  640: { slidesPerView: 1.25 },
                  900: { slidesPerView: 1.5 },
                  1280: { slidesPerView: 1.75 },
                }}
                coverflowEffect={{
                  rotate: 20,
                  stretch: 0,
                  depth: 120,
                  modifier: 1,
                  slideShadows: false,
                }}
                className={styles.swiper}
              >
                {testimonials.map((item) => (
                  <SwiperSlide key={item.name}>
                    <div className={styles.testimonialCard}>
                      <Image
                        src={item.img}
                        alt={item.name}
                        width={80}
                        height={80}
                        unoptimized
                        className={styles.avatar}
                      />

                      <div className={styles.stars} aria-label="5 stars">
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 17.3l-6.18 3.25 1.18-6.88L2 8.75l6.91-1L12 1.5l3.09 6.25 6.91 1-4.99 4.92 1.18 6.88z" />
                        </svg>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 17.3l-6.18 3.25 1.18-6.88L2 8.75l6.91-1L12 1.5l3.09 6.25 6.91 1-4.99 4.92 1.18 6.88z" />
                        </svg>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 17.3l-6.18 3.25 1.18-6.88L2 8.75l6.91-1L12 1.5l3.09 6.25 6.91 1-4.99 4.92 1.18 6.88z" />
                        </svg>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 17.3l-6.18 3.25 1.18-6.88L2 8.75l6.91-1L12 1.5l3.09 6.25 6.91 1-4.99 4.92 1.18 6.88z" />
                        </svg>
                        <svg viewBox="0 0 24 24" aria-hidden="true">
                          <path d="M12 17.3l-6.18 3.25 1.18-6.88L2 8.75l6.91-1L12 1.5l3.09 6.25 6.91 1-4.99 4.92 1.18 6.88z" />
                        </svg>
                      </div>

                      <h3 className={styles.quote}>{`“${item.quote}”`}</h3>

                      <div className={styles.person}>
                        <div className={styles.personName}>{item.name}</div>
                        <div className={styles.personRole}>{item.role}</div>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}