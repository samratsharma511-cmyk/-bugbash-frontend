'use client';
import styles from './body.module.css';
import { useState } from 'react';

import Session from './component/session/Session';
import Assignment from './component/assignment/Assignment';

interface bodyInterface {
    hamburgerOpen: boolean;
}

export default function Body({ hamburgerOpen }: bodyInterface) {
    const [page, setpage] = useState(0);

    const changePage = (n: number) => {
        setpage(n);
    };

    const render = (n: number) => {
        if (n == 0) {
            return <Session />;
        }
        return <Assignment />;
    };

    return (
        <div
            className={styles.body}
            style={{
                gridTemplateColumns: hamburgerOpen ? '250px 1fr' : '1fr',
            }}>
            <div
                className={styles.sidenavbar}
                style={{ display: hamburgerOpen ? 'flex' : 'none' }}>
                <div
                    className={styles.session}
                    onClick={() => {
                        changePage(0);
                    }}>
                    <h4>Session</h4>
                </div>

                <div
                    className={styles.session}
                    onClick={() => {
                        changePage(1);
                    }}>
                    <h4>Assignments</h4>
                </div>
            </div>

            {render(page)}
        </div>
    );
}
