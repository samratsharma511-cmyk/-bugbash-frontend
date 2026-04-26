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
  if (!ai) return null;

  const isCodingQuestion = (text: string) => {
    return (
      text.toLowerCase().includes("coding question") ||
      text.toLowerCase().includes("write") ||
      text.toLowerCase().includes("implement") ||
      text.toLowerCase().includes("function")
    );
  };

  const getStarterCode = () => {
    return `# start coding here\n\ndef solution():\n    pass`;
  };

  if (typeof ai === "string") {
    const showPlayground = isCodingQuestion(ai);

    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
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
            }}
          >
            Open Coding Playground
          </button>
        )}
      </div>
    );
  }

  const type = ai.type || "explanation";

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      
      {type === "explanation" && (
        <>
          <p style={{ whiteSpace: "pre-wrap", lineHeight: 1.6 }}>
            {ai.explanation}
          </p>

          <button
            onClick={() =>
              onOpenPlayground?.(
                ai.code || "# start coding here\n\ndef solution():\n    pass"
              )
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
            Open Playground
          </button>
        </>
      )}

      {type === "code" && (
        <>
          <pre
            style={{
              background: "#0f172a",
              padding: 12,
              borderRadius: 8,
              overflowX: "auto",
            }}
          >
            <code>{ai.code}</code>
          </pre>

          <button
            onClick={() => onOpenPlayground?.(ai.code)}
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
          <p
            style={{
              color: ai.status === "Accepted" ? "#22c55e" : "#ef4444",
              fontWeight: 500,
            }}
          >
            {ai.status}
          </p>

          <p style={{ whiteSpace: "pre-wrap" }}>
            {ai.explanation}
          </p>

          <button
            onClick={() => onOpenPlayground?.(ai.code || getStarterCode())}
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
            Retry in Playground
          </button>
        </>
      )}

      {ai.suggestions?.map((s: string, i: number) => (
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