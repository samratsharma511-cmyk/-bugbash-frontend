"use client";

import styles from "./session.module.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

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

export default function Session() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const createSession = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/meet/create-session`, {
        method: "POST",
      });

      if (!res.ok) {
        throw new Error("Failed to create session");
      }

      const data = await res.json();

      if (!data.session_id) {
        throw new Error("Invalid session response");
      }

      if (data.initial_message) {
        sessionStorage.setItem(
          "initial_message",
          JSON.stringify(data.initial_message)
        );
      }

      router.push(`/session/${data.session_id}`);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <section>
      <div className={styles.bodyCont}>
        <div className={styles.testCont}>
          <h1>Code sessions for developers</h1>
          <p>Collaborate, practice, and solve problems together in real-time.</p>

          <button onClick={createSession} disabled={loading}>
            {loading ? "Creating..." : "Create New Session"}
          </button>
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
  );
}