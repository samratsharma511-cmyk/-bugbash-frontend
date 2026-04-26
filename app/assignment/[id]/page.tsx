"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import {
  Bookmark,
  CheckCircle2,
  ChevronLeft,
  Clock3,
  Eye,
  Loader2,
  Trophy,
} from "lucide-react";

import styles from "./assignment.module.css";

type Assignment = {
  id: number;
  title: string;
  syllabus?: string | null;
  start_time?: string | null;
  end_time?: string | null;
  created_at?: string | null;
};

type AssignmentQuestion = {
  id: number;
  title: string;
  difficulty?: string | null;
  marks?: number | null;
  position?: number | null;
};

type QuestionDetail = {
  id: number;
  title: string;
  description?: string | null;
  input_format?: string | null;
  output_format?: string | null;
  constraints?: string | null;
  example?: string | null;
  explanation?: string | null;
  difficulty?: string | null;
  tags?: string | null;
};

type AssignmentResponse = {
  assignment: Assignment;
  questions: AssignmentQuestion[];
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

function isFinished(endTime?: string | null) {
  if (!endTime) return false;
  const end = new Date(endTime).getTime();
  return !Number.isNaN(end) && end < Date.now();
}

function RichText({
  value,
  className,
}: {
  value?: string | null;
  className?: string;
}) {
  if (!value) return null;

  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(value);
  if (looksLikeHtml) {
    return <div className={className} dangerouslySetInnerHTML={{ __html: value }} />;
  }

  return (
    <div className={className} style={{ whiteSpace: "pre-wrap" }}>
      {value}
    </div>
  );
}

export default function AssignmentPage() {
  const params = useParams<{ id: string }>();
  const assignmentId = useMemo(() => {
    const raw = params?.id;
    return Array.isArray(raw) ? raw[0] : raw;
  }, [params]);

  const [loading, setLoading] = useState(true);
  const [questionLoading, setQuestionLoading] = useState(false);
  const [error, setError] = useState("");

  const [bookmarked, setBookmarked] = useState(false);
  const [assignment, setAssignment] = useState<Assignment | null>(null);
  const [questions, setQuestions] = useState<AssignmentQuestion[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState<QuestionDetail | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!assignmentId) return;

      setLoading(true);
      setError("");

      try {
        const res = await fetch(`${API_BASE}/assignments/${assignmentId}`);
        const data = (await res.json()) as AssignmentResponse;

        if (!res.ok) {
          throw new Error((data as any)?.detail ?? "Failed to load assignment");
        }

        setAssignment(data.assignment);
        setQuestions(Array.isArray(data.questions) ? data.questions : []);
        setSelectedIndex(0);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load assignment");
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [assignmentId]);

  useEffect(() => {
    const loadQuestion = async () => {
      const q = questions[selectedIndex];
      if (!q?.id) {
        setSelectedQuestion(null);
        return;
      }

      setQuestionLoading(true);
      try {
        const res = await fetch(`${API_BASE}/questions/${q.id}`);
        const data = (await res.json()) as QuestionDetail;

        if (!res.ok) {
          throw new Error((data as any)?.detail ?? "Failed to load question");
        }

        setSelectedQuestion(data);
      } catch {
        setSelectedQuestion(null);
      } finally {
        setQuestionLoading(false);
      }
    };

    loadQuestion();
  }, [questions, selectedIndex]);

  const current = questions[selectedIndex] ?? null;
  const finished = isFinished(assignment?.end_time);
  const totalMarks = questions.reduce((sum, q) => sum + (Number(q.marks) || 0), 0);

  return (
    <main className={styles.page}>
      <div className={styles.container}>
        <div className={styles.backRow}>
          <Link href="/" className={styles.backButton}>
            <ChevronLeft size={18} />
            <span>Back</span>
          </Link>
        </div>

        {loading ? (
          <div className={styles.stateBox}>
            <Loader2 className={styles.spin} size={18} />
            <span>Loading assignment...</span>
          </div>
        ) : error ? (
          <div className={styles.stateBox}>{error}</div>
        ) : (
          <div className={styles.layout}>
            <aside className={styles.leftPanel}>
              <div className={styles.statusBox}>
                <div className={finished ? styles.statusFinished : styles.statusActive}>
                  <CheckCircle2 size={16} />
                  <span>{finished ? "This assignment is finished" : "This assignment is active"}</span>
                </div>

                <div className={styles.metaRow}>
                  <div className={styles.dateText}>
                    {formatDate(assignment?.created_at ?? assignment?.start_time)}
                  </div>

                  <button
                    type="button"
                    className={`${styles.bookmarkButton} ${bookmarked ? styles.bookmarkButtonActive : ""}`}
                    onClick={() => setBookmarked((prev) => !prev)}
                    aria-label="Bookmark assignment"
                  >
                    <Bookmark size={16} fill={bookmarked ? "currentColor" : "none"} />
                  </button>
                </div>

                <h1 className={styles.assignmentTitle}>
                  {assignment?.title || "Assignment"}
                </h1>

                <div className={styles.syllabusText}>
                  {assignment?.syllabus || "No syllabus provided"}
                </div>

                <div className={styles.solvedText}>
                  {questions.length > 0
                    ? "You solved all the questions"
                    : "No questions added yet"}
                </div>
              </div>
            </aside>

            <section className={styles.mainPanel}>
              <div className={styles.questionCard}>
                <div className={styles.questionTop}>
                  <div className={styles.questionHeadLeft}>
                    <span className={styles.questionNumber}>
                      {current ? `Q${current.position ?? selectedIndex + 1}.` : "Q1."}
                    </span>
                    <span className={styles.questionTitle}>
                      {current?.title || "Question"}
                    </span>

                    {current?.difficulty ? (
                      <span
                        className={`${styles.difficultyTag} ${
                          styles[(current.difficulty || "easy").toLowerCase() as keyof typeof styles] ||
                          ""
                        }`}
                      >
                        {current.difficulty}
                      </span>
                    ) : null}
                  </div>



                    <Link
                        href={`/question/${current.id}`}
                        className={styles.viewButton}
                        >
                        <Eye size={16} />
                        <span>View Submission</span>
                        </Link>
                </div>

                <div className={styles.questionBody}>
                  {questionLoading ? (
                    <div className={styles.questionLoading}>
                      <Loader2 className={styles.spin} size={16} />
                      <span>Loading question...</span>
                    </div>
                  ) : (
                    <>
                      <RichText
                        value={selectedQuestion?.description}
                        className={styles.questionText}
                      />

                      {selectedQuestion?.input_format ? (
                        <section className={styles.section}>
                          <div className={styles.sectionTitle}>Input</div>
                          <RichText
                            value={selectedQuestion.input_format}
                            className={styles.sectionText}
                          />
                        </section>
                      ) : null}

                      {selectedQuestion?.output_format ? (
                        <section className={styles.section}>
                          <div className={styles.sectionTitle}>Output</div>
                          <RichText
                            value={selectedQuestion.output_format}
                            className={styles.sectionText}
                          />
                        </section>
                      ) : null}

                      {selectedQuestion?.constraints ? (
                        <section className={styles.section}>
                          <div className={styles.sectionTitle}>Constraints</div>
                          <RichText
                            value={selectedQuestion.constraints}
                            className={styles.sectionText}
                          />
                        </section>
                      ) : null}

                      {selectedQuestion?.example ? (
                        <section className={styles.section}>
                          <div className={styles.sectionTitle}>Example</div>
                          <div className={styles.exampleBox}>
                            <RichText
                              value={selectedQuestion.example}
                              className={styles.exampleText}
                            />
                          </div>
                        </section>
                      ) : null}

                      {selectedQuestion?.explanation ? (
                        <section className={styles.section}>
                          <div className={styles.sectionTitle}>Explanation</div>
                          <RichText
                            value={selectedQuestion.explanation}
                            className={styles.sectionText}
                          />
                        </section>
                      ) : null}
                    </>
                  )}
                </div>
              </div>

              <div className={styles.listCard}>
                <div className={styles.listHeader}>Questions</div>
                <div className={styles.list}>
                  {questions.length === 0 ? (
                    <div className={styles.emptyText}>No questions added yet.</div>
                  ) : (
                    questions.map((q, index) => {
                      const active = index === selectedIndex;
                      return (
                        <button
                          key={q.id}
                          type="button"
                          className={`${styles.listItem} ${active ? styles.listItemActive : ""}`}
                          onClick={() => setSelectedIndex(index)}
                        >
                          <div className={styles.listLeft}>
                            <span className={styles.qChip}>Q{q.position ?? index + 1}</span>
                            <span className={styles.listTitle}>{q.title}</span>
                          </div>

                          <div className={styles.listRight}>
                            {q.marks ? <span className={styles.pts}>{q.marks} pts</span> : null}
                            {q.difficulty ? <span className={styles.level}>{q.difficulty}</span> : null}
                          </div>
                        </button>
                      );
                    })
                  )}
                </div>
              </div>
            </section>

          </div>
        )}
      </div>
    </main>
  );
}