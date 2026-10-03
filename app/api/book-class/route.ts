import { NextResponse } from "next/server";
import { whatsappLink } from "@/lib/data";
import { normalizePhone, sendEmail, sendWhatsApp } from "@/lib/server/notifications";
import { saveRecord } from "@/lib/server/store";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const fields = ["name", "phone", "email", "className", "day", "time", "trainer"];
    if (fields.some(field => typeof body[field] !== "string" || !body[field].trim() || body[field].length > 120)) return NextResponse.json({ error: "Please provide valid booking details." }, { status: 400 });
    if (!/^\S+@\S+\.\S+$/.test(body.email)) return NextResponse.json({ error: "Please provide a valid email." }, { status: 400 });

    const booking = { id: crypto.randomUUID(), name: body.name.trim(), phone: normalizePhone(body.phone), email: body.email.trim().toLowerCase(), className: body.className.trim(), day: body.day.trim(), time: body.time.trim(), trainer: body.trainer.trim(), createdAt: new Date().toISOString() };
    await saveRecord("bookings", booking);
    const confirmation = `Hi ${booking.name}, your Ironform request for ${booking.className} on ${booking.day} at ${booking.time} has been received. Our team will confirm your spot shortly.`;
    const [whatsappSent, emailSent] = await Promise.all([
      sendWhatsApp(booking.phone, confirmation),
      sendEmail({ to: booking.email, subject: `Ironform booking: ${booking.className}`, html: `<h1>Booking received</h1><p>${confirmation}</p><p>${booking.trainer} · ${booking.day} at ${booking.time}</p>` }),
    ]);
    return NextResponse.json({ ok: true, id: booking.id, whatsappSent, emailSent, whatsappUrl: whatsappLink(`Hello! I have requested ${booking.className} on ${booking.day} at ${booking.time}. My booking reference is ${booking.id}.`) }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Unable to process booking." }, { status: 500 });
  }
}
