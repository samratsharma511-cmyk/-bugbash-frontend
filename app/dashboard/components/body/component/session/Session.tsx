import styles from "./session.module.css"
import Link from "next/link";


const previousSessions = [
  {
    sno: 1,
    title: "Mock Interview Room #12",
    desp: "Live coding + interviewer notes",
    href: "/session/12",
  },
  {
    sno: 2,
    title: "DSA Practice Session",
    desp: "Two Sum, Sliding Window, Stack",
    href: "/session/11",
  },
  {
    sno: 3,
    title: "Frontend Pairing",
    desp: "Build and review UI together",
    href: "/session/10",
  },
];



export default function Session(){
    return (

          <section>
        <div className={styles.bodyCont}>
          <div className={styles.testCont}>
            <h1>Code sessions for developers</h1>
            <p>Collaborate, practice, and solve problems together in real-time.</p>

            <button>Create New Session</button>
          </div>
        </div>



        <div className={styles.previousSessionCont}>
          <div className={styles.previousHeader}>
            <h2>Previous Sessions</h2>
          </div>

          <div className={styles.previousTable}>
            <div className={styles.tableHead}>
              <div className={styles.colSno}>#</div>
              <div className={styles.colTitle}>Title</div>
              <div className={styles.colDesp}>Description</div>
              <div className={styles.colArrow}></div>
            </div>

            {previousSessions.map((item) => (
              <Link key={item.sno} href={item.href} className={styles.tableRow}>
                <div className={styles.colSno}>{item.sno}</div>
                <div className={styles.colTitle}>{item.title}</div>
                <div className={styles.colDesp}>{item.desp}</div>
                <div className={styles.colArrow}>→</div>
              </Link>
            ))}
          </div>
        </div>



        
      </section>

    )
}