import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res  = await fetch("http://localhost:3099/stats", { cache: "no-store" });
    const data = await res.json();
    return NextResponse.json(data);
  } catch {
    return NextResponse.json({ error: "status-server unreachable" }, { status: 503 });
  }
}
