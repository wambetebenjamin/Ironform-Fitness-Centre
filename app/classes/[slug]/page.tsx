import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import Schedule from "@/components/Schedule";
import { blurDataURL } from "@/lib/blur";
import { classCategories, whatsappLink } from "@/lib/data";
import { siteUrl } from "@/lib/constants";

export function generateStaticParams() { return classCategories.map(item => ({ slug: item.slug })); }

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const item = classCategories.find(value => value.slug === params.slug);
  if (!item) return {};
  return { title: `${item.name} Classes Nairobi`, description: `${item.description} Join ${item.name} at Ironform Westlands or Karen.`, openGraph: { title: `${item.name} at Ironform`, description: item.description, url: `${siteUrl}/classes/${item.slug}`, images: [{ url: item.image }] } };
}

export default function ClassPage({ params }: { params: { slug: string } }) {
  const item = classCategories.find(value => value.slug === params.slug);
  if (!item) notFound();
  return <main className="inner-page class-detail"><section className="class-detail-hero"><Image src={item.image} alt={`Ironform ${item.name} training`} fill priority sizes="100vw" className="cover-image" placeholder="blur" blurDataURL={blurDataURL} /><div className="class-detail-scrim" /><div className="container"><p className="eyebrow">Coached at Westlands & Karen</p><h1>{item.name}</h1><p>{item.description}</p><a className="button button-red" href={whatsappLink(`Hello! I would like to try the ${item.name} class at Ironform Fitness Centre.`)} target="_blank" rel="noreferrer">Try this class</a></div></section><section className="section dark-page"><div className="container"><div className="section-heading light-heading"><p className="eyebrow">Weekly timetable</p><h2>Book your next class.</h2></div><Schedule compact /></div></section></main>;
}
