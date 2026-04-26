"use client";

import { useState, useRef, useEffect } from "react";
import { useParams } from "next/navigation";
import styles from "./styles.module.css";

import AIMessage from "@/app/components/AIMessage";
import Playground from "@/app/components/Playground";
import CodeBlock from "@/app/components/CodeBlock";

import { useVoice } from "@/app/hooks/useVoice";
import { speak } from "@/app/hooks/useSpeech";

import {
  Mic,
  MicOff,
  VideoOff,
  Captions,
  MonitorUp,
  MoreVertical,
  PhoneOff,
} from "lucide-react";

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
      } catch {}
    };

    fetchQuestion();
  }, []);

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

      if (!res.ok) throw new Error();

      return await res.json();
    } catch {
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
    } catch {}
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

        const data = await res.json();
        reply = data;
      }

      setMessages((prev) => [
        ...prev,
        { role: "ai", content: reply },
      ]);

      const text =
        typeof reply === "string"
          ? reply
          : reply?.explanation || "";

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
            explanation: "Something went wrong. Try again.",
          },
        },
      ]);
    }

    setLoading(false);
  };

  const { start, stop, listening } = useVoice((text) => {
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

              setMessages((prev) => [
                ...prev,
                {
                  role: "user",
                  content: { type: "code_submission", code },
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
      </div>

      <div className={styles.container}>
        <div className={styles.header}>DSA Tutor Chat</div>

        <div className={styles.chatArea}>
          {messages.map((msg, index) => (
            <div key={index} className={styles.messageRow}>
              <div className={styles.messageBubble}>
                {msg.role === "user" ? (
                  <p>{msg.content}</p>
                ) : (
                  <AIMessage
                    ai={msg.content}
                    sendMessage={sendMessage}
                    loading={loading}
                    onOpenPlayground={async (code?: string) => {
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
          <div ref={bottomRef} />
        </div>

        <div className={styles.inputArea}>
          <input
            className={styles.input}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button onClick={() => sendMessage()}>Send</button>

          <button onClick={listening ? stop : start}>
            {listening ? <MicOff size={18} /> : <Mic size={18} />}
          </button>
        </div>
      </div>
    </div>
  );
}