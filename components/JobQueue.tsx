const SAMPLE_JOBS = [
  { id: "mc-001", type: "shell-command", status: "completed", agent: "forge",  age: "2h ago" },
  { id: "mc-002", type: "git-edit",      status: "completed", agent: "press",  age: "4h ago" },
  { id: "mc-003", type: "deploy",        status: "failed",    agent: "forge",  age: "5h ago" },
  { id: "mc-004", type: "shell-command", status: "pending",   agent: "actual", age: "just now" },
  { id: "mc-005", type: "git-edit",      status: "running",   agent: "press",  age: "1m ago" },
];

const STATUS_STYLE: Record<string, { bg: string; color: string }> = {
  completed: { bg: "rgba(34,197,94,0.1)",  color: "#22c55e" },
  running:   { bg: "rgba(251,146,60,0.1)", color: "#fb923c" },
  pending:   { bg: "rgba(167,139,250,0.1)",color: "#a78bfa" },
  failed:    { bg: "rgba(239,68,68,0.1)",  color: "#ef4444" },
};

const AGENT_COLOR: Record<string, string> = {
  actual: "#a78bfa",
  press:  "#34d399",
  recon:  "#60a5fa",
  forge:  "#fb923c",
  helios: "#f472b6",
};

export default function JobQueue() {
  return (
    <section
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: 22,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 18 }}>
        <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, color: "var(--text)" }}>
          Job Queue
        </h2>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)" }}>
          mission-control
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {SAMPLE_JOBS.map((job) => {
          const ss = STATUS_STYLE[job.status];
          return (
            <div
              key={job.id}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "10px 12px",
                background: "var(--surface2)",
                borderRadius: 8,
                border: "1px solid var(--border)",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "var(--dim)",
                  flexShrink: 0,
                  width: 52,
                }}
              >
                {job.id}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", flex: 1 }}>
                {job.type}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: AGENT_COLOR[job.agent] ?? "var(--muted)",
                  flexShrink: 0,
                }}
              >
                {job.agent}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  padding: "2px 8px",
                  borderRadius: 4,
                  background: ss.bg,
                  color: ss.color,
                  flexShrink: 0,
                }}
              >
                {job.status}
              </span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)", flexShrink: 0 }}>
                {job.age}
              </span>
            </div>
          );
        })}
      </div>

      <div
        style={{
          marginTop: 14,
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "var(--dim)",
          textAlign: "center",
        }}
      >
        sample data — wire to /api/dashboard/jobs
      </div>
    </section>
  );
}
