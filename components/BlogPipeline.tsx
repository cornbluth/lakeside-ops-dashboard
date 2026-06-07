const STAGES = [
  { label: "Actual",   sub: "orchestrates",     color: "#a78bfa", icon: "◈" },
  { label: "Press",    sub: "drafts post",       color: "#34d399", icon: "✦" },
  { label: "n8n",      sub: "automates publish", color: "#fb923c", icon: "⟳" },
  { label: "GitHub",   sub: "git commit",        color: "#60a5fa", icon: "◉" },
  { label: "Nginx",    sub: "serves live",       color: "#f472b6", icon: "▲" },
];

export default function BlogPipeline() {
  return (
    <section
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: 22,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 22 }}>
        <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, color: "var(--text)" }}>
          Blog Pipeline
        </h2>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)" }}>
          content flow
        </span>
      </div>

      <div style={{ position: "relative" }}>
        {/* Connector line */}
        <div
          style={{
            position: "absolute",
            top: 22,
            left: 22,
            right: 22,
            height: 1,
            background: "linear-gradient(90deg, #a78bfa40, #f472b640)",
            zIndex: 0,
          }}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: 8,
            position: "relative",
            zIndex: 1,
          }}
        >
          {STAGES.map((s, i) => (
            <div key={s.label} style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
              {/* Node */}
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: 12,
                  background: `${s.color}15`,
                  border: `1px solid ${s.color}50`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 18,
                  color: s.color,
                }}
              >
                {s.icon}
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 12, color: s.color }}>
                  {s.label}
                </div>
                <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--dim)", marginTop: 2 }}>
                  {s.sub}
                </div>
              </div>
              {/* Step number */}
              <div
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 9,
                  color: "var(--dim)",
                  background: "var(--surface2)",
                  border: "1px solid var(--border)",
                  borderRadius: 4,
                  padding: "1px 6px",
                }}
              >
                0{i + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          marginTop: 24,
          padding: "12px 14px",
          background: "var(--surface2)",
          borderRadius: 8,
          border: "1px solid var(--border)",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          color: "var(--muted)",
          lineHeight: 1.6,
        }}
      >
        <span style={{ color: "var(--press)" }}>press</span> writes post →{" "}
        <span style={{ color: "#fb923c" }}>n8n</span> triggers on commit →{" "}
        <span style={{ color: "var(--recon)" }}>GitHub</span> action builds →{" "}
        <span style={{ color: "var(--helios)" }}>nginx</span> serves on lakesidetech.co
      </div>
    </section>
  );
}
