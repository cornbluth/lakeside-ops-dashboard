import TopBar       from "@/components/TopBar";
import MetricRow    from "@/components/MetricRow";
import AgentGrid    from "@/components/AgentGrid";
import JobQueue     from "@/components/JobQueue";
import ActivityFeed from "@/components/ActivityFeed";
import ServerHealth from "@/components/ServerHealth";
import BlogPipeline from "@/components/BlogPipeline";
import AILaunchpad  from "@/components/AILaunchpad";

export default function Page() {
  return (
    <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 24px 48px" }}>
      <TopBar />
      <MetricRow />
      <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 24, marginTop: 24, alignItems: "start" }}>
        {/* Left sidebar */}
        <AILaunchpad />

        {/* Main content */}
        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <AgentGrid />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <JobQueue />
            <ActivityFeed />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            <ServerHealth />
            <BlogPipeline />
          </div>
        </div>
      </div>
    </div>
  );
}
