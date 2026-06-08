"use client";
import { useEffect, useState } from "react";

const AGENT_COLOR: Record<string, string> = {
  actual: "#f97316",
  press:  "#ec4899",
  recon:  "#14b8a6",
};

export default function SkillsPanel() {
  const [skills, setSkills] = useState<Record<string, string[]>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function load() {
      try {
        const res  = await fetch("/api/dashboard/skills");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setSkills(data);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
    const t = setInterval(load, 60000);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 22 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 18 }}>
        <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, color: "var(--text)" }}>
          Skills Panel
        </h2>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)" }}>
          mcp servers · contabo
        </span>
      </div>

      {loading && <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--dim)" }}>loading...</div>}
      {error   && <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#ef4444" }}>{error}</div>}

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {Object.entries(skills).map(([agent, mcps]) => (
          <div key={agent}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: AGENT_COLOR[agent] ?? "var(--dim)", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: AGENT_COLOR[agent] ?? "var(--muted)", fontWeight: 600 }}>
                {agent}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)" }}>
                {mcps.length} tool{mcps.length !== 1 ? "s" : ""}
              </span>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6, paddingLeft: 14 }}>
              {mcps.length === 0
                ? <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)" }}>no mcp servers configured</span>
                : mcps.map(mcp => (
                    <span key={mcp} style={{
                      fontFamily: "var(--font-mono)", fontSize: 10,
                      padding: "3px 10px", borderRadius: 4,
                      background: (AGENT_COLOR[agent] ?? "#666") + "18",
                      border: "1px solid " + (AGENT_COLOR[agent] ?? "#666") + "33",
                      color: AGENT_COLOR[agent] ?? "var(--muted)",
                    }}>
                      {mcp}
                    </span>
                  ))
              }
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
