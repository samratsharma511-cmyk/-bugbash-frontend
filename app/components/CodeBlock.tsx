"use client";

import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function CodeBlock({
  code,
  onOpenPlayground,
}: {
  code: string;
  onOpenPlayground?: (code: string) => void;
}) {
  const [copied, setCopied] = useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      style={{
        position: "relative",
        borderRadius: 10,
        overflow: "hidden",
        border: "1px solid #1f2937",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          gap: 8,
          padding: "6px 8px",
          background: "#0b1220",
          borderBottom: "1px solid #1f2937",
        }}
      >
        <button
          onClick={copyCode}
          style={{
            fontSize: 12,
            padding: "4px 8px",
            background: "#2563eb",
            color: "white",
            borderRadius: 6,
            border: "none",
            cursor: "pointer",
          }}
        >
          {copied ? "Copied" : "Copy"}
        </button>

        {onOpenPlayground && (
          <button
            onClick={() => onOpenPlayground(code)}
            style={{
              fontSize: 12,
              padding: "4px 8px",
              background: "#22c55e",
              color: "white",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
            }}
          >
            Open
          </button>
        )}
      </div>

      <SyntaxHighlighter
        language="python"
        style={oneDark}
        customStyle={{
          margin: 0,
          padding: 12,
          fontSize: 13,
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}