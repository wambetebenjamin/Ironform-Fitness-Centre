import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { blurDataURL } from "@/lib/blur";
import { getArticles } from "@/lib/blog";

export const metadata: Metadata = { title: "Workout & Nutrition Tips", description: "Practical training, nutrition and recovery advice from the Ironform Fitness Centre coaching team." };

export default async function BlogPage() {
  const articles = await getArticles();
  return <main className="inner-page"><section className="page-hero container"><p className="eyebrow">Ironform field notes</p><h1>Train smarter.</h1><p>Clear, practical guidance for stronger weeks in and out of the gym.</p></section><section className="container standalone-grid"><div className="blog-grid">{articles.map(article => <article className="blog-card" key={article.slug}><Link href={`/blog/${article.slug}`} className="blog-image"><Image src={article.image} alt="" fill sizes="(max-width: 767px) 100vw, 33vw" className="cover-image" placeholder="blur" blurDataURL={blurDataURL} /></Link><div className="blog-body"><p className="eyebrow">{article.category}</p><h2><Link href={`/blog/${article.slug}`}>{article.title}</Link></h2><p>{article.excerpt}</p><Link className="text-link" href={`/blog/${article.slug}`}>Read article <span>→</span></Link></div></article>)}</div></section></main>;
}
