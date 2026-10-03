import { NextResponse } from "next/server";
import { saveSubscriber } from "@/lib/server/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    if (typeof email !== "string" || email.length > 160 || !/^\S+@\S+\.\S+$/.test(email)) return NextResponse.json({ error: "Valid email required." }, { status: 400 });
    await saveSubscriber(email.trim().toLowerCase());
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to subscribe." }, { status: 500 });
  }
}
