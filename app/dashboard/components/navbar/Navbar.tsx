import styles from './navbar.module.css';
import Link from 'next/link';
import Image from 'next/image';
import image from '@/public/logo.png';
import { Dispatch, SetStateAction } from 'react';

interface navInterface {
    hamburgerOpen: boolean;
    setHamburgerOpen: Dispatch<SetStateAction<boolean>>;
}

export default function Navbar({
    hamburgerOpen,
    setHamburgerOpen,
}: navInterface) {
    const now = new Date();

    const time = now
        .toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true,
        })
        .replace(/\s+/g, ''); // 9:15AM

    const day = now.toLocaleDateString('en-US', {
        weekday: 'short',
    }); // Sun

    const date = now.toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
    }); // April 26

    const result = `${time} ${day}, ${date}`;

    return (
        <div className={styles.navbar}>
            <div className={styles.sideNavbar}>
                <div
                    className={styles.hamburger}
                    onClick={() => {
                        setHamburgerOpen(!hamburgerOpen);
                    }}>
                    ☰
                </div>
                <Link className={styles.logo} href="/">
                    <div className={styles.logoWrapper}>
                        <Image src={image} width={30} height={32} alt="Logo" />
                        <div className={styles.logoText}>AlGO VERSE</div>
                    </div>
                </Link>
            </div>

            <div className={styles.rightSection}>
                <p>{result}</p>

                {/* <div className={styles.avatarWrapper}>
                    <img
                        className={styles.gengar}
                        src="https://media.pocketgamer.biz/images/112645/77243/pokemonunitegengar_s470.jpg"
                        alt="avatar"
                    />
                </div> */}
            </div>
        </div>
    );
}
