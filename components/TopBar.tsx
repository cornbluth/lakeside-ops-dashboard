"use client";

import { useEffect, useState } from "react";

function Clock() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const tick = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          timeZone: "America/New_York",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--muted)" }}>
      {time} EDT
    </span>
  );
}

export default function TopBar() {
  return (
    <header
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "20px 0 18px",
        borderBottom: "1px solid var(--border)",
        marginBottom: 28,
      }}
    >
      {/* Logo */}
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: 8,
            background: "linear-gradient(135deg, var(--actual) 0%, var(--helios) 100%)",
            flexShrink: 0,
          }}
        />
        <div>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 700,
              fontSize: 17,
              color: "var(--text)",
              letterSpacing: "-0.02em",
            }}
          >
            Lakeside Ops
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)" }}>
            Agent Fleet Control
          </div>
        </div>
      </div>

      {/* Live indicator */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginLeft: 12 }}>
        <span
          style={{
            display: "inline-block",
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#22c55e",
            boxShadow: "0 0 6px #22c55e",
            animation: "pulse 2s infinite",
          }}
        />
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#22c55e" }}>
          LIVE
        </span>
      </div>

      <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 24 }}>
        {/* OpenRouter balance placeholder */}
        <div style={{ textAlign: "right" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)" }}>
            OpenRouter
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--press)" }}>
            $—
          </div>
        </div>
        <Clock />
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </header>
  );
}
