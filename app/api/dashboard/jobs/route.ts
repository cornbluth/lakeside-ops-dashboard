import { NextResponse } from "next/server";

const MC_URL = "http://localhost:3100";
const MC_PASS = process.env.MC_PASSWORD ?? "LakesideMC2026!";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const status = searchParams.get("status") ?? "";
  const limit  = searchParams.get("limit")  ?? "20";

  const qs = new URLSearchParams();
  if (status) qs.set("status", status);
  qs.set("limit", limit);

  try {
    const res = await fetch(`${MC_URL}/api/jobs?${qs}`, {
      headers: { "x-admin-password": MC_PASS },
      cache: "no-store",
    });
    const data = await res.json();
    return NextResponse.json(data);
  } catch (err) {
    return NextResponse.json({ error: "mission-control unreachable" }, { status: 503 });
  }
}
