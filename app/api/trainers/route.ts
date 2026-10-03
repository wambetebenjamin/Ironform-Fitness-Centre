import { NextResponse } from "next/server";
import { trainers } from "@/lib/data";

export async function GET() { return NextResponse.json({ trainers }, { headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" } }); }
