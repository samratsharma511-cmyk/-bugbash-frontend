"use client";

import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import styles from "./styles.module.css";

import AIMessage from "@/app/components/AIMessage";
import CodeBlock from "@/app/components/CodeBlock";

import { useVoice } from "@/app/hooks/useVoice";
import { speak } from "@/app/hooks/useSpeech";

import {
  Captions,
  Code2,
  Loader2,
  Mic,
  MicOff,
  MonitorUp,
  MoreVertical,
  PhoneOff,
  Play,
  Send,
  Square,
  TerminalSquare,
  VideoOff,
  X,
} from "lucide-react";

type ChatItem = {
  role: "user" | "ai";
  content: any;
};

const API_BASE =
  process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") ?? "http://127.0.0.1:8000";

export default function SessionPage() {
  const params = useParams();
  const sessionId = params.id as string;

  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<ChatItem[]>([]);
  const [loading, setLoading] = useState(false);

  const [isMinimized, setIsMinimized] = useState(false);
  const [showPlayground, setShowPlayground] = useState(false);

  const [chatPos, setChatPos] = useState({ x: 40, y: 200 });

  const [editorCode, setEditorCode] = useState(`print("Hello, AlgoVerse!")`);
  const [stdinValue, setStdinValue] = useState("");
  const [language, setLanguage] = useState("python");

  const [runOutput, setRunOutput] = useState("");
  const [runError, setRunError] = useState("");
  const [runningCode, setRunningCode] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [playgroundId, setPlaygroundId] = useState<number | null>(null);
  const [questionId, setQuestionId] = useState<number | null>(null);
  const [question, setQuestion] = useState<any>(null);

  const userId = 1;

  const dragRef = useRef({
    dragging: false,
    offsetX: 0,
    offsetY: 0,
  });

  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await fetch(`${API_BASE}/questions`);
        const data = await res.json();

        if (Array.isArray(data) && data.length > 0) {
          const q = data[0];
          setQuestion(q);
          setQuestionId(q.id);
        }
      } catch {
        // keep silent for hackathon demo
      }
    };

    fetchQuestion();
  }, []);

  useEffect(() => {
    const stored = sessionStorage.getItem("initial_message");
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      setMessages([{ role: "ai", content: parsed }]);
      sessionStorage.removeItem("initial_message");
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!dragRef.current.dragging) return;

      setChatPos({
        x: e.clientX - dragRef.current.offsetX,
        y: e.clientY - dragRef.current.offsetY,
      });
    };

    const stop = () => {
      dragRef.current.dragging = false;
    };

    window.addEventListener("mousemove", move);
    window.addEventListener("mouseup", stop);

    return () => {
      window.removeEventListener("mousemove", move);
      window.removeEventListener("mouseup", stop);
    };
  }, []);

  const createPlayground = async (code?: string) => {
    try {
      const res = await fetch(`${API_BASE}/playgrounds/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Session Playground",
          language,
          code: code ?? editorCode ?? "",
          stdin: stdinValue ?? "",
          user_id: userId,
          is_public: true,
        }),
      });

      if (!res.ok) throw new Error("Failed to create playground");

      return await res.json();
    } catch {
      return null;
    }
  };

  const openPlayground = async (code?: string) => {
    setShowPlayground(true);

    if (playgroundId) return;

    const pg = await createPlayground(code || editorCode);
    if (pg) {
      setPlaygroundId(pg.id);
      if (pg.code) setEditorCode(pg.code);
    }
  };

  const closePlayground = () => {
    setShowPlayground(false);
  };

  const sendMessage = async (customMessage?: string) => {
    const finalMessage = (customMessage || message).trim();
    if (!finalMessage) return;

    setMessages((prev) => [...prev, { role: "user", content: finalMessage }]);
    setMessage("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/meet/chat/${sessionId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: finalMessage,
          system_prompt: `
You are a friendly DSA tutor.
Talk like a real teacher.

Flow:
- Start with casual tone
- Guide student step by step
- Ask level if needed
- Give hints before answers
- Encourage learning

Keep responses clean and helpful.
          `,
        }),
      });

      let data: any = null;

      try {
        data = await res.json();
      } catch {
        data = null;
      }

      let reply: any;

      if (!data) {
        reply = {
          type: "explanation",
          explanation: "Something went wrong. Try again.",
        };
      } else if (typeof data === "string") {
        reply = {
          type: "explanation",
          explanation: data,
        };
      } else if (data.explanation || data.type) {
        reply = data;
      } else {
        reply = {
          type: "explanation",
          explanation: JSON.stringify(data),
        };
      }

      if (data?.playground) {
        setShowPlayground(true);
      }

      setMessages((prev) => [...prev, { role: "ai", content: reply }]);

      const text = typeof reply === "string" ? reply : reply?.explanation || "";
      if (text) {
        setAiSpeaking(true);
        await speak(text);
        setTimeout(() => setAiSpeaking(false), 2500);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: {
            type: "explanation",
            explanation: "Network error. Try again.",
          },
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const runCode = async () => {
    setRunningCode(true);
    setRunError("");
    setRunOutput("");

    try {
      const res = await fetch(`${API_BASE}/run_code`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code: editorCode,
          stdin: stdinValue,
          language,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setRunError(data?.error || "Failed to run code");
        setRunOutput("");
        return;
      }

      setRunOutput((data?.output || "").toString());
      setRunError((data?.error || "").toString());
    } catch {
      setRunError("Failed to run code");
      setRunOutput("");
    } finally {
      setRunningCode(false);
    }
  };

  const submitCode = async () => {
    if (!questionId) {
      setRunError("No question selected for submission.");
      return;
    }

    setSubmitting(true);
    setRunError("");

    try {
      const token = localStorage.getItem("access_token");

      const res = await fetch(`${API_BASE}/submit`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        body: JSON.stringify({
          question_id: questionId,
          code: editorCode,
          language,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.detail || "Submission failed");
      }

      setMessages((prev) => [
        ...prev,
        {
          role: "user",
          content: {
            type: "code_submission",
            code: editorCode.trim(),
          },
        },
        {
          role: "ai",
          content: {
            type: "submission_feedback",
            status: data?.submission?.status || "Submitted",
            explanation: `Submission complete. Passed ${data?.submission?.total_passed ?? 0}/${data?.submission?.total_cases ?? 0} testcases.`,
            code: editorCode,
          },
        },
      ]);
    } catch (err: any) {
      setRunError(err?.message || "Submission failed");
    } finally {
      setSubmitting(false);
    }
  };

  const { start, stop, listening } = useVoice((text) => {
    const lower = text.toLowerCase();

    if (lower.includes("open playground")) {
      setShowPlayground(true);
      return;
    }

    if (lower.includes("close playground")) {
      setShowPlayground(false);
      return;
    }

    sendMessage(text);
  });

  const endSession = () => {
    stop();
    setShowPlayground(false);
    setIsMinimized(false);
  };

  return (
    <div className={styles.page}>
      <div className={styles.workArea}>
        {showPlayground ? (
          <div className={styles.playgroundShell}>
            <div className={styles.playgroundTop}>
              <div>
                <div className={styles.playgroundTitleRow}>
                  <Code2 size={18} />
                  <h2 className={styles.playgroundTitle}>Playground</h2>
                </div>
                <p className={styles.playgroundSub}>
                  Write code, run it with custom input, and submit when ready.
                </p>
              </div>

              <div className={styles.playgroundTopActions}>
                <button className={styles.ghostButton} onClick={closePlayground}>
                  <X size={16} />
                  Close
                </button>
              </div>
            </div>

            <div className={styles.playgroundBody}>
              <section className={styles.editorCard}>
                <div className={styles.editorToolbar}>
                  <div className={styles.toolbarLeft}>
                    <TerminalSquare size={16} />
                    <span>Editor</span>
                  </div>

                  <div className={styles.toolbarRight}>
                    <select
                      className={styles.select}
                      value={language}
                      onChange={(e) => setLanguage(e.target.value)}
                    >
                      <option value="python">Python</option>
                      <option value="javascript">JavaScript</option>
                      <option value="cpp">C++</option>
                      <option value="java">Java</option>
                    </select>

                    <button className={styles.secondaryButton} onClick={runCode} disabled={runningCode}>
                      {runningCode ? <Loader2 size={16} className={styles.spin} /> : <Play size={16} />}
                      {runningCode ? "Running..." : "Run"}
                    </button>

                    <button className={styles.primaryButton} onClick={submitCode} disabled={submitting}>
                      {submitting ? <Loader2 size={16} className={styles.spin} /> : <Send size={16} />}
                      {submitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </div>

                <textarea
                  className={styles.editor}
                  value={editorCode}
                  onChange={(e) => setEditorCode(e.target.value)}
                  spellCheck={false}
                  placeholder="Write your solution here..."
                />

                <div className={styles.inputBlock}>
                  <div className={styles.inputBlockHead}>Custom input</div>
                  <textarea
                    className={styles.stdin}
                    value={stdinValue}
                    onChange={(e) => setStdinValue(e.target.value)}
                    placeholder="Input for run code..."
                  />
                </div>
              </section>

              <aside className={styles.runtimeColumn}>
                <div className={styles.questionCard}>
                  <div className={styles.cardHeading}>Question</div>
                  <div className={styles.questionTitle}>
                    {question?.title || "No question loaded"}
                  </div>
                  <div className={styles.questionDifficulty}>
                    {question?.difficulty || "easy"}
                  </div>
                  <div className={styles.questionText}>
                    {question?.description || "The AI tutor will generate the problem flow in session."}
                  </div>
                </div>

                <div className={styles.outputCard}>
                  <div className={styles.cardHeading}>Output</div>
                  <div className={styles.outputBox}>
                    {runError ? (
                      <div className={styles.errorText}>{runError}</div>
                    ) : runOutput ? (
                      <pre className={styles.pre}>{runOutput}</pre>
                    ) : (
                      <div className={styles.emptyOutput}>
                        Run your code to see output here.
                      </div>
                    )}
                  </div>
                </div>

                <div className={styles.outputCard}>
                  <div className={styles.cardHeading}>Session notes</div>
                  <div className={styles.sessionNotes}>
                    <div className={styles.noteRow}>
                      <span>Session ID</span>
                      <strong>{sessionId}</strong>
                    </div>
                    <div className={styles.noteRow}>
                      <span>Playground ID</span>
                      <strong>{playgroundId ?? "Not created yet"}</strong>
                    </div>
                    <div className={styles.noteRow}>
                      <span>Mic</span>
                      <strong>{listening ? "On" : "Off"}</strong>
                    </div>
                    <div className={styles.noteRow}>
                      <span>AI</span>
                      <strong>{aiSpeaking ? "Speaking" : "Idle"}</strong>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        ) : (
          <div className={styles.meetScreen}>
            <div className={styles.meetHeader}>
              <div className={styles.sessionBadge}>Session live</div>

              <div className={styles.memberBadge}>
                <div className={styles.memberAvatar}>1</div>
                <span>1</span>
              </div>
            </div>

            <div className={styles.stage}>
              <div
                className={`${styles.stageOrb} ${
                  listening || aiSpeaking ? styles.stageOrbActive : ""
                }`}
              >
                <div className={styles.stageAvatar}>A</div>
              </div>

              <div className={styles.stageName}>Ayush</div>
            </div>

            <div className={styles.bottomDock}>
              <div className={styles.leftMeta}>
                <span className={styles.sessionCode}>kex-xhqf-exq</span>
                <span className={styles.statusText}>
                  {aiSpeaking ? "Tutor speaking..." : listening ? "Listening..." : "Ready"}
                </span>
              </div>

              <div className={styles.controls}>
                <button
                  onClick={listening ? stop : start}
                  className={`${styles.controlButton} ${
                    listening ? styles.controlButtonLive : ""
                  }`}
                  aria-label={listening ? "Stop microphone" : "Start microphone"}
                >
                  {listening ? <MicOff size={20} /> : <Mic size={20} />}
                </button>

                <button className={styles.controlButton} aria-label="Camera off">
                  <VideoOff size={20} />
                </button>

                <button className={styles.controlButton} aria-label="Captions">
                  <Captions size={20} />
                </button>

                <button className={styles.controlButton} aria-label="Present">
                  <MonitorUp size={20} />
                </button>

                <button className={styles.controlButton} aria-label="More options">
                  <MoreVertical size={20} />
                </button>

                <button
                  className={styles.endSessionButton}
                  onClick={endSession}
                  aria-label="End session"
                >
                  <PhoneOff size={18} />
                  <span>End session</span>
                </button>
              </div>

              <button
                className={styles.playgroundButton}
                onClick={() => openPlayground()}
              >
                Open playground
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        className={`${styles.container} ${isMinimized ? styles.minimized : ""}`}
        style={
          isMinimized
            ? {
                position: "fixed",
                left: chatPos.x,
                top: chatPos.y,
                width: 340,
                height: 420,
                zIndex: 9999,
              }
            : {
                width: "360px",
                minWidth: 320,
              }
        }
      >
        <div
          className={styles.header}
          style={{
            cursor: isMinimized ? "grab" : "default",
            display: "flex",
            justifyContent: "space-between",
          }}
          onMouseDown={(e) => {
            if (!isMinimized) return;

            dragRef.current.dragging = true;
            dragRef.current.offsetX = e.clientX - chatPos.x;
            dragRef.current.offsetY = e.clientY - chatPos.y;
          }}
        >
          <span>
            DSA Tutor Chat
            {question && (
              <div style={{ fontSize: 12, color: "#aaa" }}>
                {question.title}
              </div>
            )}
          </span>

          {isMinimized && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsMinimized(false);
                setShowPlayground(false);
              }}
              className={styles.restoreBtn}
            >
              Expand
            </button>
          )}
        </div>

        <div className={styles.chatArea}>
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`${styles.messageRow} ${
                msg.role === "user" ? styles.userRow : styles.aiRow
              }`}
            >
              <div
                className={`${styles.messageBubble} ${
                  msg.role === "user" ? styles.userBubble : styles.aiBubble
                }`}
              >
                {msg.role === "user" ? (
                  typeof msg.content === "string" ? (
                    <p>{msg.content}</p>
                  ) : msg.content?.type === "code_submission" ? (
                    <CodeBlock
                      code={msg.content.code}
                      onOpenPlayground={async (code) => {
                        setIsMinimized(true);
                        setShowPlayground(true);

                        const pg = await createPlayground(code);
                        if (pg) {
                          setPlaygroundId(pg.id);
                          setEditorCode(pg.code || code || editorCode);
                        }
                      }}
                    />
                  ) : null
                ) : (
                  <AIMessage
                    ai={msg.content}
                    sendMessage={sendMessage}
                    loading={loading}
                    onOpenPlayground={async (code?: string) => {
                      setIsMinimized(true);
                      setShowPlayground(true);

                      const pg = await createPlayground(code);
                      if (pg) {
                        setPlaygroundId(pg.id);
                        setEditorCode(pg.code || code || editorCode);
                      }
                    }}
                  />
                )}
              </div>
            </div>
          ))}

          {loading && <div className={styles.loading}>Thinking...</div>}
          <div ref={bottomRef} />
        </div>

        <div className={styles.inputArea}>
          <input
            className={styles.input}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            placeholder="Ask a DSA question..."
          />

          <button className={styles.button} onClick={() => sendMessage()}>
            Send
          </button>

          <button
            onClick={listening ? stop : start}
            className={styles.voiceButton}
            style={{
              background: listening ? "#ef4444" : "#22c55e",
            }}
          >
            {listening ? "Stop" : "Speak"}
          </button>
        </div>
      </div>
    </div>
  );
}