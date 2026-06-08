"use client";
import { useEffect, useState } from "react";

interface Agent {
  name: string;
  status: string;
  uptime_seconds: number;
  restart_count: number;
  memory_mb: number;
}

interface Stats {
  cpu_load: number;
  memory_used_mb: number;
  memory_total_mb: number;
  disk_used_gb: number;
  disk_total_gb: number;
}

function fmt(seconds: number) {
  const d = Math.floor(seconds / 86400);
  const h = Math.floor((seconds % 86400) / 3600);
  if (d > 0) return `${d}d ${h}h`;
  return `${h}h`;
}

function Bar({ pct, color }: { pct: number; color: string }) {
  return (
    <div style={{ height: 4, borderRadius: 2, background: "var(--border2, rgba(255,255,255,0.1))", overflow: "hidden", marginTop: 4 }}>
      <div style={{ height: "100%", width: `${Math.min(pct, 100)}%`, background: color, borderRadius: 2, transition: "width 0.4s" }} />
    </div>
  );
}

export default function ServerHealth() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [stats,  setStats]  = useState<Stats | null>(null);
  const [error,  setError]  = useState("");

  useEffect(() => {
    async function load() {
      try {
        const [ar, sr] = await Promise.all([
          fetch("/api/dashboard/agents").then(r => r.json()),
          fetch("/api/dashboard/stats").then(r => r.json()),
        ]);
        if (Array.isArray(ar)) setAgents(ar);
        if (sr && !sr.error) setStats(sr);
      } catch (e: any) {
        setError(e.message);
      }
    }
    load();
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, []);

  const memPct  = stats ? Math.round((stats.memory_used_mb  / stats.memory_total_mb)  * 100) : 0;
  const diskPct = stats ? Math.round((stats.disk_used_gb    / stats.disk_total_gb)    * 100) : 0;
  const cpuPct  = stats ? Math.round(stats.cpu_load * 100) : 0;

  const FLEET = ["actual", "press", "recon", "forge-worker", "helios"];
  const fleetAgents = agents.filter(a => FLEET.includes(a.name));

  return (
    <section style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 22 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 18 }}>
        <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, color: "var(--text)" }}>
          Server Health
        </h2>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)" }}>
          vmi3334497 · live
        </span>
      </div>

      {error && <div style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#ef4444" }}>{error}</div>}

      {/* Resource bars */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 20 }}>
        {[
          { label: "CPU",    pct: cpuPct,  value: `${cpuPct}%`,   color: "#3b82f6" },
          { label: "Memory", pct: memPct,  value: `${memPct}%`,   color: "#a855f7" },
          { label: "Disk",   pct: diskPct, value: `${stats?.disk_used_gb ?? "—"} / ${stats?.disk_total_gb ?? "—"} GB`, color: "#14b8a6" },
        ].map(r => (
          <div key={r.label}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)" }}>{r.label}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--text)" }}>{r.value}</span>
            </div>
            <Bar pct={r.pct} color={r.color} />
          </div>
        ))}
      </div>

      {/* Agent process list */}
      <div style={{ borderTop: "1px solid var(--border)", paddingTop: 14 }}>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)", marginBottom: 10 }}>processes</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {fleetAgents.map(a => (
            <div key={a.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ width: 6, height: 6, borderRadius: "50%", background: a.status === "online" ? "#22c55e" : "#ef4444", flexShrink: 0 }} />
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--text)", flex: 1 }}>{a.name}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)" }}>{fmt(a.uptime_seconds)}</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)" }}>{a.memory_mb}mb</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
