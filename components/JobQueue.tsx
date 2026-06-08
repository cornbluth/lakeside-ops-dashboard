"use client";
import { useEffect, useState } from "react";

interface Job {
  id: number;
  type: string;
  status: string;
  assigned_to: string;
  created_at: string;
  completed_at: string | null;
  result: string | null;
}

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  complete:  { bg: "rgba(34,197,94,0.1)",   color: "#22c55e" },
  running:   { bg: "rgba(251,146,60,0.1)",  color: "#fb923c" },
  pending:   { bg: "rgba(167,139,250,0.1)", color: "#a78bfa" },
  failed:    { bg: "rgba(239,68,68,0.1)",   color: "#ef4444" },
};

const AGENT_COLOR: Record<string, string> = {
  actual: "#f97316",
  press:  "#ec4899",
  recon:  "#14b8a6",
  forge:  "#a855f7",
  helios: "#3b82f6",
};

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60)   return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  return `${Math.floor(diff/86400)}d ago`;
}

export default function JobQueue() {
  const [jobs, setJobs]     = useState<Job[]>([]);
  const [error, setError]   = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetch("/api/dashboard/jobs?limit=10");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        setJobs(Array.isArray(data) ? data : data.jobs ?? []);
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
    const t = setInterval(load, 10000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 22 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 18 }}>
        <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, color: "var(--text)" }}>
          Job Queue
        </h2>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)" }}>
          mission-control · live
        </span>
      </div>

      {loading && <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--dim)" }}>loading…</div>}
      {error   && <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#ef4444" }}>{error}</div>}

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {jobs.map((job) => {
          const ss = STATUS_STYLE[job.status] ?? { bg: "rgba(255,255,255,0.05)", color: "var(--muted)" };
          return (
            <div key={job.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "var(--surface2)", borderRadius: 8, border: "1px solid var(--border)" }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)", flexShrink: 0, width: 32 }}>
                #{job.id}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {job.type}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: AGENT_COLOR[job.assigned_to] ?? "var(--muted)", flexShrink: 0 }}>
                {job.assigned_to ?? "—"}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, padding: "2px 8px", borderRadius: 4, background: ss.bg, color: ss.color, flexShrink: 0 }}>
                {job.status}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)", flexShrink: 0 }}>
                {timeAgo(job.created_at)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
