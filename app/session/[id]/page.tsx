"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import styles from "./styles.module.css";

import AIMessage from "@/app/components/AIMessage";
import Playground from "@/app/components/Playground";
import CodeBlock from "@/app/components/CodeBlock";

import { useVoice } from "@/app/hooks/useVoice";
import { speak } from "@/app/hooks/useSpeech";





export default function SessionPage() {
  const params = useParams();
  const sessionId = params.id as string;

  const [aiSpeaking, setAiSpeaking] = useState(false);
  const [callMode, setCallMode] = useState(false);

  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const [tutorStage, setTutorStage] = useState("intro");

  const [studentProfile, setStudentProfile] = useState({
    mood: "",
    topic: "",
    level: "",
  });

  const [isMinimized, setIsMinimized] = useState(false);
  const [showPlayground, setShowPlayground] = useState(false);

  const [chatPos, setChatPos] = useState({ x: 40, y: 200 });

  const [editorCode, setEditorCode] = useState("");
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

  // ✅ Fetch question
  useEffect(() => {
    const fetchQuestion = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/questions`);
        const data = await res.json();

        if (data.length > 0) {
          const q = data[0];
          setQuestion(q);
          setQuestionId(q.id);
        }
      } catch (err) {
        console.error("Question fetch error:", err);
      }
    };

    fetchQuestion();
  }, []);

  // ✅ Create playground
  const createPlayground = async (code?: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/playgrounds/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: "Session Playground",
          language: "python",
          code: code || "",
          stdin: "",
          user_id: userId,
          is_public: true,
        }),
      });

      if (!res.ok) throw new Error("Playground creation failed");

      return await res.json();
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  useEffect(() => {
    const stored = sessionStorage.getItem("initial_message");
    if (!stored) return;

    try {
      const parsed = JSON.parse(stored);
      setMessages([{ role: "ai", content: parsed }]); 
      sessionStorage.removeItem("initial_message");
    } catch (err) {
      console.error("Initial message parse error:", err);
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

  const sendMessage = async (customMessage?: string) => {
  const finalMessage = (customMessage || message).trim();
  if (!finalMessage) return;

  const input = finalMessage.toLowerCase();

  setMessages((prev) => [
    ...prev,
    { role: "user", content: finalMessage },
  ]);

  setMessage("");
  setLoading(true);

  let reply: any = "";

  try {
    if (tutorStage === "intro") {
      setStudentProfile((p) => ({ ...p, mood: input }));

      reply = input.includes("good")
        ? "Nice to hear that. I'm doing great too."
        : "I hope your day gets better. I'm here to help you.";

      reply += "\n\nWhat would you like to study today?";
      setTutorStage("topic");
    }

    else if (tutorStage === "topic") {
      setStudentProfile((p) => ({ ...p, topic: input }));

      reply = `Great choice. ${input} is an important topic.\n\nWhat's your level? (beginner / medium / advanced)`;
      setTutorStage("level");
    }

    else if (tutorStage === "level") {
      setStudentProfile((p) => ({ ...p, level: input }));

      reply = {
        type: "explanation",
        explanation: `Perfect. I'll give you a ${input} level problem.\n\nCoding Question:\nMerge two sorted arrays efficiently.`,
        code: "# write your solution here\n\ndef merge(a, b):\n    pass",
      };

      setTutorStage("question");
    }

    else {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/meet/chat/${sessionId}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: finalMessage }),
        }
      );

      if (!res.ok) throw new Error("Chat failed");

      const data = await res.json();
      reply = data;
    }

    setMessages((prev) => [
      ...prev,
      { role: "ai", content: reply },
    ]);

    if (typeof reply === "object" && reply?.explanation) {
      setAiSpeaking(true);
      await speak(reply.explanation);
      setTimeout(() => setAiSpeaking(false), 2500);
    }

    if (typeof reply === "string") {
      setAiSpeaking(true);
      await speak(reply);
      setTimeout(() => setAiSpeaking(false), 2500);
    }

  } catch (err) {
    console.error(err);

    setMessages((prev) => [
      ...prev,
      {
        role: "ai",
        content: {
          type: "explanation",
          explanation: "Something went wrong. Let's try again.",
        },
      },
    ]);
  }

  setLoading(false);
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
    setShowPlayground(false);
    setIsMinimized(false);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div style={{ flex: 1 }}>
        {showPlayground && questionId && (
          <Playground
            code={editorCode}
            playgroundId={playgroundId}
            questionId={questionId}
            questionText={question?.description}
            onCodeChange={(code) => setEditorCode(code)}
            onSubmitSuccess={({ code, explanation, status }) => {
              setShowPlayground(false);
              setIsMinimized(false);

              setMessages((prev) => [
                ...prev,
                {
                  role: "user",
                  content: {
                    type: "code_submission",
                    code: code.trim(),
                  },
                },
                {
                  role: "ai",
                  content: {
                    type: "submission_feedback",
                    status,
                    explanation,
                    code,
                  },
                },
              ]);

              speak(explanation);
            }}
          />
        )}

        {!showPlayground && (
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
                onClick={() => setShowPlayground(true)}
              >
                Open playground
              </button>
            </div>
          </div>
        )}
      </div>

      <div
        className={styles.container}
        style={
          isMinimized
            ? {
                position: "fixed",
                left: chatPos.x,
                top: chatPos.y,
                width: 340,
                height: 420,
                zIndex: 9999,
                borderRadius: 16,
                overflow: "hidden",
                background: "#111",
                boxShadow: "0 10px 30px rgba(0,0,0,0.6)",
              }
            : {
                width: "30%",
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
            >
              Expand
            </button>
          )}
        </div>

        {/* CHAT */}
        <div className={styles.chatArea}>
          {messages.map((msg, index) => (
            <div key={index} className={styles.messageRow}>
              <div className={styles.messageBubble}>
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
                          setEditorCode(pg.code);
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
                        setEditorCode(pg.code);
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

        {/* INPUT */}
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
            style={{
              marginLeft: 8,
              padding: "6px 10px",
              borderRadius: 6,
              background: listening ? "#ef4444" : "#22c55e",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            {listening ? "Stop" : "Speak"}
          </button>
        </div>
      </div>
    </div>
  );
}