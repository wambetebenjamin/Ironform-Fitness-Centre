import type { Metadata } from "next";

export const metadata: Metadata = { title: "Image Credits" };
const credits = [
  ["Hero boxing", "https://www.pexels.com/photo/a-boxer-looking-at-the-black-boxing-gloves-he-is-wearing-4804258/"],
  ["Strength training", "https://www.pexels.com/photo/man-holding-black-barbell-in-the-gym-4720813/"],
  ["Group fitness and HIIT", "https://www.pexels.com/photo/photo-of-women-exercising-4662354/"],
  ["Boxing training", "https://www.pexels.com/photo/focused-black-overweight-female-punching-boxing-bag-6456179/"],
  ["Dumbbell training", "https://www.pexels.com/photo/black-man-training-with-dumbbells-in-gym-6455963/"],
  ["Trainer portrait", "https://www.pexels.com/photo/a-fit-woman-in-black-tank-top-and-blue-leggings-5132089/"],
  ["Healthy food", "https://www.pexels.com/photo/person-eating-vegetable-salad-5836986/"],
];
export default function CreditsPage() { return <main className="inner-page"><section className="page-hero container legal-shell"><p className="eyebrow">Attribution</p><h1>Image credits.</h1><p>All site photography is locally hosted and sourced from Pexels under its free media licence.</p><div className="article-content">{credits.map(([label, href]) => <p key={href}><a className="text-link" href={href} target="_blank" rel="noreferrer">{label} <span>→</span></a></p>)}</div></section></main>; }
