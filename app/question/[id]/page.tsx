"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  ClipboardList,
  Eye,
  FolderClosed,
  GripVertical,
  Loader2,
  Maximize2,
  Play,
  RefreshCcw,
  Send,
  X,
} from "lucide-react";

import styles from "./question.module.css";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

type LanguageKey = "python" | "javascript" | "typescript" | "c" | "cpp";

type QuestionData = {
  id: number;
  title: string;
  difficulty: "easy" | "medium" | "hard" | string;
  description: string;
  input_format?: string;
  output_format?: string;
  constraints?: string;
  example?: string;
  time_limit?: string | number;
  memory_limit?: string | number;
  starter_code?: Partial<Record<LanguageKey, string>>;
};

type SubmissionCase = {
  title: string;
  input?: string;
  output?: string;
  status?: string;
  time?: number | string;
  memory?: number | string;
  expected_output?: string;
  is_hidden?: boolean;
};

type SubmissionRecord = {
  id: number;
  user_id: number;
  question_id: number;
  code: string;
  language: string;
  status: string;
  total_passed: number;
  total_cases: number;
  created_at?: string;
  results?: SubmissionCase[];
  isPending?: boolean;
};

type RunResult = {
  output?: string;
  error?: string;
  stdout?: string;
  stderr?: string;
  compile_output?: string;
};

type ActiveTab = "input" | "output" | "error";
type LeftTab = "question" | "submissions";

const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ??
  "http://127.0.0.1:8000";

const LANGUAGE_OPTIONS: { label: string; value: LanguageKey }[] = [
  { label: "Python (3.11.4)", value: "python" },
  { label: "JavaScript (Node.js)", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "C", value: "c" },
  { label: "C++", value: "cpp" },
];

const EMPTY_QUESTION: QuestionData = {
  id: 0,
  title: "Question",
  difficulty: "easy",
  description: "",
  input_format: "",
  output_format: "",
  constraints: "",
  example: "",
  time_limit: 2,
  memory_limit: 256000,
  starter_code: {
    python: "# start code here",
  },
};

function sanitizeText(value?: string | null) {
  if (value === null || value === undefined) return "";
  if (value === "string") return "";
  return value;
}

function normalizeRunResult(result: RunResult) {
  return {
    output: sanitizeText(result.output ?? result.stdout ?? ""),
    error: sanitizeText(result.error ?? result.stderr ?? result.compile_output ?? ""),
  };
}

function getStarterCode(question: QuestionData, language: LanguageKey) {
  return (
    question.starter_code?.[language] ??
    question.starter_code?.python ??
    "# start code here"
  );
}

function getDraftKey(questionId: string | number | undefined) {
  return `question-draft:${questionId ?? "default"}`;
}

function getStatusTone(status?: string, isPending?: boolean) {
  const value = (status ?? "").toLowerCase();

  if (isPending || value.includes("loading") || value.includes("running")) {
    return {
      border: "rgba(34, 197, 94, 0.35)",
      bg: "rgba(34, 197, 94, 0.10)",
      fg: "#86efac",
      dot: "#22c55e",
    };
  }

  if (value.includes("accepted")) {
    return {
      border: "rgba(16, 185, 129, 0.35)",
      bg: "rgba(16, 185, 129, 0.14)",
      fg: "#34d399",
      dot: "#10b981",
    };
  }

  if (value.includes("wrong")) {
    return {
      border: "rgba(239, 68, 68, 0.35)",
      bg: "rgba(239, 68, 68, 0.10)",
      fg: "#fca5a5",
      dot: "#ef4444",
    };
  }

  return {
    border: "rgba(148, 163, 184, 0.25)",
    bg: "rgba(148, 163, 184, 0.10)",
    fg: "#cbd5e1",
    dot: "#94a3b8",
  };
}

function normalizeSubmissionResponse(
  payload: any,
  fallback: { code: string; language: LanguageKey; questionId: number }
): SubmissionRecord {
  const source = payload?.submission ?? payload ?? {};
  const rawResults = Array.isArray(payload?.results)
    ? payload.results
    : Array.isArray(source?.results)
      ? source.results
      : [];

  const results: SubmissionCase[] = rawResults.map((item: any, index: number) => ({
    title: item?.title ?? `TC #${index}`,
    input:
      item?.input !== undefined && item?.input !== null
        ? String(item.input)
        : "Hidden",
    output:
      item?.output !== undefined && item?.output !== null
        ? String(item.output)
        : "Hidden",
    status: item?.status ?? "Wrong Answer",
    time: item?.time ?? "",
    memory: item?.memory ?? "",
    expected_output: item?.expected_output,
    is_hidden: item?.is_hidden,
  }));

  return {
    id: Number(source?.id ?? Date.now()),
    user_id: Number(source?.user_id ?? 1),
    question_id: Number(source?.question_id ?? fallback.questionId),
    code: sanitizeText(source?.code) || fallback.code,
    language: source?.language ?? fallback.language,
    status: source?.status ?? "Submitted",
    total_passed: Number(source?.total_passed ?? 0),
    total_cases: Number(source?.total_cases ?? results.length ?? 0),
    created_at: source?.created_at,
    results,
    isPending: false,
  };
}

export default function QuestionPage() {
  const params = useParams<{ id: string }>();
  const questionId = useMemo(() => {
    const raw = params?.id;
    return Array.isArray(raw) ? raw[0] : raw;
  }, [params]);

  const pageRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef({
    dragging: false,
    startX: 0,
    startWidth: 430,
  });

  const [loading, setLoading] = useState(true);
  const [leftTab, setLeftTab] = useState<LeftTab>("question");
  const [activeTab, setActiveTab] = useState<ActiveTab>("input");

  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);

  const [question, setQuestion] = useState<QuestionData>(EMPTY_QUESTION);
  const [submissions, setSubmissions] = useState<SubmissionRecord[]>([]);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState<number | null>(null);
  const [selectedTestCaseIndex, setSelectedTestCaseIndex] = useState(0);

  const [language, setLanguage] = useState<LanguageKey>("python");
  const [code, setCode] = useState("# start code here");
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");

  const [running, setRunning] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [leftWidth, setLeftWidth] = useState(430);
  const [codeByLanguage, setCodeByLanguage] = useState<Record<LanguageKey, string>>({
    python: "# start code here",
    javascript: "# start code here",
    typescript: "# start code here",
    c: "# start code here",
    cpp: "# start code here",
  });

  const selectedLanguage =
    LANGUAGE_OPTIONS.find((item) => item.value === language) ?? LANGUAGE_OPTIONS[0];

  const selectedSubmission =
    submissions.find((item) => item.id === selectedSubmissionId) ?? null;

  const selectedTestCases = selectedSubmission?.results ?? [];

  useEffect(() => {
    const load = async () => {
      if (!questionId) return;

      setLoading(true);

      try {
        const [questionRes, submissionsRes] = await Promise.allSettled([
          fetch(`${API_BASE}/questions/${questionId}`),
          fetch(`${API_BASE}/questions/${questionId}/submissions`),
        ]);

        let nextQuestion = EMPTY_QUESTION;
        let nextSubmissions: SubmissionRecord[] = [];

        if (questionRes.status === "fulfilled" && questionRes.value.ok) {
          const data = await questionRes.value.json();
          nextQuestion = {
            ...EMPTY_QUESTION,
            ...data,
            description: sanitizeText(data?.description),
            input_format: sanitizeText(data?.input_format),
            output_format: sanitizeText(data?.output_format),
            constraints: sanitizeText(data?.constraints),
            example: sanitizeText(data?.example),
          };
        }

        if (submissionsRes.status === "fulfilled" && submissionsRes.value.ok) {
          const data = await submissionsRes.value.json();
          const list = Array.isArray(data)
            ? data
            : data?.items ?? data?.submissions ?? [];
          if (Array.isArray(list)) {
            nextSubmissions = list.map((item: any) => ({
              id: Number(item.id),
              user_id: Number(item.user_id ?? 1),
              question_id: Number(item.question_id ?? Number(questionId)),
              code: sanitizeText(item.code),
              language: item.language ?? "python",
              status: item.status ?? "Submitted",
              total_passed: Number(item.total_passed ?? 0),
              total_cases: Number(item.total_cases ?? 0),
              created_at: item.created_at,
              results: Array.isArray(item.results)
                ? item.results.map((tc: any, index: number) => ({
                    title: tc?.title ?? `TC #${index}`,
                    input:
                      tc?.input !== undefined && tc?.input !== null
                        ? String(tc.input)
                        : "Hidden",
                    output:
                      tc?.output !== undefined && tc?.output !== null
                        ? String(tc.output)
                        : "Hidden",
                    status: tc?.status ?? "Wrong Answer",
                    time: tc?.time ?? "",
                    memory: tc?.memory ?? "",
                    expected_output: tc?.expected_output,
                    is_hidden: tc?.is_hidden,
                  }))
                : [],
            }));
          }
        }

        setQuestion(nextQuestion);
        setSubmissions(nextSubmissions);
        setSelectedSubmissionId(nextSubmissions.length ? nextSubmissions[0].id : null);
        setSelectedTestCaseIndex(0);

        const starter = getStarterCode(nextQuestion, "python");
        const draftRaw =
          typeof window !== "undefined"
            ? localStorage.getItem(getDraftKey(questionId))
            : null;

        if (draftRaw) {
          try {
            const draft = JSON.parse(draftRaw) as {
              language?: LanguageKey;
              code?: string;
              stdin?: string;
            };

            const nextLanguage =
              draft.language &&
              LANGUAGE_OPTIONS.some((item) => item.value === draft.language)
                ? draft.language
                : "python";

            const nextCode =
              sanitizeText(draft.code) || getStarterCode(nextQuestion, nextLanguage);

            setLanguage(nextLanguage);
            setCode(nextCode || "# start code here");
            setStdin(sanitizeText(draft.stdin));
            setCodeByLanguage((prev) => ({
              ...prev,
              [nextLanguage]: nextCode || "# start code here",
            }));
          } catch {
            setLanguage("python");
            setCode(starter || "# start code here");
            setStdin("");
            setCodeByLanguage({
              python: starter || "# start code here",
              javascript: "# start code here",
              typescript: "# start code here",
              c: "# start code here",
              cpp: "# start code here",
            });
          }
        } else {
          setLanguage("python");
          setCode(starter || "# start code here");
          setStdin("");
          setCodeByLanguage({
            python: starter || "# start code here",
            javascript: "# start code here",
            typescript: "# start code here",
            c: "# start code here",
            cpp: "# start code here",
          });
        }
      } catch {
        setQuestion(EMPTY_QUESTION);
        setSubmissions([]);
        setSelectedSubmissionId(null);
        setLanguage("python");
        setCode("# start code here");
        setStdin("");
        setCodeByLanguage({
          python: "# start code here",
          javascript: "# start code here",
          typescript: "# start code here",
          c: "# start code here",
          cpp: "# start code here",
        });
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [questionId]);

  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      if (!pageRef.current) return;
      if (!pageRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  useEffect(() => {
    const onMove = (event: PointerEvent) => {
      if (!dragStateRef.current.dragging) return;
      const bounded = Math.max(320, Math.min(520, event.clientX));
      setLeftWidth(bounded);
    };

    const onUp = () => {
      dragStateRef.current.dragging = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
  }, []);

  useEffect(() => {
    if (loading || !questionId) return;

    try {
      localStorage.setItem(
        getDraftKey(questionId),
        JSON.stringify({
          language,
          code,
          stdin,
        })
      );
    } catch {
      // ignore localStorage failures
    }
  }, [language, code, stdin, loading, questionId]);

  const persistDraftNow = () => {
    if (!questionId) return;
    try {
      localStorage.setItem(
        getDraftKey(questionId),
        JSON.stringify({
          language,
          code,
          stdin,
        })
      );
    } catch {
      // ignore
    }
  };

  const onLanguageSelect = (nextLanguage: LanguageKey) => {
    setCodeByLanguage((prev) => ({
      ...prev,
      [language]: code,
    }));
    const cached = codeByLanguage[nextLanguage];
    setLanguage(nextLanguage);
    setCode(cached || getStarterCode(question, nextLanguage) || "# start code here");
    setShowLanguageMenu(false);
  };

  const handleRun = async () => {
    persistDraftNow();
    setRunning(true);
    setOutput("");
    setError("");
    setActiveTab("output");

    try {
      const response = await fetch(`${API_BASE}/run_code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          stdin,
          language,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.detail ?? "Run failed");
      }

      const normalized = normalizeRunResult(data);
      setOutput(normalized.output);
      setError(normalized.error);
      setActiveTab(normalized.error ? "error" : "output");
    } catch (err) {
      setOutput("");
      setError(err instanceof Error ? err.message : "Run failed");
      setActiveTab("error");
    } finally {
      setRunning(false);
    }
  };

  const handleSubmit = async () => {
    persistDraftNow();
    setSubmitting(true);
    setError("");
    setLeftTab("submissions");
    setSelectedTestCaseIndex(0);

    const tempId = -Date.now();
    const pendingSubmission: SubmissionRecord = {
      id: tempId,
      user_id: 1,
      question_id: Number(questionId ?? question.id),
      code,
      language,
      status: "Loading...",
      total_passed: 0,
      total_cases: 0,
      results: [],
      isPending: true,
      created_at: new Date().toISOString(),
    };

    setSubmissions((prev) => [pendingSubmission, ...prev]);
    setSelectedSubmissionId(tempId);

    try {
      const response = await fetch(`${API_BASE}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: 1,
          question_id: Number(questionId ?? question.id),
          code,
          language,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.detail ?? "Submit failed");
      }

      const normalized = normalizeSubmissionResponse(data, {
        code,
        language,
        questionId: Number(questionId ?? question.id),
      });

      setSubmissions((prev) => [
        normalized,
        ...prev.filter((item) => item.id !== tempId && item.id !== normalized.id),
      ]);
      setSelectedSubmissionId(normalized.id);
      setSelectedTestCaseIndex(0);
      setActiveTab("output");
    } catch (err) {
      setSubmissions((prev) => prev.filter((item) => item.id !== tempId));
      setError(err instanceof Error ? err.message : "Submit failed");
      setActiveTab("error");
    } finally {
      setSubmitting(false);
    }
  };

  const openSubmissionModal = (submissionId: number) => {
    setSelectedSubmissionId(submissionId);
    setShowSubmissionModal(true);
  };

  const selectedModalSubmission = selectedSubmission;
  const statusTone = getStatusTone(selectedSubmission?.status, selectedSubmission?.isPending);

  return (
    <div className={styles.page} ref={pageRef}>
      <header className={styles.topBar}>
        <div className={styles.topLeft}>
          <Link href="/" className={styles.backLink}>
            <ChevronLeft size={18} />
            <span>Back</span>
          </Link>
          <span className={styles.topDivider} />
          <div className={styles.questionTitleWrap}>
            <span className={styles.pageTitle}>{question.title}</span>
          </div>
        </div>

        <div className={styles.topRight}>
          <div className={styles.avatarCircle} aria-hidden="true">
            A
          </div>

          <button
            type="button"
            className={styles.runTopButton}
            onClick={handleRun}
            disabled={running || loading || submitting}
          >
            {running ? (
              <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
            ) : (
              <Play size={16} />
            )}
            <span>{running ? "Running" : "Run"}</span>
          </button>

          <button
            type="button"
            className={styles.submitTopButton}
            onClick={handleSubmit}
            disabled={submitting || loading}
            style={
              submitting
                ? {
                    borderColor: "rgba(34, 197, 94, 0.45)",
                    background: "rgba(34, 197, 94, 0.12)",
                    color: "#86efac",
                    borderRadius: "4px",
                  }
                : undefined
            }
          >
            {submitting ? (
              <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} />
            ) : (
              <Send size={16} />
            )}
            <span>{submitting ? "Submitting..." : "Submit"}</span>
          </button>
        </div>
      </header>

      <div
        className={styles.workspace}
        style={{
          gridTemplateColumns: `64px ${leftWidth}px 8px minmax(0, 1fr)`,
        }}
      >
        <aside className={styles.navRail}>
          <button
            type="button"
            className={`${styles.railButton} ${leftTab === "question" ? styles.railButtonActive : ""}`}
            onClick={() => setLeftTab("question")}
            aria-label="Question"
          >
            <ClipboardList size={18} />
          </button>

          <button
            type="button"
            className={`${styles.railButton} ${leftTab === "submissions" ? styles.railButtonActive : ""}`}
            onClick={() => setLeftTab("submissions")}
            aria-label="Submissions"
          >
            <FolderClosed size={18} />
          </button>
        </aside>

        <aside className={styles.leftPanel}>
          <div className={styles.leftPanelHeader}>
            <div className={styles.leftTabs}>
              <button
                type="button"
                className={`${styles.leftTab} ${leftTab === "question" ? styles.leftTabActive : ""}`}
                onClick={() => setLeftTab("question")}
              >
                QUESTION
              </button>
              <button
                type="button"
                className={`${styles.leftTab} ${leftTab === "submissions" ? styles.leftTabActive : ""}`}
                onClick={() => setLeftTab("submissions")}
              >
                ALL SUBMISSIONS
              </button>
            </div>

            <div className={styles.leftHeaderActions}>
              <button type="button" className={styles.headerIconButton} aria-label="Refresh">
                <RefreshCcw size={16} />
              </button>
              <button type="button" className={styles.headerIconButton} aria-label="Close">
                <X size={16} />
              </button>
            </div>
          </div>

          <div className={styles.leftContent}>
            {leftTab === "question" ? (
              <div className={styles.scrollArea}>
                <div className={styles.questionMeta}>
                  <h1 className={styles.questionHeading}>{question.title}</h1>
                  <div className={styles.metaRow}>
                    <span className={styles.difficultyBadge}>{question.difficulty}</span>
                  </div>
                  <div className={styles.limitText}>
                    Time Limit: {question.time_limit ?? 2}, Memory Limit:{" "}
                    {question.memory_limit ?? 256000}
                  </div>
                </div>

                {question.description ? (
                  <section className={styles.sectionBlock}>
                    <div
                      className={styles.sectionBody}
                      dangerouslySetInnerHTML={{ __html: question.description }}
                    />
                  </section>
                ) : null}

                {question.input_format ? (
                  <section className={styles.sectionBlock}>
                    <h3 className={styles.sectionTitle}>Input</h3>
                    <div
                      className={styles.sectionBody}
                      dangerouslySetInnerHTML={{ __html: question.input_format }}
                    />
                  </section>
                ) : null}

                {question.output_format ? (
                  <section className={styles.sectionBlock}>
                    <h3 className={styles.sectionTitle}>Output</h3>
                    <div
                      className={styles.sectionBody}
                      dangerouslySetInnerHTML={{ __html: question.output_format }}
                    />
                  </section>
                ) : null}

                {question.constraints ? (
                  <section className={styles.sectionBlock}>
                    <h3 className={styles.sectionTitle}>Constraints</h3>
                    <div
                      className={styles.sectionBody}
                      dangerouslySetInnerHTML={{ __html: question.constraints }}
                    />
                  </section>
                ) : null}

                {question.example ? (
                  <section className={styles.sectionBlock}>
                    <h3 className={styles.sectionTitle}>Example</h3>
                    <div
                      className={styles.sectionBody}
                      dangerouslySetInnerHTML={{ __html: question.example }}
                    />
                  </section>
                ) : null}
              </div>
            ) : (
              <div className={styles.scrollArea}>
                <div
                  className={styles.submissionSummaryCard}
                  style={
                    submitting || selectedSubmission?.isPending
                      ? {
                          borderColor: statusTone.border,
                          background: statusTone.bg,
                        }
                      : undefined
                  }
                >
                  <div className={styles.summaryLeft}>
                    <div className={styles.summaryCount}>
                      {submitting || selectedSubmission?.isPending ? (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}>
                          <Loader2
                            size={18}
                            style={{
                              animation: "spin 1s linear infinite",
                              color: statusTone.dot,
                            }}
                          />
                          0/0
                        </span>
                      ) : (
                        <div>
                          {selectedSubmission?.total_passed || 0} /{" "}
                          {selectedSubmission?.total_cases || 0}
                        </div>
                      )}
                    </div>

                    <div className={styles.summaryLabel}>Test Cases Passes</div>
                  </div>

                  <div className={styles.summaryRight}>
                    <div
                      className={styles.statusText}
                      style={{
                        color: statusTone.fg,
                        border: `1px solid ${statusTone.border}`,
                        background: statusTone.bg,
                        padding: "8px 14px",
                        borderRadius: 999,
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      {(submitting || selectedSubmission?.isPending) && (
                        <span
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: 999,
                            background: statusTone.dot,
                            boxShadow: `0 0 0 4px ${statusTone.bg}`,
                          }}
                        />
                      )}
                      {submitting || selectedSubmission?.isPending
                        ? "Submitting..."
                        : selectedSubmission?.status ?? "No Submissions"}
                    </div>
                  </div>
                </div>

                {submitting || selectedSubmission?.isPending ? (
                  <div className={styles.emptyState} style={{ color: "#86efac" }}>
                    Evaluating submission...
                  </div>
                ) : selectedSubmission ? (
                  <div className={styles.submissionDetailGrid}>
                    <div className={styles.testCaseList}>
                      {selectedTestCases.length > 0 ? (
                        selectedTestCases.map((tc, index) => (
                          <button
                            key={`${tc.title}-${index}`}
                            type="button"
                            className={`${styles.testCaseItem} ${
                              index === selectedTestCaseIndex ? styles.testCaseItemActive : ""
                            }`}
                            onClick={() => setSelectedTestCaseIndex(index)}
                          >
                            <span>{tc.title}</span>
                            {String(tc.status ?? "").toLowerCase().includes("accepted") ? (
                              <span style={{ color: "#10b981" }}>✓</span>
                            ) : String(tc.status ?? "").toLowerCase().includes("wrong") ? (
                              <span style={{ color: "#ef4444" }}>✕</span>
                            ) : null}
                          </button>
                        ))
                      ) : (
                        <div className={styles.emptyMiniState}>No test case data</div>
                      )}
                    </div>

                    <div className={styles.testCaseDetail}>
                      {selectedTestCases.length > 0 ? (
                        <>
                          <div className={styles.detailBlock}>
                            <div className={styles.detailLabel}>INPUT</div>
                            <div className={styles.detailValue}>
                              {selectedTestCases[selectedTestCaseIndex]?.input ?? "Hidden"}
                            </div>
                          </div>
                          <div className={styles.detailBlock}>
                            <div className={styles.detailLabel}>OUTPUT</div>
                            <div className={styles.detailValue}>
                              {selectedTestCases[selectedTestCaseIndex]?.output ?? "Hidden"}
                            </div>
                          </div>
                          <div className={styles.detailBlock}>
                            <div className={styles.detailLabel}>STATUS</div>
                            <div className={styles.detailValue}>
                              {selectedTestCases[selectedTestCaseIndex]?.status ?? "Accepted"}
                            </div>
                          </div>
                          <div className={styles.detailBlock}>
                            <div className={styles.detailLabel}>TIME</div>
                            <div className={styles.detailValue}>
                              {selectedTestCases[selectedTestCaseIndex]?.time ?? 0.013}
                            </div>
                          </div>
                          <div className={styles.detailBlock}>
                            <div className={styles.detailLabel}>MEMORY</div>
                            <div className={styles.detailValue}>
                              {selectedTestCases[selectedTestCaseIndex]?.memory ?? 3596}
                            </div>
                          </div>
                        </>
                      ) : (
                        <div className={styles.emptyMiniState}>No test case data</div>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className={styles.emptyState}>No previous submissions yet.</div>
                )}

                <div className={styles.previousSubmissionsTitle}>Previous Submissions</div>
                <div className={styles.previousSubmissionsList}>
                  {submissions.length > 0 ? (
                    submissions.map((submission) => {
                      const tone = getStatusTone(submission.status, submission.isPending);

                      return (
                        <button
                          key={submission.id}
                          type="button"
                          className={styles.previousSubmissionRow}
                          onClick={() => openSubmissionModal(submission.id)}
                          style={
                            submission.isPending
                              ? {
                                  borderColor: tone.border,
                                  background: tone.bg,
                                }
                              : undefined
                          }
                        >
                          <div className={styles.previousRowMiddle}>
                            <div className={styles.previousRowTitle}>
                              {submission.isPending ? (
                                <span style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
                                  <Loader2
                                    size={14}
                                    style={{
                                      animation: "spin 1s linear infinite",
                                      color: tone.dot,
                                    }}
                                  />
                                  Loading...
                                </span>
                              ) : (
                                `${submission.total_passed}/${submission.total_cases}`
                              )}
                            </div>
                            <div
                              className={styles.previousRowSub}
                              style={submission.isPending ? { color: tone.fg } : undefined}
                            >
                              {submission.isPending ? "Submitting" : submission.status}
                            </div>
                          </div>
                          <div className={styles.previousRowAction}>
                            <span>View</span>
                            <Eye size={14} />
                          </div>
                        </button>
                      );
                    })
                  ) : (
                    <div className={styles.emptyState}>No previous submissions yet.</div>
                  )}
                </div>
              </div>
            )}
          </div>
        </aside>

        <div
          className={styles.resizer}
          role="separator"
          aria-orientation="vertical"
          onPointerDown={(e) => {
            dragStateRef.current.dragging = true;
            dragStateRef.current.startX = e.clientX;
            dragStateRef.current.startWidth = leftWidth;
            document.body.style.cursor = "col-resize";
            document.body.style.userSelect = "none";
          }}
        >
          <GripVertical size={14} />
        </div>

        <main className={styles.editorPanel}>
          <div className={styles.editorTopRow}>
            <div className={styles.languageWrap}>
              <button
                type="button"
                className={styles.languageButton}
                onClick={() => setShowLanguageMenu((prev) => !prev)}
              >
                <span>{selectedLanguage.label}</span>
                <span className={styles.chev}>⌄</span>
              </button>

              {showLanguageMenu && (
                <div className={styles.languageMenu}>
                  <input className={styles.languageSearch} placeholder="Search language" />
                  <div className={styles.languageList}>
                    {LANGUAGE_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={styles.languageItem}
                        onClick={() => onLanguageSelect(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className={styles.editorActions}>
              <button type="button" className={styles.actionIconButton} aria-label="Refresh">
                <RefreshCcw size={16} />
              </button>
              <button type="button" className={styles.actionIconButton} aria-label="Fullscreen">
                <Maximize2 size={16} />
              </button>
            </div>
          </div>

          <div className={styles.editorArea}>
            {loading ? (
              <div className={styles.loadingState}>Loading question...</div>
            ) : (
              <MonacoEditor
                key={language}
                height="100%"
                width="100%"
                theme="vs-dark"
                language={language}
                value={code}
                onChange={(value) => {
                  const next = value ?? "";
                  setCode(next);
                  setCodeByLanguage((prev) => ({
                    ...prev,
                    [language]: next,
                  }));
                }}
                options={{
                  readOnly: false,
                  domReadOnly: false,
                  automaticLayout: true,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,

  fontFamily: "'Poppins', monospace", // 🔥 ADD THIS
  lineHeight: 24,                            // 🔥 FIX spacing
  letterSpacing: 0.6,

                  fontSize: 15,
                  lineNumbers: "on",
                  wordWrap: "on",
                  smoothScrolling: true,

                
                  padding: { top: 14, bottom: 14 },
                }}
              />
            )}
          </div>

          <section className={styles.bottomPanel}>
            <div className={styles.bottomTabs}>
              <button
                type="button"
                className={`${styles.bottomTab} ${activeTab === "input" ? styles.bottomTabActive : ""}`}
                onClick={() => setActiveTab("input")}
              >
                INPUT
              </button>
              <button
                type="button"
                className={`${styles.bottomTab} ${activeTab === "output" ? styles.bottomTabActive : ""}`}
                onClick={() => setActiveTab("output")}
              >
                OUTPUT
              </button>
              <button
                type="button"
                className={`${styles.bottomTab} ${activeTab === "error" ? styles.bottomTabActive : ""}`}
                onClick={() => setActiveTab("error")}
              >
                ERROR
              </button>
            </div>

            <div className={styles.bottomBody}>
              {activeTab === "input" && (
                <textarea
                  className={styles.inputBox}
                  value={stdin}
                  onChange={(e) => setStdin(e.target.value)}
                  placeholder="Write standard input here..."
                  spellCheck={false}
                />
              )}

              {activeTab === "output" && (
                <pre className={styles.outputBox}>{output || "Run code to see output."}</pre>
              )}

              {activeTab === "error" && (
                <pre className={styles.errorBox}>{error || "No runtime error."}</pre>
              )}
            </div>
          </section>
        </main>
      </div>

      {showSubmissionModal && selectedModalSubmission ? (
        <div className={styles.modalBackdrop} onClick={() => setShowSubmissionModal(false)}>
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Submission code"
          >
            <div className={styles.modalHeader}>
              <h2>Submission Code</h2>
              <button
                type="button"
                className={styles.headerIconButton}
                onClick={() => setShowSubmissionModal(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <div className={styles.modalCodeWrap}>
              <MonacoEditor
                height="100%"
                width="100%"
                theme="vs-dark"
                language={selectedModalSubmission.language || "python"}
                value={selectedModalSubmission.code}
                options={{
                  readOnly: true,
                  domReadOnly: true,
                  automaticLayout: true,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontSize: 14,
                  lineNumbers: "on",
                  wordWrap: "on"
                }}
              />
            </div>

            <div className={styles.modalFooter}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setShowSubmissionModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}