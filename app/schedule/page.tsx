import type { Metadata } from "next";
import Schedule from "@/components/Schedule";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Weekly Class Schedule", description: "Fresh weekly group fitness schedule for Ironform Westlands and Karen. Book strength, HIIT, yoga, boxing, Zumba and spinning." };

export default function SchedulePage() {
  return (
    <main className="inner-page dark-page">
      <section className="page-hero container"><p className="eyebrow">Live weekly timetable</p><h1>Find your next session.</h1><p>Schedules are rendered fresh on every visit. Choose a day and book your place with the Ironform team.</p></section>
      <section className="container page-schedule"><Schedule /></section>
    </main>
  );
}
