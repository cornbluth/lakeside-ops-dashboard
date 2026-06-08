import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { parse }        from "yaml";
import { join }         from "path";

const AGENTS   = ["actual", "press", "recon"];
const BASE     = "/home/jlucivero/.hermes/profiles";

export async function GET() {
  const result: Record<string, string[]> = {};

  for (const agent of AGENTS) {
    try {
      const raw    = readFileSync(join(BASE, agent, "config.yaml"), "utf8");
      const config = parse(raw);
      const mcps   = config?.mcp_servers ? Object.keys(config.mcp_servers) : [];
      result[agent] = mcps;
    } catch {
      result[agent] = [];
    }
  }

  return NextResponse.json(result);
}
