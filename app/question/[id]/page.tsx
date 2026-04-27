"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import {
  Bookmark,
  Bot,
  ChevronLeft,
  Eye,
  FolderClosed,
  GripVertical,
  Info,
  Lightbulb,
  ListChecks,
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
  description: string;
  input_format?: string;
  output_format?: string;
  constraints?: string;
  example?: string;
  explanation?: string;
  difficulty?: string;
  tags?: string;
  max_marks?: number;
  starter_code?: Partial<Record<LanguageKey, string>>;
};

type SubmissionCase = {
  title: string;
  input?: string;
  output?: string;
  expected_output?: string;
  status?: string;
  error?: string;
  time?: number | string;
  memory?: number | string;
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

type ActiveTab = "input" | "output" | "error";
type LeftTab = "question" | "submissions" | "ai";
type AiMode = "hints" | "lines";

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
  description: "",
  input_format: "",
  output_format: "",
  constraints: "",
  example: "",
  explanation: "",
  difficulty: "easy",
  tags: "",
  max_marks: undefined,
  starter_code: {
    python: "# start code here",
  },
};

function sanitizeText(value?: string | null) {
  if (value === null || value === undefined) return "";
  if (value === "string") return "";
  return value;
}

function normalizeRunResult(result: {
  output?: string;
  error?: string;
  stdout?: string;
  stderr?: string;
  compile_output?: string;
}) {
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

function RichText({
  value,
  className,
}: {
  value?: string;
  className?: string;
}) {
  if (!value) return null;

  const looksLikeHtml = /<\/?[a-z][\s\S]*>/i.test(value);

  if (looksLikeHtml) {
    return (
      <div
        className={className}
        dangerouslySetInnerHTML={{ __html: value }}
      />
    );
  }

  return (
    <div className={className} style={{ whiteSpace: "pre-wrap" }}>
      {value}
    </div>
  );
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
    expected_output:
      item?.expected_output !== undefined && item?.expected_output !== null
        ? String(item.expected_output)
        : "Hidden",
    status: item?.status ?? "Wrong Answer",
    error: item?.error ?? "",
    time: item?.time ?? "",
    memory: item?.memory ?? "",
    is_hidden: item?.is_hidden ?? true,
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
    startWidth: 420,
  });

  const [loading, setLoading] = useState(true);
  const [leftTab, setLeftTab] = useState<LeftTab>("question");
  const [activeTab, setActiveTab] = useState<ActiveTab>("input");
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showSubmissionModal, setShowSubmissionModal] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

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

  const [leftWidth, setLeftWidth] = useState(420);
  const [codeByLanguage, setCodeByLanguage] = useState<Record<LanguageKey, string>>({
    python: "# start code here",
    javascript: "# start code here",
    typescript: "# start code here",
    c: "# start code here",
    cpp: "# start code here",
  });

  const [generatedInput, setGeneratedInput] = useState("");
  const [generatedOutput, setGeneratedOutput] = useState("");
  const [generatedError, setGeneratedError] = useState("");
  const [generating, setGenerating] = useState(false);

  const [modalLoading, setModalLoading] = useState(false);
  const [modalSubmission, setModalSubmission] = useState<SubmissionRecord | null>(null);

  const [aiMode, setAiMode] = useState<AiMode>("hints");
  const [aiLoading, setAiLoading] = useState(false);
  const [aiError, setAiError] = useState("");
  const [aiHints, setAiHints] = useState<string[]>([]);
  const [aiIssues, setAiIssues] = useState<{ line: number; issue: string }[]>([]);
  const [aiLastRun, setAiLastRun] = useState("");

  const selectedLanguage =
    LANGUAGE_OPTIONS.find((item) => item.value === language) ?? LANGUAGE_OPTIONS[0];

  const selectedSubmission =
    submissions.find((item) => item.id === selectedSubmissionId) ?? null;

  const selectedTestCases = selectedSubmission?.results ?? [];

  const tags = useMemo(() => {
    return (question.tags ?? "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean);
  }, [question.tags]);

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
            explanation: sanitizeText(data?.explanation),
            tags: sanitizeText(data?.tags),
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
                    expected_output:
                      tc?.expected_output !== undefined && tc?.expected_output !== null
                        ? String(tc.expected_output)
                        : "Hidden",
                    status: tc?.status ?? "Wrong Answer",
                    error: tc?.error ?? "",
                    time: tc?.time ?? "",
                    memory: tc?.memory ?? "",
                    is_hidden: tc?.is_hidden ?? true,
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
      const bounded = Math.max(340, Math.min(520, event.clientX));
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
      // ignore
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

  const handleGenerateExpectedOutput = async () => {
    if (!questionId) return;
    const input = generatedInput.trim();

    if (!input) {
      setGeneratedError("Insert input first.");
      setGeneratedOutput("");
      return;
    }

    setGenerating(true);
    setGeneratedError("");
    setGeneratedOutput("");

    try {
      const response = await fetch(`${API_BASE}/questions/${questionId}/generate-output`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.detail ?? "Failed to generate expected output");
      }

      const nextOutput =
        data?.expected_output ??
        data?.output ??
        data?.result ??
        data?.answer ??
        "";

      setGeneratedOutput(String(nextOutput));
    } catch (err) {
      setGeneratedOutput("");
      setGeneratedError(err instanceof Error ? err.message : "Failed to generate expected output");
    } finally {
      setGenerating(false);
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
      const token = localStorage.getItem("access_token");

      const response = await fetch(`${API_BASE}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
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

  const openSubmissionModal = async (submissionId: number) => {
    setSelectedSubmissionId(submissionId);
    setShowSubmissionModal(true);
    setModalLoading(true);
    setModalSubmission(null);

    try {
      const cached = submissions.find((item) => item.id === submissionId);
      if (cached?.code) {
        setModalSubmission(cached);
        return;
      }

      const response = await fetch(`${API_BASE}/submissions/${submissionId}`);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.detail ?? "Failed to load submission");
      }

      setModalSubmission({
        id: Number(data.id),
        user_id: Number(data.user_id ?? 1),
        question_id: Number(data.question_id ?? Number(questionId ?? question.id)),
        code: sanitizeText(data.code),
        language: data.language ?? "python",
        status: data.status ?? "Submitted",
        total_passed: Number(data.total_passed ?? 0),
        total_cases: Number(data.total_cases ?? 0),
        created_at: data.created_at,
        results: Array.isArray(data.results) ? data.results : [],
      });
    } catch {
      setModalSubmission(null);
    } finally {
      setModalLoading(false);
    }
  };

  const runAiHelp = async (mode: AiMode) => {
    const nextCode = code.trim();
    if (!nextCode) {
      setAiError("Write some code first.");
      setAiMode(mode);
      return;
    }

    setAiMode(mode);
    setAiLoading(true);
    setAiError("");
    setAiHints([]);
    setAiIssues([]);

    try {
      const route = mode === "hints" ? "/meet/analyze-code" : "/meet/analyze-lines";

      const response = await fetch(`${API_BASE}${route}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: nextCode,
          question_id: Number(questionId ?? question.id),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.detail ?? "AI analysis failed");
      }

      if (mode === "hints") {
        const hints = Array.isArray(data?.hints) ? data.hints.map((item: any) => String(item)) : [];
        setAiHints(hints);
      } else {
        const issues = Array.isArray(data)
          ? data.map((item: any) => ({
              line: Number(item?.line ?? 0),
              issue: String(item?.issue ?? ""),
            }))
          : [];
        setAiIssues(issues);
      }

      setAiLastRun(new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }));
    } catch (err) {
      setAiError(err instanceof Error ? err.message : "AI analysis failed");
    } finally {
      setAiLoading(false);
    }
  };

  const selectedModalSubmission = modalSubmission ?? selectedSubmission;
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
          <button
            type="button"
            className={`${styles.topIconButton} ${bookmarked ? styles.topIconButtonActive : ""}`}
            onClick={() => setBookmarked((prev) => !prev)}
            aria-label="Bookmark"
          >
            <Bookmark size={16} fill={bookmarked ? "currentColor" : "none"} />
          </button>

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
              <Loader2 size={16} className={styles.spin} />
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
                  }
                : undefined
            }
          >
            {submitting ? (
              <Loader2 size={16} className={styles.spin} />
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
            <FolderClosed size={18} />
          </button>

          <button
            type="button"
            className={`${styles.railButton} ${leftTab === "submissions" ? styles.railButtonActive : ""}`}
            onClick={() => setLeftTab("submissions")}
            aria-label="Submissions"
          >
            <Eye size={18} />
          </button>

          <button
            type="button"
            className={`${styles.railButton} ${leftTab === "ai" ? styles.railButtonActive : ""}`}
            onClick={() => setLeftTab("ai")}
            aria-label="AI Help"
          >
            <Bot size={18} />
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
              <button
                type="button"
                className={`${styles.leftTab} ${leftTab === "ai" ? styles.leftTabActive : ""}`}
                onClick={() => setLeftTab("ai")}
              >
                AI HELP
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
                    <span className={styles.difficultyBadge}>
                      {question.difficulty || "easy"}
                    </span>

                    {typeof question.max_marks === "number" && (
                      <span className={styles.pointsBadge}>
                        {question.max_marks} pts
                      </span>
                    )}

                    {tags.map((tag) => (
                      <span key={tag} className={styles.tagBadge}>
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className={styles.limitText}>
                    Time Limit: 2, Memory Limit: 256000
                  </div>
                </div>

                {question.description ? (
                  <section className={styles.sectionBlock}>
                    <h3 className={styles.sectionTitle}>Question</h3>
                    <RichText value={question.description} className={styles.richText} />
                  </section>
                ) : null}

                {question.input_format ? (
                  <section className={styles.sectionBlock}>
                    <h3 className={styles.sectionTitle}>Input</h3>
                    <RichText value={question.input_format} className={styles.richText} />
                  </section>
                ) : null}

                {question.output_format ? (
                  <section className={styles.sectionBlock}>
                    <h3 className={styles.sectionTitle}>Output</h3>
                    <RichText value={question.output_format} className={styles.richText} />
                  </section>
                ) : null}

                {question.constraints ? (
                  <section className={styles.sectionBlock}>
                    <h3 className={styles.sectionTitle}>Constraints</h3>
                    <RichText value={question.constraints} className={styles.richText} />
                  </section>
                ) : null}

                {question.example ? (
                  <section className={styles.sectionBlock}>
                    <div className={styles.sectionHeader}>
                      <h3 className={styles.sectionTitle}>Example</h3>
                    </div>

                    <div className={styles.exampleCard}>
                      <RichText value={question.example} className={styles.exampleBody} />
                    </div>
                  </section>
                ) : null}

                {question.explanation ? (
                  <section className={styles.sectionBlock}>
                    <h3 className={styles.sectionTitle}>Explanation</h3>
                    <RichText value={question.explanation} className={styles.richText} />
                  </section>
                ) : null}

                <section className={styles.sectionBlock}>
                  <div className={styles.sectionHeader}>
                    <h3 className={styles.sectionTitle}>Generated Expected Output</h3>
                    <button
                      type="button"
                      className={styles.headerIconButton}
                      aria-label="Info"
                    >
                      <Info size={16} />
                    </button>
                  </div>

                  <label className={styles.helperLabel}>Insert Input</label>
                  <textarea
                    className={styles.generateInput}
                    value={generatedInput}
                    onChange={(e) => setGeneratedInput(e.target.value)}
                    placeholder="Input"
                    spellCheck={false}
                  />

                  <button
                    type="button"
                    className={styles.generateButton}
                    onClick={handleGenerateExpectedOutput}
                    disabled={generating}
                  >
                    {generating ? (
                      <>
                        <Loader2 size={18} className={styles.spin} />
                        Generating...
                      </>
                    ) : (
                      <>
                        Generate Expected Output
                        <span className={styles.generateArrow}>›</span>
                      </>
                    )}
                  </button>

                  {generatedError ? (
                    <div className={styles.generateError}>{generatedError}</div>
                  ) : null}

                  <label className={styles.helperLabel}>Expected Output</label>
                  <pre className={styles.generateOutput}>
                    {generatedOutput || " "}
                  </pre>
                </section>
              </div>
            ) : leftTab === "submissions" ? (
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
                        <span className={styles.inlineLoading}>
                          <Loader2 size={18} className={styles.spin} />
                          0/0
                        </span>
                      ) : (
                        <div>
                          {selectedSubmission?.total_passed || 0}/
                          {selectedSubmission?.total_cases || 0}
                        </div>
                      )}
                    </div>
                    <div className={styles.summaryLabel}>Test Cases Passes</div>
                  </div>

                  <div className={styles.summaryRight}>
                    <div
                      className={styles.statusChip}
                      style={{
                        color: statusTone.fg,
                        border: `1px solid ${statusTone.border}`,
                        background: statusTone.bg,
                      }}
                    >
                      {(submitting || selectedSubmission?.isPending) && (
                        <span
                          className={styles.statusDot}
                          style={{
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
                        selectedTestCases.map((tc, index) => {
                          const accepted = (tc.status ?? "").toLowerCase().includes("accepted");
                          const wrong = (tc.status ?? "").toLowerCase().includes("wrong");

                          return (
                            <button
                              key={`${tc.title}-${index}`}
                              type="button"
                              className={`${styles.testCaseItem} ${
                                index === selectedTestCaseIndex ? styles.testCaseItemActive : ""
                              }`}
                              onClick={() => setSelectedTestCaseIndex(index)}
                            >
                              <span>{tc.title}</span>
                              {accepted ? (
                                <span className={styles.passMark}>✓</span>
                              ) : wrong ? (
                                <span className={styles.failMark}>✕</span>
                              ) : null}
                            </button>
                          );
                        })
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
                                <span className={styles.inlineLoading}>
                                  <Loader2 size={14} className={styles.spin} />
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
            ) : (
              <div className={styles.scrollArea}>
                <div className={styles.questionMeta}>
                  <h1 className={styles.questionHeading}>AI Help</h1>
                  <div className={styles.limitText}>
                    Ask the AI for hints based on your current editor code.
                  </div>
                </div>

                <section className={styles.sectionBlock}>
                  <h3 className={styles.sectionTitle}>Review your code</h3>
                  <div className={styles.aiIntro}>
                    The AI uses the code in your editor and the current question to give short, useful hints.
                  </div>

                  <div className={styles.aiActionRow}>
                    <button
                      type="button"
                      className={styles.aiButton}
                      onClick={() => runAiHelp("hints")}
                      disabled={aiLoading}
                    >
                      {aiLoading && aiMode === "hints" ? (
                        <Loader2 size={16} className={styles.spin} />
                      ) : (
                        <Lightbulb size={16} />
                      )}
                      Get hints
                    </button>

                    <button
                      type="button"
                      className={styles.aiButtonSecondary}
                      onClick={() => runAiHelp("lines")}
                      disabled={aiLoading}
                    >
                      {aiLoading && aiMode === "lines" ? (
                        <Loader2 size={16} className={styles.spin} />
                      ) : (
                        <ListChecks size={16} />
                      )}
                      Scan lines
                    </button>
                  </div>

                  {aiLastRun ? (
                    <div className={styles.aiMeta}>Last checked at {aiLastRun}</div>
                  ) : null}

                  {aiError ? <div className={styles.aiError}>{aiError}</div> : null}

                  {aiLoading ? <div className={styles.aiLoading}>Thinking...</div> : null}

                  {aiMode === "hints" ? (
                    <div className={styles.aiList}>
                      {aiHints.length > 0 ? (
                        aiHints.map((hint, index) => (
                          <div key={`${hint}-${index}`} className={styles.aiItem}>
                            <span className={styles.aiItemIndex}>{index + 1}</span>
                            <span className={styles.aiItemText}>{hint}</span>
                          </div>
                        ))
                      ) : (
                        <div className={styles.aiEmpty}>
                          No hints yet. Click “Get hints” to analyze your current code.
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className={styles.aiList}>
                      {aiIssues.length > 0 ? (
                        aiIssues.map((item, index) => (
                          <div key={`${item.line}-${index}`} className={styles.aiItem}>
                            <span className={styles.aiItemIndex}>L{item.line || index + 1}</span>
                            <span className={styles.aiItemText}>{item.issue}</span>
                          </div>
                        ))
                      ) : (
                        <div className={styles.aiEmpty}>
                          No line issues yet. Click “Scan lines” to review the code.
                        </div>
                      )}
                    </div>
                  )}
                </section>

                <section className={styles.sectionBlock}>
                  <h3 className={styles.sectionTitle}>Current question</h3>
                  <div className={styles.aiQuestionCard}>
                    <div className={styles.aiQuestionName}>{question.title}</div>
                    <div className={styles.aiQuestionDesc}>
                      {question.description || "No question loaded yet."}
                    </div>
                  </div>
                </section>
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
                  fontSize: 15,
                  fontFamily: "'JetBrains Mono', monospace",
                  lineHeight: 24,
                  letterSpacing: 0.4,
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
              {modalLoading ? (
                <div className={styles.loadingState}>Loading submission...</div>
              ) : (
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
                    fontFamily: "'JetBrains Mono', monospace",
                    lineHeight: 22,
                    lineNumbers: "on",
                    wordWrap: "on",
                  }}
                />
              )}
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