"use client";

type Props = {
  ai: any;
  sendMessage: (msg: string) => void;
  loading: boolean;
  onOpenPlayground?: (code?: string) => void;
};

export default function AIMessage({
  ai,
  sendMessage,
  loading,
  onOpenPlayground,
}: Props) {
  if (ai === undefined || ai === null) return null;

  const isCodingQuestion = (text?: any) => {
    if (!text || typeof text !== "string") return false;

    const t = text.toLowerCase();

    return (
      t.includes("coding question") ||
      t.includes("problem") ||
      t.includes("write") ||
      t.includes("implement") ||
      t.includes("function") ||
      t.includes("return")
    );
  };

  const getStarterCode = () => {
    return `# start coding here

def solution():
    pass`;
  };

  if (typeof ai === "string" && ai.trim() !== "") {
    const showPlayground = isCodingQuestion(ai);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
          {ai}
        </p>

        {showPlayground && (
          <button
            onClick={() => onOpenPlayground?.(getStarterCode())}
            style={{
              background: "#22c55e",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: 6,
              cursor: "pointer",
              width: "fit-content",
              marginTop: 6,
            }}
          >
            Start Solving
          </button>
        )}
      </div>
    );
  }

  if (typeof ai !== "object") return null;

  const type = ai?.type || "explanation";
  const explanation = ai?.explanation || "";
  const code = ai?.code || "";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
      
      {type === "explanation" && (
        <>
          <div style={{ fontSize: 13, color: "#60a5fa" }}>
            Tutor
          </div>

          <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
            {explanation}
          </p>

          {(code || isCodingQuestion(explanation)) && (
            <button
              onClick={() =>
                onOpenPlayground?.(code || getStarterCode())
              }
              style={{
                background: "#22c55e",
                color: "white",
                border: "none",
                padding: "8px 12px",
                borderRadius: 6,
                cursor: "pointer",
                width: "fit-content",
              }}
            >
              Start Solving
            </button>
          )}
        </>
      )}

      {type === "code" && (
        <>
          <div style={{ fontSize: 13, color: "#60a5fa" }}>
            Code
          </div>

          <pre
            style={{
              background: "#0f172a",
              padding: 12,
              borderRadius: 8,
              overflowX: "auto",
              fontSize: 13,
            }}
          >
            <code>{code}</code>
          </pre>

          <button
            onClick={() => onOpenPlayground?.(code)}
            style={{
              background: "#22c55e",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: 6,
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            Open in Playground
          </button>
        </>
      )}

      {type === "submission_feedback" && (
        <>
          <div
            style={{
              color: ai?.status === "Accepted" ? "#22c55e" : "#ef4444",
              fontWeight: 600,
            }}
          >
            {ai?.status}
          </div>

          <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.7 }}>
            {explanation}
          </p>

          <button
            onClick={() =>
              onOpenPlayground?.(code || getStarterCode())
            }
            style={{
              background: "#3b82f6",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: 6,
              cursor: "pointer",
              width: "fit-content",
            }}
          >
            Try Again
          </button>
        </>
      )}

      {Array.isArray(ai?.suggestions) &&
        ai.suggestions.map((s: string, i: number) => (
          <button
            key={i}
            onClick={() => sendMessage(s)}
            style={{
              background: "#1f2937",
              color: "#e5e7eb",
              border: "none",
              padding: "6px 10px",
              borderRadius: 6,
              cursor: "pointer",
              textAlign: "left",
            }}
          >
            {s}
          </button>
        ))}
    </div>
  );
}