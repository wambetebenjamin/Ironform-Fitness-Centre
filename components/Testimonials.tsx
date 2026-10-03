"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { blurDataURL } from "@/lib/blur";

const testimonials = [
  { name: "Njeri Mwangi", goal: "Lost 11 kg · built lasting strength", quote: "I came in nervous and never felt judged. The coaches made every movement clear, and now training is the best part of my week.", image: "/images/testimonial-njeri.jpg", rating: "5.0 / 5" },
  { name: "Omar Hassan", goal: "Completed first half marathon", quote: "Ironform gave my running structure. I am stronger, more consistent, and I recovered faster than I thought possible.", image: "/images/testimonial-omar.jpg", rating: "5.0 / 5" },
  { name: "Faith Atieno", goal: "Regained fitness after a long break", quote: "The Karen community kept me showing up. In four months I found my confidence, movement and energy again.", image: "/images/testimonial-faith.jpg", rating: "4.9 / 5" },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);
  const next = () => setIndex((current) => (current + 1) % testimonials.length);
  const previous = () => setIndex((current) => (current - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(next, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const item = testimonials[index];
  return (
    <div className="testimonial-shell">
      <article className="testimonial-card" key={item.name}>
        <div className="testimonial-photo"><Image src={item.image} alt={`${item.name}, Ironform member`} fill sizes="(max-width: 767px) 100vw, 36vw" className="cover-image" placeholder="blur" blurDataURL={blurDataURL} /></div>
        <div className="testimonial-copy">
          <Quote size={38} strokeWidth={1.5} />
          <blockquote>“{item.quote}”</blockquote>
          <p className="testimonial-name">{item.name}</p>
          <p className="testimonial-goal">{item.goal}</p>
          <p className="rating" aria-label={`Rated ${item.rating}`}>{item.rating}</p>
        </div>
      </article>
      <div className="carousel-controls">
        <button onClick={previous} aria-label="Previous testimonial"><ChevronLeft /></button>
        <span>{String(index + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}</span>
        <button onClick={next} aria-label="Next testimonial"><ChevronRight /></button>
      </div>
    </div>
  );
}
