'use client';
import styles from './dashboard.module.css';
import Navbar from './components/navbar/Navbar';
import Body from './components/body/Body';
import { useState } from 'react';

export default function Dashboard() {
    const [hamburgerOpen, sethamburgerOpen] = useState(true);
    return (
        <div>
            <Navbar
                hamburgerOpen={hamburgerOpen}
                sethamburgerOpen={sethamburgerOpen}
            />
            <Body hamburgerOpen={hamburgerOpen} />
        </div>
    );
}
