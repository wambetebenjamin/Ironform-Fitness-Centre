import { NextResponse } from "next/server";
import { getArticles } from "@/lib/blog";

export async function GET() {
  const articles = await getArticles();
  return NextResponse.json({ articles }, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } });
}
