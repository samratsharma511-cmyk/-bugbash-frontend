"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  Loader2,
  Sparkles,
  Plus,
  CheckCircle2,
} from "lucide-react";

import styles from "./assignment.module.css";

type QuestionMeta = {
  id: number;
  title: string;
  difficulty?: string | null;
  position?: number | null;
  marks?: number | null;
};

type AssignmentItem = {
  id: number;
  title: string;
  syllabus?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  created_at?: string | null;
  questions: QuestionMeta[];
};

type AssignmentListRow = {
  id: number;
  title: string;
  syllabus?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  created_at?: string | null;
};

const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ??
  "http://127.0.0.1:8000";

function formatDate(value?: string | null) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function formatTime(value?: string | null) {
  if (!value) return "";
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleTimeString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function difficultyClass(difficulty?: string | null) {
  const value = (difficulty ?? "").toLowerCase();
  if (value === "easy") return styles.easy;
  if (value === "medium") return styles.medium;
  if (value === "hard") return styles.hard;
  return styles.easy;
}

export default function Assignment() {
  const router = useRouter();

  const [prompt, setPrompt] = useState("");
  const [loadingList, setLoadingList] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [assignments, setAssignments] = useState<AssignmentItem[]>([]);

  const loadAssignments = async () => {
    setLoadingList(true);
    setError("");

    try {
      const token = localStorage.getItem("access_token");

      const res = await fetch(`${API_BASE}/assignments/my/assignment/list`, {
        headers: token
          ? {
              Authorization: `Bearer ${token}`,
            }
          : undefined,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.detail ?? "Failed to load assignments");
      }

      const list: AssignmentListRow[] = Array.isArray(data) ? data : [];

      const detailed = await Promise.all(
        list.map(async (item) => {
          try {
            const detailRes = await fetch(`${API_BASE}/assignments/${item.id}`);
            const detailData = await detailRes.json();

            if (!detailRes.ok) {
              return {
                ...item,
                questions: [],
              };
            }

            return {
              id: detailData.assignment?.id ?? item.id,
              title: detailData.assignment?.title ?? item.title,
              syllabus: detailData.assignment?.syllabus ?? item.syllabus,
              start_time: detailData.assignment?.start_time ?? item.start_time,
              end_time: detailData.assignment?.end_time ?? item.end_time,
              created_at: detailData.assignment?.created_at ?? item.created_at,
              questions: Array.isArray(detailData.questions)
                ? detailData.questions
                : [],
            };
          } catch {
            return {
              ...item,
              questions: [],
            };
          }
        })
      );

      setAssignments(detailed);
    } catch (err) {
      setAssignments([]);
      setError(err instanceof Error ? err.message : "Failed to load assignments");
    } finally {
      setLoadingList(false);
    }
  };

  useEffect(() => {
    loadAssignments();
  }, []);

  const handleCreate = async () => {
    const cleanPrompt = prompt.trim();
    if (!cleanPrompt) {
      setError("Please enter a prompt first.");
      return;
    }

    setCreating(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("access_token");

      const res = await fetch(
        `${API_BASE}/ai/create/assignment?prompt=${encodeURIComponent(cleanPrompt)}`,
        {
          method: "POST",
          headers: token
            ? {
                Authorization: `Bearer ${token}`,
              }
            : undefined,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.detail ?? "Failed to create assignment");
      }

      setSuccess("Creating assignment, this may take a while...");
      setPrompt("");
      await loadAssignments();
    } catch (err) {
      setSuccess("");
      setError(err instanceof Error ? err.message : "Failed to create assignment");
    } finally {
      setCreating(false);
    }
  };

  const emptyState = useMemo(() => {
    if (loadingList) return "Loading assignments...";
    if (assignments.length === 0) return "No assignments yet.";
    return "";
  }, [loadingList, assignments.length]);

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <div className={styles.heroLeft}>
          <h1 className={styles.title}>Assignments</h1>
          <p className={styles.subtitle}>
            Create a test from a prompt and turn it into a structured assignment for your users.
          </p>
        </div>

        <div className={styles.heroRight}>
          <button
            type="button"
            className={styles.createButton}
            onClick={handleCreate}
            disabled={creating}
          >
            {creating ? (
              <>
                <Loader2 size={16} className={styles.spin} />
                Creating...
              </>
            ) : (
              <>
                <Sparkles size={16} />
                Create with AI
              </>
            )}
          </button>
        </div>
      </div>

      <div className={styles.createCard}>
        <div className={styles.createTop}>
          <div className={styles.createTitleWrap}>
            <div className={styles.createLabel}>Create assignment</div>
            <div className={styles.createHint}>
              Describe the assignment, topic, number of questions, and difficulty mix.
            </div>
          </div>

          <div className={styles.smallStatus}>
            {creating ? (
              <>
                <Loader2 size={14} className={styles.spin} />
                This may take a while
              </>
            ) : (
              <>
                <CheckCircle2 size={14} />
                Ready
              </>
            )}
          </div>
        </div>

        <textarea
          className={styles.promptBox}
          placeholder="Example: Create a 2-question DSA assignment on stacks and queues for beginners with one easy and one medium question."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />

        <div className={styles.createActions}>
          <button
            type="button"
            className={styles.primaryCreate}
            onClick={handleCreate}
            disabled={creating}
          >
            {creating ? "Creating assignment..." : "Generate Assignment"}
          </button>

          <div className={styles.helperText}>
            The assignment will be created in the background and added to your list.
          </div>
        </div>

        {error ? <div className={styles.errorText}>{error}</div> : null}
        {success ? <div className={styles.successText}>{success}</div> : null}
      </div>

      <div className={styles.listHeaderRow}>
        <h2 className={styles.listTitle}>My Assignments</h2>
        <div className={styles.listCount}>{assignments.length} total</div>
      </div>

      <div className={styles.listWrap}>
        {emptyState ? (
          <div className={styles.emptyState}>{emptyState}</div>
        ) : (
          assignments.map((item) => (
            <Link
              href={`/assignment/${item.id}`}
              key={item.id}
              className={styles.assignmentCard}
            >
              <div className={styles.cardMain}>
                <div className={styles.cardTop}>
                  <div>
                    <div className={styles.cardTitle}>{item.title}</div>
                    <div className={styles.cardMeta}>
                      {formatDate(item.created_at ?? item.start_time)}
                      {item.end_time ? ` • Deadline ${formatDate(item.end_time)} ${formatTime(item.end_time)}` : ""}
                    </div>
                  </div>

                  <ArrowRight size={18} className={styles.arrowIcon} />
                </div>

                <div className={styles.cardDesc}>
                  {item.syllabus || "No description provided."}
                </div>

                <div className={styles.questionRow}>
                  <div className={styles.questionCount}>
                    {item.questions.length} questions
                  </div>

                  <div className={styles.tagsWrap}>
                    {item.questions.slice(0, 3).map((q) => (
                      <span key={q.id} className={difficultyClass(q.difficulty)}>
                        {q.difficulty || "easy"}
                      </span>
                    ))}
                    {item.questions.length > 3 ? (
                      <span className={styles.moreTag}>+{item.questions.length - 3} more</span>
                    ) : null}
                  </div>
                </div>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}