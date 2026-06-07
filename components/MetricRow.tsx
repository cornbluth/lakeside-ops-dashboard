const METRICS = [
  { label: "Agents Online",   value: "3 / 5",  sub: "actual · press · recon",  color: "#22c55e" },
  { label: "Jobs Today",      value: "—",       sub: "from mission-control",    color: "var(--actual)" },
  { label: "Blog Posts Live", value: "—",       sub: "last 30 days",            color: "var(--press)" },
  { label: "Leads Sourced",   value: "—",       sub: "suffolk county SMBs",     color: "var(--recon)" },
];

export default function MetricRow() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16 }}>
      {METRICS.map((m) => (
        <div
          key={m.label}
          style={{
            background: "var(--surface)",
            border: "1px solid var(--border)",
            borderRadius: 12,
            padding: "18px 20px",
            borderLeft: `3px solid ${m.color}`,
          }}
        >
          <div
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              marginBottom: 8,
            }}
          >
            {m.label}
          </div>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: 28,
              fontWeight: 600,
              color: m.color,
              lineHeight: 1,
              marginBottom: 6,
            }}
          >
            {m.value}
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)" }}>
            {m.sub}
          </div>
        </div>
      ))}
    </div>
  );
}
