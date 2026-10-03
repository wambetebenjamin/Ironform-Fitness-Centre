import { promises as fs } from "node:fs";
import path from "node:path";

export type Article = {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  body: string;
};

function parseMdx(slug: string, source: string): Article {
  const match = source.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`Invalid article: ${slug}`);
  const metadata = Object.fromEntries(match[1].split("\n").filter(Boolean).map(line => {
    const [key, ...value] = line.split(":");
    return [key.trim(), value.join(":").trim()];
  }));
  return { slug, title: metadata.title, category: metadata.category, date: metadata.date, excerpt: metadata.excerpt, image: metadata.image, body: match[2].trim() };
}

export async function getArticles() {
  const directory = path.join(process.cwd(), "content/blog");
  const files = await fs.readdir(directory);
  const articles = await Promise.all(files.filter(file => file.endsWith(".mdx")).map(async file => parseMdx(file.replace(/\.mdx$/, ""), await fs.readFile(path.join(directory, file), "utf8"))));
  return articles.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getArticle(slug: string) {
  try {
    return parseMdx(slug, await fs.readFile(path.join(process.cwd(), "content/blog", `${slug}.mdx`), "utf8"));
  } catch {
    return null;
  }
}
