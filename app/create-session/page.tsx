'use client';

import { useState, useEffect } from 'react';
import styles from './page.module.css';

export default function CreateSessionPage() {
    const [code, setCode] = useState('');
    const [time, setTime] = useState('');

    useEffect(() => {
        const updateTime = () => {
            const now = new Date();
            const formatted = now.toLocaleTimeString([], {
                hour: 'numeric',
                minute: '2-digit',
            });

            const date = now.toLocaleDateString([], {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
            });

            setTime(`${formatted} • ${date}`);
        };

        updateTime();
        const interval = setInterval(updateTime, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className={styles.container}>
            {/* HEADER */}
            <header className={styles.header}>
                <div className={styles.headerLeft}>
                    <div className={styles.menu}>☰</div>
                    <div className={styles.logo}>
                        <span className={styles.logoIcon}>🎥</span>
                        <span>Google Meet</span>
                    </div>
                </div>

                <div className={styles.headerRight}>
                    <span className={styles.time}>{time}</span>
                    <div className={styles.icon}>?</div>
                    <div className={styles.icon}>⚙</div>
                    <div className={styles.avatar}>A</div>
                </div>
            </header>

            {/* SIDEBAR */}
            <aside className={styles.sidebar}>
                <div className={`${styles.navItem} ${styles.active}`}>
                    📅 Meetings
                </div>
                <div className={styles.navItem}>📹 Calls</div>
            </aside>

            {/* MAIN */}
            <main className={styles.main}>
                <div className={styles.centerBox}>
                    <h1>Video calls and meetings for everyone</h1>
                    <p>
                        Connect, collaborate, and celebrate from anywhere with
                        Google Meet
                    </p>

                    <div className={styles.actions}>
                        <button className={styles.newMeeting}>
                            ➕ New meeting
                        </button>

                        <div className={styles.joinWrapper}>
                            <input
                                type="text"
                                placeholder="Enter a code or link"
                                value={code}
                                onChange={(e) =>
                                    setCode(e.target.value)
                                }
                            />
                        </div>

                        <button
                            className={styles.joinBtn}
                            disabled={!code}
                        >
                            Join
                        </button>
                    </div>

                    <div className={styles.divider} />

                    {/* ILLUSTRATION */}
                    <div className={styles.illustration}>
                        🔗
                    </div>

                    <h3>Get a link you can share</h3>
                    <p className={styles.subtext}>
                        Click <b>New meeting</b> to get a link you can send to
                        people you want to meet with
                    </p>
                </div>
            </main>
        </div>
    );
}
