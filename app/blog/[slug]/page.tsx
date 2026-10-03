import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ArticleBody from "@/components/ArticleBody";
import { blurDataURL } from "@/lib/blur";
import { getArticle, getArticles } from "@/lib/blog";
import { siteUrl } from "@/lib/constants";

export async function generateStaticParams() { return (await getArticles()).map(article => ({ slug: article.slug })); }

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const article = await getArticle(params.slug);
  if (!article) return {};
  return { title: article.title, description: article.excerpt, openGraph: { type: "article", url: `${siteUrl}/blog/${article.slug}`, title: article.title, description: article.excerpt, publishedTime: article.date, images: [{ url: article.image }] } };
}

export default async function ArticlePage({ params }: { params: { slug: string } }) {
  const article = await getArticle(params.slug);
  if (!article) notFound();
  return <main className="inner-page article-page"><article><header className="article-header container"><p className="eyebrow">{article.category} · {new Date(article.date).toLocaleDateString("en-KE", { day: "numeric", month: "long", year: "numeric" })}</p><h1>{article.title}</h1><p>{article.excerpt}</p></header><div className="article-hero"><Image src={article.image} alt="" fill priority sizes="100vw" className="cover-image" placeholder="blur" blurDataURL={blurDataURL} /></div><div className="container article-shell"><ArticleBody body={article.body} /></div></article></main>;
}
