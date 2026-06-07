const SERVERS = [
  {
    name: "Contabo",
    ip: "100.91.236.70",
    role: "primary — actual · press · recon",
    cpu: 18,
    mem: 62,
    status: "healthy",
  },
  {
    name: "srv1373324",
    ip: "100.67.16.8",
    role: "forge — build & deploy",
    cpu: 4,
    mem: 23,
    status: "healthy",
  },
  {
    name: "Helmethead",
    ip: "100.122.60.20",
    role: "helios — dev workstation",
    cpu: 1,
    mem: 31,
    status: "healthy",
  },
];

function Bar({ pct, color }: { pct: number; color: string }) {
  return (
    <div
      style={{
        height: 4,
        borderRadius: 2,
        background: "var(--surface2)",
        overflow: "hidden",
        width: "100%",
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${pct}%`,
          background: color,
          borderRadius: 2,
          transition: "width 0.3s",
        }}
      />
    </div>
  );
}

export default function ServerHealth() {
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
          Server Health
        </h2>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)" }}>
          tailscale mesh
        </span>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {SERVERS.map((srv) => (
          <div
            key={srv.name}
            style={{
              padding: "14px 16px",
              background: "var(--surface2)",
              borderRadius: 10,
              border: "1px solid var(--border)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
              <div>
                <span style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 14, color: "var(--text)" }}>
                  {srv.name}
                </span>
                <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)", marginLeft: 8 }}>
                  {srv.ip}
                </span>
              </div>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: 10,
                  color: "#22c55e",
                  background: "rgba(34,197,94,0.08)",
                  padding: "2px 8px",
                  borderRadius: 4,
                }}
              >
                {srv.status}
              </span>
            </div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--muted)", marginBottom: 10 }}>
              {srv.role}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              {[
                { k: "CPU", v: srv.cpu, color: "#a78bfa" },
                { k: "MEM", v: srv.mem, color: "#60a5fa" },
              ].map(({ k, v, color }) => (
                <div key={k}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--dim)" }}>{k}</span>
                    <span style={{ fontFamily: "var(--font-mono)", fontSize: 9, color }}>{v}%</span>
                  </div>
                  <Bar pct={v} color={color} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 12, fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)", textAlign: "center" }}>
        sample data — wire to status-server
      </div>
    </section>
  );
}
