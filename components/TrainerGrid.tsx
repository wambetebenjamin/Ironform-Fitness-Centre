"use client";

import Image from "next/image";
import { Award, Clock3 } from "lucide-react";
import { useEffect, useRef } from "react";
import VanillaTilt from "vanilla-tilt";
import { blurDataURL } from "@/lib/blur";
import { trainers, whatsappLink } from "@/lib/data";

export default function TrainerGrid() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.matchMedia("(max-width: 767px)").matches) return;
    const cards = gridRef.current?.querySelectorAll<HTMLElement>(".trainer-card");
    if (!cards) return;
    VanillaTilt.init(cards, { max: 10, speed: 280, glare: false, scale: 1.01 });
    return () => cards.forEach((card) => card.vanillaTilt?.destroy());
  }, []);

  return (
    <div className="trainer-grid" ref={gridRef}>
      {trainers.map((trainer) => (
        <article className="trainer-card" key={trainer.name}>
          <div className="trainer-image">
            <Image src={trainer.image} alt={`${trainer.name}, ${trainer.specialisation} trainer at Ironform`} fill sizes="(max-width: 767px) 100vw, (max-width: 1100px) 50vw, 25vw" className="cover-image" placeholder="blur" blurDataURL={blurDataURL} />
          </div>
          <div className="trainer-body">
            <p className="eyebrow">{trainer.specialisation}</p>
            <h3>{trainer.name}</h3>
            <p className="trainer-meta"><Award size={16} />{trainer.certifications}</p>
            <p className="trainer-meta"><Clock3 size={16} />{trainer.experience} years experience</p>
            <a className="text-link" href={whatsappLink(`Hello! I would like to book a session with ${trainer.name} at Ironform Fitness Centre.`)} target="_blank" rel="noreferrer">Book a session <span>→</span></a>
          </div>
        </article>
      ))}
    </div>
  );
}
