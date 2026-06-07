type AgentCardProps = {
  name: string;
  role: string;
  bio: string;
  status: "online" | "offline" | "idle";
  server: string;
  pm2Id: string;
  color: string;
};

const STATUS_COLOR: Record<string, string> = {
  online:  "#22c55e",
  offline: "#ef4444",
  idle:    "#f59e0b",
};

export default function AgentCard({ name, role, bio, status, server, pm2Id, color }: AgentCardProps) {
  const sc = STATUS_COLOR[status];

  return (
    <div
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        borderRadius: 14,
        padding: "22px 22px 18px",
        borderTop: `3px solid ${color}`,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 10,
            background: `${color}18`,
            border: `1px solid ${color}40`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "var(--font-sans)",
            fontWeight: 700,
            fontSize: 16,
            color,
            flexShrink: 0,
          }}
        >
          {name[0]}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              fontFamily: "var(--font-sans)",
              fontWeight: 600,
              fontSize: 16,
              color: "var(--text)",
            }}
          >
            {name}
          </div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)" }}>
            {role}
          </div>
        </div>
        {/* Status dot */}
        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: sc,
              display: "inline-block",
              boxShadow: status === "online" ? `0 0 6px ${sc}` : undefined,
            }}
          />
          <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: sc }}>
            {status}
          </span>
        </div>
      </div>

      {/* Bio */}
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: 11,
          color: "var(--muted)",
          lineHeight: 1.6,
        }}
      >
        {bio}
      </p>

      {/* Footer meta */}
      <div
        style={{
          display: "flex",
          gap: 8,
          paddingTop: 10,
          borderTop: "1px solid var(--border)",
          flexWrap: "wrap",
        }}
      >
        {[
          { k: "server", v: server },
          { k: "pm2",    v: pm2Id  },
        ].map(({ k, v }) => (
          <div
            key={k}
            style={{
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              borderRadius: 6,
              padding: "3px 8px",
              fontFamily: "var(--font-mono)",
              fontSize: 10,
              color: "var(--dim)",
            }}
          >
            <span style={{ color: "var(--muted)" }}>{k} </span>
            <span style={{ color: color }}>{v}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
