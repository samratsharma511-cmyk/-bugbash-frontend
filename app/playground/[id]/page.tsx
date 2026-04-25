"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { useParams } from "next/navigation";
import {
  ChevronLeft,
  PencilLine,
  Play,
  Save,
  Settings,
  RotateCcw,
  X,
} from "lucide-react";

import styles from "./playground.module.css";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

type PlaygroundRecord = {
  id: number;
  user_id: number | null;
  title: string;
  language: string;
  code: string;
  stdin: string;
  last_output?: string | null;
  last_error?: string | null;
  is_public: boolean;
};

type ActiveTab = "input" | "output" | "error";

type LanguageOption = {
  label: string;
  value: string;
};

const LANGUAGE_OPTIONS: LanguageOption[] = [
  { label: "Python (3.11.4)", value: "python" },
  { label: "JavaScript (Node.js)", value: "javascript" },
  { label: "TypeScript", value: "typescript" },
  { label: "C", value: "c" },
  { label: "C++", value: "cpp" },
];

const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ??
  "http://127.0.0.1:8000";

const DEFAULT_CODE = `print("Hello from Newton School! 👋")`;

function sanitizeText(value?: string | null) {
  if (value === null || value === undefined) return "";
  if (value === "string") return "";
  return value;
}

function sanitizeLanguage(value?: string | null) {
  const next = value ?? "python";
  return LANGUAGE_OPTIONS.some((option) => option.value === next)
    ? next
    : "python";
}

export default function PlaygroundPage() {
  const params = useParams<{ id: string }>();
  const playgroundId = useMemo(() => {
    const raw = params?.id;
    return Array.isArray(raw) ? raw[0] : raw;
  }, [params]);

  const wrapperRef = useRef<HTMLDivElement | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [running, setRunning] = useState(false);

  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  const [activeTab, setActiveTab] = useState<ActiveTab>("input");

  const [title, setTitle] = useState("Untitled Playground");
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(DEFAULT_CODE);
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [isPublic, setIsPublic] = useState(true);

  const [settingsTitle, setSettingsTitle] = useState("Untitled Playground");
  const [settingsLocked, setSettingsLocked] = useState(false);

  const selectedLanguage =
    LANGUAGE_OPTIONS.find((item) => item.value === language) ??
    LANGUAGE_OPTIONS[0];

  useEffect(() => {
    if (!playgroundId) return;

    let alive = true;

    const load = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${API_BASE}/playgrounds/${playgroundId}`);
        if (!response.ok) throw new Error("Failed to load playground");

        const data: PlaygroundRecord = await response.json();
        if (!alive) return;

        const nextTitle = sanitizeText(data.title) || "Untitled Playground";
        const nextLanguage = sanitizeLanguage(data.language);
        const nextCode = sanitizeText(data.code);
        const nextStdin = sanitizeText(data.stdin);

        setTitle(nextTitle);
        setLanguage(nextLanguage);
        setCode(nextCode || DEFAULT_CODE);
        setStdin(nextStdin);
        setOutput(sanitizeText(data.last_output));
        setError(sanitizeText(data.last_error));
        setIsPublic(Boolean(data.is_public));

        setSettingsTitle(nextTitle);
        setSettingsLocked(!Boolean(data.is_public));
      } catch {
        if (!alive) return;
        setError("Could not load playground.");
        setActiveTab("error");
      } finally {
        if (alive) setLoading(false);
      }
    };

    load();

    return () => {
      alive = false;
    };
  }, [playgroundId]);

  useEffect(() => {
    const onMouseDown = (event: MouseEvent) => {
      if (!wrapperRef.current) return;
      if (!wrapperRef.current.contains(event.target as Node)) {
        setShowLanguageMenu(false);
      }
    };

    document.addEventListener("mousedown", onMouseDown);
    return () => document.removeEventListener("mousedown", onMouseDown);
  }, []);

  const applySaveResponse = (data: PlaygroundRecord) => {
    const nextTitle = sanitizeText(data.title) || title;
    const nextLanguage = sanitizeLanguage(data.language);
    const nextCode = sanitizeText(data.code);
    const nextStdin = sanitizeText(data.stdin);

    setTitle(nextTitle);
    setLanguage(nextLanguage);
    setCode(nextCode || DEFAULT_CODE);
    setStdin(nextStdin);
    setOutput(sanitizeText(data.last_output));
    setError(sanitizeText(data.last_error));
    setIsPublic(Boolean(data.is_public));
    setSettingsTitle(nextTitle);
    setSettingsLocked(!Boolean(data.is_public));
  };

  const applyRunResponse = (data: PlaygroundRecord) => {
    setOutput(sanitizeText(data.last_output));
    setError(sanitizeText(data.last_error));

    if (sanitizeText(data.last_error)) {
      setActiveTab("error");
    } else {
      setActiveTab("output");
    }
  };

  const handleRun = async () => {
    if (!playgroundId) return;

    setRunning(true);
    setError("");
    setOutput("");
    setActiveTab("output");

    try {
      const response = await fetch(`${API_BASE}/playgrounds/${playgroundId}/run`, {
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

      applyRunResponse(data);
    } catch (err) {
      setOutput("");
      setError(err instanceof Error ? err.message : "Run failed");
      setActiveTab("error");
    } finally {
      setRunning(false);
    }
  };

  const handleSave = async () => {
    if (!playgroundId) return;

    setSaving(true);
    try {
      const response = await fetch(`${API_BASE}/playgrounds/${playgroundId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title,
          language,
          code,
          stdin,
          is_public: isPublic,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.detail ?? "Save failed");
      }

      applySaveResponse(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setActiveTab("error");
    } finally {
      setSaving(false);
    }
  };

  const handleSettingsSave = async () => {
    if (!playgroundId) return;

    setSaving(true);
    try {
      const response = await fetch(`${API_BASE}/playgrounds/${playgroundId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: settingsTitle,
          is_public: !settingsLocked,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data?.detail ?? "Update failed");
      }

      applySaveResponse(data);
      setShowSettings(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Update failed");
      setActiveTab("error");
    } finally {
      setSaving(false);
    }
  };

  const handleLanguageSelect = (value: string) => {
    setLanguage(value);
    setShowLanguageMenu(false);
  };

  return (
    <div className={styles.page} ref={wrapperRef}>
      <div className={styles.shell}>
        <header className={styles.topBar}>
          <div className={styles.leftCluster}>
            <Link href="/" className={styles.backLink}>
              <ChevronLeft size={18} />
              <span>Back</span>
            </Link>

            <span className={styles.divider} />

            <div className={styles.titleCluster}>
              <input
                className={styles.titleInput}
                value={title}
                onChange={(e) => {
                  setTitle(e.target.value);
                  setSettingsTitle(e.target.value);
                }}
                aria-label="Playground title"
              />
              <button
                type="button"
                className={styles.iconButton}
                onClick={() => {
                  setSettingsTitle(title);
                  setSettingsLocked(!isPublic);
                  setShowSettings(true);
                }}
                aria-label="Edit title"
              >
                <PencilLine size={16} />
              </button>
            </div>
          </div>

          <div className={styles.rightCluster}>
            <div className={styles.avatar} aria-hidden="true">
              A
            </div>

            <button
              type="button"
              className={styles.iconButton}
              onClick={() => {
                setSettingsTitle(title);
                setSettingsLocked(!isPublic);
                setShowSettings(true);
              }}
              aria-label="Open settings"
            >
              <Settings size={16} />
            </button>

            <button
              type="button"
              className={styles.runButton}
              onClick={handleRun}
              disabled={running || loading}
            >
              <Play size={16} />
              <span>{running ? "Running" : "Run"}</span>
            </button>

            <button
              type="button"
              className={styles.saveButton}
              onClick={handleSave}
              disabled={saving || loading}
            >
              <Save size={16} />
              <span>{saving ? "Saving" : "Save"}</span>
            </button>
          </div>
        </header>

        <section className={styles.editorCard}>
          <div className={styles.editorHeader}>
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
                  <input
                    className={styles.languageSearch}
                    placeholder="Search language"
                    onChange={() => undefined}
                  />

                  <div className={styles.languageList}>
                    {LANGUAGE_OPTIONS.map((option) => (
                      <button
                        key={option.value}
                        type="button"
                        className={styles.languageItem}
                        onClick={() => handleLanguageSelect(option.value)}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              className={styles.resetButton}
              onClick={() => window.location.reload()}
              aria-label="Reload playground"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          <div className={styles.editorArea}>
            {loading ? (
              <div className={styles.loadingState}>Loading playground...</div>
            ) : (
              <MonacoEditor
                key={playgroundId}
                height="100%"
                width="100%"
                theme="vs-dark"
                language={language}
                value={code}
                onChange={(value) => setCode(value ?? "")}
                options={{
                  readOnly: false,
                  domReadOnly: false,
                  automaticLayout: true,
                  minimap: { enabled: false },
                  scrollBeyondLastLine: false,
                  fontSize: 15,
                  lineNumbers: "on",
                  wordWrap: "on",
                }}
              />
            )}
          </div>
        </section>

        <section className={styles.bottomPanel}>
          <div className={styles.tabRow}>
            <button
              type="button"
              className={`${styles.tab} ${activeTab === "input" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("input")}
            >
              INPUT
            </button>
            <button
              type="button"
              className={`${styles.tab} ${activeTab === "output" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("output")}
            >
              OUTPUT
            </button>
            <button
              type="button"
              className={`${styles.tab} ${activeTab === "error" ? styles.activeTab : ""}`}
              onClick={() => setActiveTab("error")}
            >
              ERROR
            </button>
          </div>

          <div className={styles.panelBody}>
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
              <pre className={styles.outputBox}>
                {output || "Run code to see output."}
              </pre>
            )}

            {activeTab === "error" && (
              <pre className={styles.errorBox}>
                {error || "No runtime error."}
              </pre>
            )}
          </div>
        </section>
      </div>

      {showSettings && (
        <div
          className={styles.modalBackdrop}
          onClick={() => setShowSettings(false)}
        >
          <div
            className={styles.modal}
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-label="Update playground"
          >
            <div className={styles.modalHeader}>
              <h2>Update Playground</h2>
              <button
                type="button"
                className={styles.iconButton}
                onClick={() => setShowSettings(false)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Title*</span>
              <input
                className={styles.fieldInput}
                value={settingsTitle}
                onChange={(e) => setSettingsTitle(e.target.value)}
                placeholder="Untitled Playground"
              />
            </label>

            <label className={styles.checkboxRow}>
              <input
                type="checkbox"
                checked={settingsLocked}
                onChange={(e) => setSettingsLocked(e.target.checked)}
              />
              <span>Lock playground for later user-only access</span>
            </label>

            <div className={styles.modalActions}>
              <button
                type="button"
                className={styles.secondaryButton}
                onClick={() => setShowSettings(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className={styles.primaryButton}
                onClick={handleSettingsSave}
                disabled={saving}
              >
                {saving ? "Saving..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}