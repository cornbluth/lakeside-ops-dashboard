import { NextResponse } from "next/server";

const GITHUB_PAT = process.env.GITHUB_PAT ?? "";
const REPO       = "cornbluth/lakesidetech-ai-company";

export async function GET() {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${REPO}/commits?path=site/blog&per_page=8`,
      {
        headers: {
          Authorization: `Bearer ${GITHUB_PAT}`,
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28",
        },
        cache: "no-store",
      }
    );
    const data = await res.json();
    if (!Array.isArray(data)) throw new Error(data.message ?? "GitHub error");
    const commits = data.map((c: any) => ({
      sha:     c.sha.slice(0, 7),
      message: c.commit.message.split("\n")[0],
      author:  c.commit.author.name,
      date:    c.commit.author.date,
      url:     c.html_url,
    }));
    return NextResponse.json(commits);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
