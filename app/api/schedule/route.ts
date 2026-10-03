import { NextResponse } from "next/server";
import { schedule } from "@/lib/data";

export const dynamic = "force-dynamic";
export async function GET() { return NextResponse.json({ schedule, updatedAt: new Date().toISOString() }, { headers: { "Cache-Control": "no-store" } }); }
