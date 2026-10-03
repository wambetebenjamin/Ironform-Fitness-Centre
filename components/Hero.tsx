import Image from "next/image";
import Link from "next/link";
import { ArrowDown, MapPin } from "lucide-react";
import { blurDataURL } from "@/lib/blur";
import HeroWeight from "./HeroWeight";

const words = ["Train", "Hard.", "Live", "Stronger."];

export default function Hero() {
  return (
    <>
      <section id="home" className="hero">
        <Image src="/images/hero.jpg" alt="African boxer training with focus in a gym" fill priority sizes="100vw" className="hero-photo" placeholder="blur" blurDataURL={blurDataURL} />
        <div className="hero-scrim" />
        <div className="container hero-inner">
          <div className="hero-copy">
            <p className="eyebrow hero-kicker"><MapPin size={15} /> Westlands & Karen, Nairobi</p>
            <h1 aria-label="Train hard. Live stronger.">
              {words.map((word, index) => (
                <span className={`slam-word ${index === 2 ? "word-break" : ""}`} style={{ animationDelay: `${index * 0.08 + 0.08}s` }} key={word}>{word}</span>
              ))}
            </h1>
            <p className="hero-subline">Nairobi&apos;s leading fitness centre. Westlands and Karen.</p>
            <div className="hero-actions">
              <Link className="button button-red" href="#memberships">Join now</Link>
              <Link className="button button-outline-light" href="#classes">View classes</Link>
            </div>
          </div>
          <HeroWeight />
          <Link href="#classes" className="hero-scroll" aria-label="Scroll to classes"><ArrowDown size={20} /></Link>
        </div>
      </section>
      <div className="announcement" role="region" aria-label="Gym announcements">
        <div className="announcement-track">
          {[0, 1].map((group) => (
            <div className="announcement-group" aria-hidden={group === 1} key={group}>
              <span>New Zumba class Tuesdays 6pm</span><b>•</b><span>Free trial session this week</span><b>•</b><span>Open 5am to 11pm daily</span><b>•</b>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
