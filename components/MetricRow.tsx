"use client";
import { useEffect, useState } from "react";

interface Agent {
  name: string;
  status: string;
}

interface Stats {
  cpu_load: number;
  memory_used_mb: number;
  memory_total_mb: number;
  disk_used_gb: number;
  disk_total_gb: number;
}

const FLEET = ["actual", "press", "recon", "forge", "helios"];

export default function MetricRow() {
  const [agents,   setAgents]   = useState<Agent[]>([]);
  const [stats,    setStats]    = useState<Stats | null>(null);
  const [jobCount, setJobCount] = useState<number | null>(null);

  useEffect(() => {
    async function load() {
      try {
        const [ar, sr, jr] = await Promise.all([
          fetch("/api/dashboard/agents").then(r => r.json()),
          fetch("/api/dashboard/stats").then(r => r.json()),
          fetch("/api/dashboard/jobs?limit=50").then(r => r.json()),
        ]);
        if (Array.isArray(ar)) setAgents(ar);
        if (sr && !sr.error) setStats(sr);
        const jobs = Array.isArray(jr) ? jr : jr.jobs ?? [];
        setJobCount(jobs.filter((j: any) => j.status === "pending" || j.status === "running").length);
      } catch {}
    }
    load();
    const t = setInterval(load, 15000);
    return () => clearInterval(t);
  }, []);

  const fleetAgents = agents.filter(a => FLEET.includes(a.name));
  const onlineCount = fleetAgents.filter(a => a.status === "online").length;
  const memPct      = stats ? Math.round((stats.memory_used_mb / stats.memory_total_mb) * 100) : null;
  const cpuPct      = stats ? (stats.cpu_load * 100).toFixed(1) : "—";

  const cards = [
    { label: "Agents Online", value: `${onlineCount} / ${FLEET.length}`, sub: "fleet" },
    { label: "Pending Jobs",  value: jobCount ?? "—",                    sub: "mission-control" },
    { label: "Memory",        value: memPct != null ? `${memPct}%` : "—", sub: stats ? `${stats.memory_used_mb} / ${stats.memory_total_mb} MB` : "loading" },
    { label: "CPU Load",      value: cpuPct === "—" ? "—" : `${cpuPct}%`, sub: "1 min avg" },
  ];

  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginTop: 24 }}>
      {cards.map(c => (
        <div key={c.label} style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 12, padding: "18px 20px" }}>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)", marginBottom: 6 }}>{c.label}</div>
          <div style={{ fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 28, color: "var(--text)" }}>{c.value}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", marginTop: 4 }}>{c.sub}</div>
        </div>
      ))}
    </div>
  );
}
