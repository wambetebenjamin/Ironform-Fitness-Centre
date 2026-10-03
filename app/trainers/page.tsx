import type { Metadata } from "next";
import TrainerGrid from "@/components/TrainerGrid";

export const revalidate = 300;
export const metadata: Metadata = { title: "Personal Trainers", description: "Meet Ironform's certified strength, HIIT, boxing, endurance, yoga and mobility coaches in Nairobi." };

export default function TrainersPage() {
  return <main className="inner-page"><section className="page-hero container"><p className="eyebrow">Nairobi coaches</p><h1>Guidance that moves you.</h1><p>Book a one-to-one session with the coach who fits your goals.</p></section><section className="container standalone-grid"><TrainerGrid /></section></main>;
}
