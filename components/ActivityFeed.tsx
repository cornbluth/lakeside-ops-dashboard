"use client";
import { useEffect, useState } from "react";

interface Job {
  id: number;
  type: string;
  status: string;
  assigned_to: string;
  created_at: string;
  result: string | null;
}

const AGENT_COLOR: Record<string, string> = {
  actual: "#f97316",
  press:  "#ec4899",
  recon:  "#14b8a6",
  forge:  "#a855f7",
  helios: "#3b82f6",
};

const STATUS_COLOR: Record<string, string> = {
  complete: "#22c55e",
  failed:   "#ef4444",
  running:  "#fb923c",
  pending:  "#a78bfa",
};

function timeAgo(iso: string) {
  const diff = Math.floor((Date.now() - new Date(iso).getTime()) / 1000);
  if (diff < 60)    return `${diff}s ago`;
  if (diff < 3600)  return `${Math.floor(diff/60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff/3600)}h ago`;
  return `${Math.floor(diff/86400)}d ago`;
}

function truncate(str: string | null, n: number) {
  if (!str) return "—";
  return str.length > n ? str.slice(0, n) + "…" : str;
}

export default function ActivityFeed() {
  const [jobs, setJobs]       = useState<Job[]>([]);
  const [error, setError]     = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res  = await fetch("/api/dashboard/jobs?limit=20");
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        const all: Job[] = Array.isArray(data) ? data : data.jobs ?? [];
        // activity feed = completed + failed only
        setJobs(all.filter(j => j.status === "complete" || j.status === "failed"));
      } catch (e: any) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    load();
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, []);

  return (
    <section style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 22 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 18 }}>
        <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, color: "var(--text)" }}>
          Activity Feed
        </h2>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)" }}>
          job history · live
        </span>
      </div>

      {loading && <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--dim)" }}>loading…</div>}
      {error   && <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#ef4444" }}>{error}</div>}

      <div style={{ display: "flex", flexDirection: "column", gap: 6, maxHeight: 340, overflowY: "auto" }}>
        {jobs.map((job) => (
          <div key={job.id} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 12px", background: "var(--surface2)", borderRadius: 8, border: "1px solid var(--border)" }}>
            {/* status dot */}
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: STATUS_COLOR[job.status] ?? "var(--dim)", flexShrink: 0, marginTop: 4 }} />
            {/* agent */}
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: AGENT_COLOR[job.assigned_to] ?? "var(--muted)", flexShrink: 0, width: 44 }}>
              {job.assigned_to ?? "—"}
            </span>
            {/* type + result */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text)" }}>{job.type}</div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)", marginTop: 2 }}>
                {truncate(job.result, 80)}
              </div>
            </div>
            {/* time */}
            <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)", flexShrink: 0 }}>
              {timeAgo(job.created_at)}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
