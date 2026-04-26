"use client";

import { useState } from "react";
import CodeBlock from "./CodeBlock";
import { speak } from "@/app/hooks/useSpeech";

export default function AIMessage({
  ai,
  sendMessage,
  loading,
  onOpenPlayground,
}: {
  ai: any;
  sendMessage?: (msg: string) => void;
  loading?: boolean;
  onOpenPlayground?: (code?: string) => void;
}) {
  const [copied, setCopied] = useState(false);

  if (!ai) return null;

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  if (ai.type === "explanation") {
    return (
      <div style={box}>
        <div style={title}>Explanation</div>

        <div style={text}>{ai.explanation}</div>

        <div style={actions}>
          <button onClick={() => speak(ai.explanation)}>Speak</button>

          {ai.code && (
            <button onClick={() => onOpenPlayground?.(ai.code)}>
              Open Playground
            </button>
          )}
        </div>
      </div>
    );
  }

  if (ai.type === "code") {
    return (
      <div style={box}>
        <div style={title}>Generated Code</div>

        <CodeBlock code={ai.code} />

        <div style={actions}>
          <button onClick={() => handleCopy(ai.code)}>
            {copied ? "Copied" : "Copy"}
          </button>

          <button onClick={() => onOpenPlayground?.(ai.code)}>
            Open Playground
          </button>
        </div>
      </div>
    );
  }

  if (ai.type === "submission_feedback") {
    return (
      <div style={box}>
        <div style={title}>Submission Result</div>

        <div
          style={{
            color: ai.status === "Accepted" ? "#22c55e" : "#ef4444",
            marginBottom: 8,
            fontWeight: 500,
          }}
        >
          {ai.status}
        </div>

        <div style={text}>{ai.explanation}</div>

        {ai.code && <CodeBlock code={ai.code} />}

        <div style={actions}>
          <button onClick={() => speak(ai.explanation)}>Explain</button>

          {ai.code && (
            <button onClick={() => onOpenPlayground?.(ai.code)}>
              Retry
            </button>
          )}
        </div>
      </div>
    );
  }

  if (typeof ai === "string") {
    return (
      <div style={box}>
        <div style={text}>{ai}</div>
      </div>
    );
  }

  return (
    <div style={box}>
      <pre style={{ whiteSpace: "pre-wrap", color: "#e2e8f0" }}>
        {JSON.stringify(ai, null, 2)}
      </pre>
    </div>
  );
}


const box: React.CSSProperties = {
  background: "#0f172a",
  borderRadius: 12,
  padding: 12,
  border: "1px solid #1e293b",
  marginTop: 6,
};

const title: React.CSSProperties = {
  fontSize: 13,
  color: "#38bdf8",
  marginBottom: 6,
  fontWeight: 500,
};

const text: React.CSSProperties = {
  fontSize: 14,
  lineHeight: 1.6,
  color: "#e2e8f0",
};

const actions: React.CSSProperties = {
  display: "flex",
  gap: 8,
  marginTop: 10,
};