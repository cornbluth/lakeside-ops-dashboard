import AgentCard from "./AgentCard";

const AGENTS = [
  {
    name: "Actual",
    role: "Orchestrator",
    bio: "Primary ops agent. Routes tasks, manages the job queue, coordinates the fleet via mission-control. Runs 24/7 on Contabo.",
    status: "online" as const,
    server: "contabo",
    pm2Id: "id3",
    color: "#a78bfa",
  },
  {
    name: "Press",
    role: "Content Pipeline",
    bio: "Blog writer and content strategist. Drafts posts, runs publishing flows through n8n, and commits to the lakesidetech.co repo.",
    status: "online" as const,
    server: "contabo",
    pm2Id: "id6",
    color: "#34d399",
  },
  {
    name: "Recon",
    role: "Lead & Intel",
    bio: "Outreach and research agent. Scans Suffolk County SMBs via SiteSnap, qualifies leads, drafts cold emails.",
    status: "online" as const,
    server: "contabo",
    pm2Id: "id5",
    color: "#60a5fa",
  },
  {
    name: "Forge",
    role: "Execution Engine",
    bio: "Build and deploy agent on srv1373324. Polls mission-control for jobs, runs shell commands, handles git ops and deploys.",
    status: "offline" as const,
    server: "srv1373324",
    pm2Id: "forge-worker",
    color: "#fb923c",
  },
  {
    name: "Helios",
    role: "Dev Agent",
    bio: "Development and infrastructure agent on Helmethead. Handles local experiments, tooling, and dev tasks for Jack.",
    status: "offline" as const,
    server: "helmethead",
    pm2Id: "hermes-gateway",
    color: "#f472b6",
  },
];

export default function AgentGrid() {
  return (
    <section>
      <div style={{ marginBottom: 16, display: "flex", alignItems: "baseline", gap: 10 }}>
        <h2
          style={{
            fontFamily: "var(--font-sans)",
            fontSize: 15,
            fontWeight: 600,
            color: "var(--text)",
          }}
        >
          Agent Fleet
        </h2>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "var(--dim)" }}>
          5 agents
        </span>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 16 }}>
        {AGENTS.map((a) => (
          <AgentCard key={a.name} {...a} />
        ))}
      </div>
    </section>
  );
}
