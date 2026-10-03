import { NextResponse } from "next/server";
import { whatsappLink } from "@/lib/data";
import { normalizePhone, sendEmail, sendWhatsApp } from "@/lib/server/notifications";
import { saveRecord } from "@/lib/server/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!["name", "phone", "plan", "branch"].every(field => typeof body[field] === "string" && body[field].trim() && body[field].length <= 120)) return NextResponse.json({ error: "Invalid enquiry." }, { status: 400 });
    if (body.email && !/^\S+@\S+\.\S+$/.test(body.email)) return NextResponse.json({ error: "Invalid email." }, { status: 400 });
    const enquiry = { id: crypto.randomUUID(), name: body.name.trim(), phone: normalizePhone(body.phone), email: body.email?.trim().toLowerCase() || "", plan: body.plan.trim(), branch: body.branch.trim(), createdAt: new Date().toISOString() };
    await saveRecord("memberships", enquiry);
    const message = `Hi ${enquiry.name}, we received your Ironform ${enquiry.plan} enquiry for our ${enquiry.branch} branch. Our membership team will be in touch shortly.`;
    await Promise.all([
      sendWhatsApp(enquiry.phone, message),
      enquiry.email ? sendEmail({ to: enquiry.email, subject: `Your Ironform ${enquiry.plan} enquiry`, html: `<h1>Ready when you are</h1><p>${message}</p>` }) : Promise.resolve(false),
      process.env.BUSINESS_WHATSAPP_NUMBER ? sendWhatsApp(process.env.BUSINESS_WHATSAPP_NUMBER, `New membership enquiry: ${enquiry.name}, ${enquiry.plan}, ${enquiry.branch}, ${enquiry.phone}`) : Promise.resolve(false),
    ]);
    return NextResponse.json({ ok: true, id: enquiry.id, whatsappUrl: whatsappLink(`Hello! I submitted an enquiry for the ${enquiry.plan} membership at ${enquiry.branch}. My reference is ${enquiry.id}.`) }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to process enquiry." }, { status: 500 });
  }
}
