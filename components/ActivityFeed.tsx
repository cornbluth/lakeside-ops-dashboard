const EVENTS = [
  { agent: "actual", color: "#a78bfa", text: "Created job mc-004 → forge",           time: "just now" },
  { agent: "press",  color: "#34d399", text: "Committed blog post to lakesidetech.co", time: "2h ago" },
  { agent: "recon",  color: "#60a5fa", text: "Scraped 14 new SMB leads via SiteSnap", time: "3h ago" },
  { agent: "forge",  color: "#fb923c", text: "Deployed lakeside-backups v0.3.1",       time: "5h ago" },
  { agent: "actual", color: "#a78bfa", text: "Health-check — all Contabo agents OK",  time: "6h ago" },
  { agent: "press",  color: "#34d399", text: "n8n workflow triggered: blog-publish",   time: "8h ago" },
];

export default function ActivityFeed() {
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
          Activity
        </h2>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)" }}>
          recent
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column" }}>
        {EVENTS.map((ev, i) => (
          <div
            key={i}
            style={{
              display: "flex",
              gap: 12,
              padding: "10px 0",
              borderBottom: i < EVENTS.length - 1 ? "1px solid var(--border)" : "none",
            }}
          >
            {/* Timeline dot + line */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 0 }}>
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: "50%",
                  background: ev.color,
                  flexShrink: 0,
                  marginTop: 3,
                }}
              />
              {i < EVENTS.length - 1 && (
                <div style={{ width: 1, flex: 1, background: "var(--border)", marginTop: 4 }} />
              )}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    fontWeight: 500,
                    color: ev.color,
                  }}
                >
                  {ev.agent}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)" }}>
                  {ev.time}
                </span>
              </div>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "var(--muted)", lineHeight: 1.5 }}>
                {ev.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
