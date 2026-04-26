"use client";

import { useState } from "react";

export default function MeetUI({
  chat,
}: {
  chat: React.ReactNode;
}) {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(false);
  const [showChat, setShowChat] = useState(true);

  return (
    <div style={{ display: "flex", height: "100vh", background: "#0b0f14" }}>
      
      <div style={{ flex: 1, position: "relative", padding: 20 }}>
        
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 12,
            height: "100%",
          }}
        >
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              style={{
                background: "#1f2937",
                borderRadius: 12,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#9ca3af",
                fontSize: 18,
              }}
            >
              Camera {i}
            </div>
          ))}
        </div>

        <div
          style={{
            position: "absolute",
            bottom: 30,
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            gap: 16,
            background: "#111827",
            padding: "10px 16px",
            borderRadius: 999,
          }}
        >
          <button
            onClick={() => setMicOn(!micOn)}
            style={{
              background: micOn ? "#22c55e" : "#ef4444",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: 8,
            }}
          >
            {micOn ? "Mic On" : "Mic Off"}
          </button>

          <button
            onClick={() => setCamOn(!camOn)}
            style={{
              background: camOn ? "#22c55e" : "#374151",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: 8,
            }}
          >
            {camOn ? "Camera On" : "Camera Off"}
          </button>

          <button
            onClick={() => setShowChat(!showChat)}
            style={{
              background: "#3b82f6",
              color: "white",
              border: "none",
              padding: "8px 12px",
              borderRadius: 8,
            }}
          >
            Chat
          </button>

          <button
            style={{
              background: "#ef4444",
              color: "white",
              border: "none",
              padding: "8px 14px",
              borderRadius: 8,
            }}
          >
            Leave
          </button>
        </div>
      </div>

      {showChat && (
        <div
          style={{
            width: 360,
            borderLeft: "1px solid #1f2937",
            background: "#020617",
          }}
        >
          {chat}
        </div>
      )}
    </div>
  );
}