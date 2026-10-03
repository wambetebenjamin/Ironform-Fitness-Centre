import { promises as fs } from "node:fs";
import path from "node:path";

type RecordValue = Record<string, unknown>;
const memory = new Map<string, string[]>();

async function kvCommand(command: (string | number)[]) {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  if (!url || !token) return false;
  const response = await fetch(url, {
    method: "POST",
    headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  if (!response.ok) throw new Error("Storage request failed");
  return true;
}

export async function saveRecord(collection: string, value: RecordValue) {
  const serialized = JSON.stringify(value);
  if (await kvCommand(["LPUSH", `ironform:${collection}`, serialized])) return;
  memory.set(collection, [serialized, ...(memory.get(collection) || [])].slice(0, 100));
  if (!process.env.VERCEL) {
    const file = path.join(process.cwd(), "data/local-submissions.jsonl");
    await fs.mkdir(path.dirname(file), { recursive: true });
    await fs.appendFile(file, `${JSON.stringify({ collection, ...value })}\n`, "utf8");
  }
}

export async function saveSubscriber(email: string) {
  if (await kvCommand(["SADD", "ironform:newsletter", email])) return;
  const current = memory.get("newsletter") || [];
  if (!current.includes(email)) memory.set("newsletter", [email, ...current]);
  if (!process.env.VERCEL) {
    const file = path.join(process.cwd(), "data/local-submissions.jsonl");
    await fs.appendFile(file, `${JSON.stringify({ collection: "newsletter", email, createdAt: new Date().toISOString() })}\n`, "utf8");
  }
}
