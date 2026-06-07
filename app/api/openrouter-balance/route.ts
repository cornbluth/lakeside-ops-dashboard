export const dynamic = 'force-dynamic';

export async function GET() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return Response.json({ balance: null });

  try {
    const res = await fetch('https://openrouter.ai/api/v1/credits', {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return Response.json({ balance: null });

    const data = await res.json();
    const balance = data.data.total_credits - data.data.total_usage;

    return Response.json({ balance: balance.toFixed(2) });
  } catch {
    return Response.json({ balance: null });
  }
}
