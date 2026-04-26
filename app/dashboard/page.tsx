import styles from './dashboard.module.css';
import Navbar from './components/navbar/Navbar';
import Body from './components/body/Body';

export default function Dashboard() {
    return (
        <div
            style={{
                background: 'rgb(242 247 255)',
            }}>
            <Navbar />
            <Body />
        </div>
    );
}
