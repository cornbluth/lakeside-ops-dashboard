export const dynamic = 'force-dynamic';

export async function GET() {
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) return Response.json({ balance: null });

  try {
    const res = await fetch('https://openrouter.ai/api/v1/auth/key', {
      headers: { Authorization: `Bearer ${apiKey}` },
      signal: AbortSignal.timeout(8000),
    });
    if (!res.ok) return Response.json({ balance: null });

    const { data } = await res.json();
    // limit_remaining = credit limit minus usage; fall back to negating usage
    const balance: number | null =
      data?.limit_remaining ?? (data?.usage != null ? -data.usage : null);

    return Response.json({ balance });
  } catch {
    return Response.json({ balance: null });
  }
}
