'use client';
import Navbar from './components/navbar/Navbar';
import Body from './components/body/Body';
import { useState } from 'react';

export default function Dashboard() {
    const [hamburgerOpen, setHamburgerOpen] = useState(true);
    return (
        <div>
            <Navbar
                hamburgerOpen={hamburgerOpen}
                setHamburgerOpen={setHamburgerOpen}
            />
            <Body hamburgerOpen={hamburgerOpen} />
        </div>
    );
}
