"use client";
import { useEffect, useState } from "react";

interface Commit {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60) return diff + "s ago";
  if (diff < 3600) return Math.floor(diff / 60) + "m ago";
  if (diff < 86400) return Math.floor(diff / 3600) + "h ago";
  return Math.floor(diff / 86400) + "d ago";
}

export default function BlogPipeline() {
  const [commits, setCommits] = useState<Commit[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/dashboard/commits");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setCommits(data);
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
          Blog Pipeline
        </h2>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)" }}>
          github · site/blog
        </span>
      </div>
      {loading && <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--dim)" }}>loading...</div>}
      {error && <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#ef4444" }}>{error}</div>}
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {commits.map((c) => (
          <a key={c.sha} href={c.url} target="_blank" rel="noopener noreferrer"
            style={{ textDecoration: "none", display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: "var(--surface2)", borderRadius: 8, border: "1px solid var(--border)" }}>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#ec4899", flexShrink: 0, width: 48 }}>
              {c.sha}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {c.message}
            </span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)", flexShrink: 0 }}>
              {timeAgo(c.date)}
            </span>
          </a>
        ))}
      </div>
    </div>
  );
}
