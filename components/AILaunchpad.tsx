"use client";

const SERVICES = [
  { name: "Claude",     sub: "Anthropic",    url: "https://claude.ai",            color: "#f97316", icon: "C" },
  { name: "ChatGPT",    sub: "OpenAI",        url: "https://chat.openai.com",      color: "#22c55e", icon: "G" },
  { name: "Gemini",     sub: "Google",        url: "https://gemini.google.com",    color: "#3b82f6", icon: "✦" },
  { name: "Kimi",       sub: "Moonshot AI",   url: "https://kimi.moonshot.cn",     color: "#a855f7", icon: "K" },
  { name: "Perplexity", sub: "Search + AI",   url: "https://perplexity.ai",        color: "#14b8a6", icon: "P" },
];

const AGENTS = [
  { name: "Actual",  sub: "Orchestrator",     url: "https://t.me/actuallakeside_bot", color: "#f97316" },
  { name: "Press",   sub: "Content Pipeline", url: "https://t.me/presslakeside_bot",  color: "#ec4899" },
  { name: "Recon",   sub: "Lead & Intel",     url: "https://t.me/reconlakeside_bot",  color: "#14b8a6" },
  { name: "Forge",   sub: "Execution Engine", url: "https://t.me/forgelakeside_bot",  color: "#a855f7" },
  { name: "Helios",  sub: "Dev Agent",        url: "https://t.me/Helmethead_bot",     color: "#3b82f6" },
];

function LaunchCard({ name, sub, url, color, icon }: { name: string; sub: string; url: string; color: string; icon?: string }) {
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
      <div
        style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", background: "var(--surface2)", borderRadius: 8, border: "1px solid var(--border)", cursor: "pointer", transition: "border-color 0.2s" }}
        onMouseEnter={e => (e.currentTarget.style.borderColor = color)}
        onMouseLeave={e => (e.currentTarget.style.borderColor = "var(--border)")}
      >
        <div style={{ width: 32, height: 32, borderRadius: 7, background: color + "22", border: "1px solid " + color + "44", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontFamily: "var(--font-sans)", fontWeight: 700, fontSize: 13, color }}>
          {icon ?? name[0]}
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 12, color: "var(--text)" }}>{name}</div>
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "var(--dim)" }}>{sub}</div>
        </div>
      </div>
    </a>
  );
}

export default function AILaunchpad() {
  return (
    <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 14, padding: 22, display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
        <h2 style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: 15, color: "var(--text)" }}>AI Launchpad</h2>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)" }}>services + fleet</span>
      </div>

      <div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)", marginBottom: 8 }}>ai services</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {SERVICES.map(s => <LaunchCard key={s.name} {...s} />)}
        </div>
      </div>

      <div>
        <div style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)", marginBottom: 8 }}>fleet · telegram</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {AGENTS.map(a => <LaunchCard key={a.name} {...a} />)}
        </div>
      </div>
    </div>
  );
}
