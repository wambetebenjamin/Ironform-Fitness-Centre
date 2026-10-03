type EmailMessage = { to: string; subject: string; html: string };

export function normalizePhone(input: string) {
  const digits = input.replace(/\D/g, "");
  if (digits.startsWith("254")) return digits;
  if (digits.startsWith("0")) return `254${digits.slice(1)}`;
  return digits;
}

export async function sendWhatsApp(to: string, message: string) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneId || !to) return false;
  const response = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ messaging_product: "whatsapp", recipient_type: "individual", to: normalizePhone(to), type: "text", text: { preview_url: false, body: message } }),
  });
  return response.ok;
}

export async function sendEmail({ to, subject, html }: EmailMessage) {
  const token = process.env.RESEND_API_KEY;
  if (!token || !to) return false;
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: process.env.EMAIL_FROM || "Ironform <bookings@ironformfitness.co.ke>", to: [to], subject, html }),
  });
  return response.ok;
}
