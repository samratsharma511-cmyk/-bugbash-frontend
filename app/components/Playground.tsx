"use client";

import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import styles from "./playground.module.css";

import { useVoice } from "@/app/hooks/useVoice";
import { stopSpeaking } from "@/app/hooks/useSpeech";


const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

export default function Playground({
  code,
  playgroundId,
  questionId,
  questionText,
  onCodeChange,
  onSubmitSuccess,
}: {
  code?: string;
  playgroundId?: number | null;
  questionId?: number;
  questionText?: string;
  onCodeChange?: (code: string) => void;
  onSubmitSuccess?: (payload: {
    code: string;
    explanation: string;
    status: string;
  }) => void;
}) {
  const [editorCode, setEditorCode] = useState(code || `print("Hello World")`);
  const [output, setOutput] = useState("");
  const [error, setError] = useState("");
  const [stdin, setStdin] = useState("");
  const [activeTab, setActiveTab] = useState<"input" | "output" | "error">("input");
  const [language, setLanguage] = useState("python");
  const [running, setRunning] = useState(false);

  const [aiHints, setAiHints] = useState<string[]>([]);
  const [loadingHint, setLoadingHint] = useState(false);

  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (code !== undefined) {
      setEditorCode(code);
    }
  }, [code]);

  // ✅ LOAD SAVED CODE
  useEffect(() => {
    if (!questionId) return;

    const saved = localStorage.getItem(`code_${questionId}`);
    if (saved) {
      setEditorCode(saved);
    }
  }, [questionId]);

  const handleVoiceCommand = (text: string) => {
    const lower = text.toLowerCase();

    if (lower.includes("run")) {
      runCode();
      return;
    }

    if (lower.includes("submit")) {
      submitCode();
      return;
    }

    if (lower.includes("check")) {
      highlightErrors();
      return;
    }

    if (lower.includes("clear")) {
      setEditorCode("");
      return;
    }

    if (lower.includes("delete")) {
      setEditorCode((prev) => {
        const lines = prev.split("\n");
        lines.pop();
        return lines.join("\n");
      });
      return;
    }

    if (lower.includes("undo")) {
      setEditorCode((prev) => prev.split("\n").slice(0, -1).join("\n"));
      return;
    }

    const replaceMatch = lower.match(/replace line (\d+) with (.+)/);
    if (replaceMatch) {
      const lineNumber = parseInt(replaceMatch[1], 10) - 1;
      const newContent = replaceMatch[2];

      setEditorCode((prev) => {
        const lines = prev.split("\n");
        if (lines[lineNumber] !== undefined) {
          lines[lineNumber] = newContent;
        }
        return lines.join("\n");
      });
      return;
    }

    const insertMatch = lower.match(/insert (.+) at line (\d+)/);
    if (insertMatch) {
      const content = insertMatch[1];
      const lineNumber = parseInt(insertMatch[2], 10) - 1;

      setEditorCode((prev) => {
        const lines = prev.split("\n");
        lines.splice(lineNumber, 0, content);
        return lines.join("\n");
      });
      return;
    }

    setEditorCode((prev) => prev + "\n" + text);
  };

  const { start: startVoice, stop: stopVoice, listening } = useVoice(
    handleVoiceCommand
  );

  useEffect(() => {
    if (!editorCode) return;

    const timer = setTimeout(async () => {
      try {
        setLoadingHint(true);

        const res = await fetch("http://localhost:8000/analyze-code", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: editorCode,
            question_id: questionId,
          }),
        });

        const data = await res.json();
        setAiHints(data.hints || []);
      } catch {}

      setLoadingHint(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [editorCode]);

  const highlightErrors = async () => {
    try {
      const res = await fetch("http://localhost:8000/analyze-lines", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code: editorCode }),
      });

      const data = await res.json();
      console.log("LINE ISSUES:", data);
    } catch {}
  };

  const runCode = async () => {
    if (!playgroundId) return;

    setRunning(true);
    setOutput("");
    setError("");

    try {
      const res = await fetch(
        `http://127.0.0.1:9000/playgrounds/${playgroundId}/run`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: editorCode,
            stdin,
            language,
          }),
        }
      );

      const data = await res.json();

      if (data.last_error) {
        setError(data.last_error);
        setActiveTab("error");
      } else {
        setOutput(data.last_output || "");
        setActiveTab("output");
      }
    } catch {
      setError("Execution failed");
      setActiveTab("error");
    }

    setRunning(false);
  };

  const submitCode = async () => {
    if (!questionId) return;

    setSubmitting(true);

    try {
      const res = await fetch("http://127.0.0.1:9000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: editorCode,
          question_id: questionId,
          language,
          user_id: 1,
        }),
      });

      const data = await res.json();

      let explanation = "";
      let status = data.submission?.status || "Unknown";

      if (status === "Accepted") {
        const aiRes = await fetch("http://127.0.0.1:9000/analyze-solution", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            code: editorCode,
            question: questionText,
          }),
        });

        const aiData = await aiRes.json();
        explanation = aiData.analysis;
      } else {
        explanation =
          "Solution failed. Check edge cases, logic, and constraints carefully.";
      }

      localStorage.removeItem(`code_${questionId}`);

      onSubmitSuccess?.({
        code: editorCode,
        explanation,
        status,
      });

    } catch {
      onSubmitSuccess?.({
        code: editorCode,
        explanation: "Submission failed due to server error.",
        status: "Error",
      });
    }

    setSubmitting(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.shell}>

        <div className={styles.aiTutorBox}>
          <div className={styles.aiTitle}>AI Tutor</div>

          {loadingHint && <div className={styles.aiHint}>processing...</div>}

          {!loadingHint && aiHints.length === 0 && (
            <div className={styles.aiHint}>start typing to get hints</div>
          )}

          {aiHints.map((h, i) => (
            <div key={i} className={styles.aiHint}>
              - {h}
            </div>
          ))}
        </div>

        <div className={styles.topBar}>
          <span>Playground</span>

          <div style={{ display: "flex", gap: "10px" }}>
            <button className={styles.runButton} onClick={runCode}>
              {running ? "Running..." : "Run"}
            </button>

            <button className={styles.runButton} onClick={submitCode}>
              {submitting ? "Submitting..." : "Submit"}
            </button>

            <button
              onClick={listening ? stopVoice : startVoice}
              style={{
                padding: "6px 10px",
                borderRadius: 6,
                background: listening ? "#ef4444" : "#22c55e",
                color: "white",
                border: "none",
              }}
            >
              {listening ? "Stop Voice" : "Voice Code"}
            </button>
          </div>
        </div>

        <div className={styles.editorCard}>
          <div className={styles.editorArea}>
            <MonacoEditor
              height="100%"
              theme="vs-dark"
              language={language}
              value={editorCode}
              onChange={(v) => {
                const newCode = v || "";

                setEditorCode(newCode);
                onCodeChange?.(newCode);

                if (questionId) {
                  localStorage.setItem(`code_${questionId}`, newCode);
                }

                if (playgroundId) {
                  fetch(`http://127.0.0.1:9000/playgrounds/${playgroundId}`, {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ code: newCode }),
                  });
                }
              }}
            />
          </div>
        </div>

        <div className={styles.bottomPanel}>
          <div className={styles.tabRow}>
            <button className={`${styles.tab} ${activeTab === "input" ? styles.activeTab : ""}`} onClick={() => setActiveTab("input")}>INPUT</button>
            <button className={`${styles.tab} ${activeTab === "output" ? styles.activeTab : ""}`} onClick={() => setActiveTab("output")}>OUTPUT</button>
            <button className={`${styles.tab} ${activeTab === "error" ? styles.activeTab : ""}`} onClick={() => setActiveTab("error")}>ERROR</button>
          </div>

          <div className={styles.panelBody}>
            {activeTab === "input" && (
              <textarea className={styles.inputBox} value={stdin} onChange={(e) => setStdin(e.target.value)} />
            )}
            {activeTab === "output" && (
              <pre className={styles.outputBox}>{output || "Run code to see output"}</pre>
            )}
            {activeTab === "error" && (
              <pre className={styles.errorBox}>{error || "No errors"}</pre>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}