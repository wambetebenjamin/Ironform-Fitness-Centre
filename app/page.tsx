import Image from "next/image";
import Link from "next/link";
import {
  Bike,
  Car,
  CheckCircle,
  CupSoda,
  Dumbbell,
  HeartPulse,
  LockKeyhole,
  MapPin,
  ShowerHead,
  Timer,
  Trophy,
  Users,
  Zap,
} from "lucide-react";
import Hero from "@/components/Hero";
import Locations from "@/components/Locations";
import MembershipPlans from "@/components/MembershipPlans";
import Newsletter from "@/components/Newsletter";
import Reveal from "@/components/Reveal";
import Schedule from "@/components/Schedule";
import Testimonials from "@/components/Testimonials";
import TrainerGrid from "@/components/TrainerGrid";
import { blurDataURL } from "@/lib/blur";
import { blogPosts, classCategories, whatsappLink } from "@/lib/data";
import { businessPhone, siteUrl } from "@/lib/constants";

const facilities = [
  { name: "Free Weights Zone", icon: Dumbbell, detail: "Racks, plates and platforms" },
  { name: "Cardio Floor", icon: HeartPulse, detail: "Premium connected equipment" },
  { name: "Group Class Studio", icon: Users, detail: "Space that moves with you" },
  { name: "Olympic Lifting Platform", icon: Trophy, detail: "Built for serious lifting" },
  { name: "Changing Rooms & Showers", icon: ShowerHead, detail: "Clean, secure and refreshed" },
  { name: "Juice Bar", icon: CupSoda, detail: "Fuel before or after training" },
  { name: "Locker Storage", icon: LockKeyhole, detail: "Secure daily storage" },
  { name: "Parking", icon: Car, detail: "Easy access at both branches" },
];

const transformations = [
  { name: "Amina", duration: "12 weeks of coached consistency", start: "/images/transformation-amina-start.jpg", after: "/images/transformation-amina-now.jpg" },
  { name: "Brian", duration: "16 weeks of strength training", start: "/images/transformation-brian-start.jpg", after: "/images/transformation-brian-now.jpg" },
];

const nutritionPlans = [
  { name: "Basic", detail: "Everyday structure for healthier habits", tag: "Foundation" },
  { name: "Performance", detail: "Training-day fuel and recovery support", tag: "Most popular" },
  { name: "Competition", detail: "Periodised support for peak performance", tag: "Advanced" },
];

export default function HomePage() {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "SportsActivityLocation"],
    name: "Ironform Fitness Centre",
    image: `${siteUrl}/images/hero.jpg`,
    url: siteUrl,
    telephone: businessPhone,
    priceRange: "KES 6,500–59,000",
    address: [
      { "@type": "PostalAddress", streetAddress: "Waiyaki Way, Westlands", addressLocality: "Nairobi", addressCountry: "KE" },
      { "@type": "PostalAddress", streetAddress: "Ngong Road, Karen", addressLocality: "Nairobi", addressCountry: "KE" },
    ],
    openingHours: ["Mo-Fr 05:00-23:00", "Sa 06:00-22:00", "Su 07:00-20:00"],
  };

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <Hero />

      <section className="section classes-section" id="classes">
        <div className="container">
          <div className="section-heading heading-row">
            <div><p className="eyebrow">Find your session</p><h2>Six ways to move.<br />One standard.</h2></div>
            <p>Expert coaching, clear progression and a team that learns your name. Start where you are.</p>
          </div>
          <div className="class-grid">
            {classCategories.map((item, index) => (
              <Reveal delay={index * 60} key={item.slug}>
                <Link className="class-card" href={`/classes/${item.slug}`}>
                  <div className="class-image"><Image src={item.image} alt={`Ironform ${item.name} class`} fill sizes="(max-width: 767px) 62vw, 16vw" className="cover-image" placeholder="blur" blurDataURL={blurDataURL} /></div>
                  <div className="class-name"><span>{String(index + 1).padStart(2, "0")}</span><h3>{item.name}</h3></div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section schedule-section" id="schedule">
        <div className="container">
          <div className="section-heading heading-row light-heading">
            <div><p className="eyebrow">This week at Ironform</p><h2>Your next class<br />starts here.</h2></div>
            <p>Choose a day, find your pace and secure your spot. Members can book across both Nairobi branches.</p>
          </div>
          <Schedule compact />
          <div className="section-link-row"><Link className="text-link light-link" href="/schedule">Open full weekly schedule <span>→</span></Link></div>
        </div>
      </section>

      <section className="section membership-section" id="memberships">
        <div className="container">
          <div className="section-heading centered-heading"><p className="eyebrow">Memberships</p><h2>Commit to your stronger.</h2><p>Simple plans. Two branches. No hidden extras.</p></div>
          <MembershipPlans />
        </div>
      </section>

      <section className="section trainers-section" id="trainers">
        <div className="container">
          <div className="section-heading heading-row">
            <div><p className="eyebrow">Meet your coaches</p><h2>Guidance that<br />gets results.</h2></div>
            <p>Certified Nairobi coaches with the experience to push athletes and the patience to guide beginners.</p>
          </div>
          <TrainerGrid />
        </div>
      </section>

      <section className="section transformation-section" id="transformations">
        <div className="container">
          <div className="section-heading heading-row light-heading">
            <div><p className="eyebrow"><Trophy size={16} /> Real progress</p><h2>Built, not given.</h2></div>
            <p>Consistency changes everything. These members trained with structure, patience and full coach support.</p>
          </div>
          <div className="transform-grid">
            {transformations.map((item) => (
              <article className="transformation-card" key={item.name}>
                <div className="transform-photos">
                  <Reveal direction="left" className="transform-image"><Image src={item.start} alt={`${item.name} at the start of their Ironform programme`} fill sizes="(max-width: 767px) 100vw, 25vw" className="cover-image" placeholder="blur" blurDataURL={blurDataURL} /><span>Start</span></Reveal>
                  <Reveal direction="right" className="transform-image"><Image src={item.after} alt={`${item.name} training during their Ironform programme`} fill sizes="(max-width: 767px) 100vw, 25vw" className="cover-image" placeholder="blur" blurDataURL={blurDataURL} /><span>Now</span></Reveal>
                </div>
                <div className="transform-caption"><h3>{item.name}</h3><p>{item.duration}</p></div>
              </article>
            ))}
          </div>
          <p className="results-note">Individual results vary. Sustainable progress depends on training consistency, nutrition and recovery.</p>
        </div>
      </section>

      <section className="section nutrition-section" id="nutrition">
        <div className="container nutrition-layout">
          <div className="nutrition-story">
            <div className="nutrition-image"><Image src="/images/nutrition.jpg" alt="Fresh balanced nutrition prepared for active training" fill sizes="(max-width: 900px) 100vw, 48vw" className="cover-image" placeholder="blur" blurDataURL={blurDataURL} /></div>
            <div className="nutrition-copy"><p className="eyebrow">Eat for the work</p><h2>Training is only half the equation.</h2><p>Our coaches translate nutrition science into practical choices that fit Nairobi life—no fads, imported routines or impossible meal prep.</p><div className="nutrition-points"><span><CheckCircle size={17} /> Local-food meal structures</span><span><CheckCircle size={17} /> Goal-based portions</span><span><CheckCircle size={17} /> Monthly coach check-in</span></div></div>
          </div>
          <div className="nutrition-plans">
            {nutritionPlans.map((plan, index) => <Reveal delay={index * 70} key={plan.name}><article className="nutrition-plan"><span>{plan.tag}</span><div><h3>{plan.name}</h3><p>{plan.detail}</p></div><Zap size={20} /></article></Reveal>)}
            <a className="button button-red button-wide" target="_blank" rel="noreferrer" href={whatsappLink("Hello! I would like to get an Ironform nutrition plan.")}>Get my nutrition plan</a>
          </div>
        </div>
      </section>

      <section className="section facilities-section" id="facilities">
        <div className="container">
          <div className="section-heading centered-heading"><p className="eyebrow">Inside Ironform</p><h2>Everything you need. Nothing you don&apos;t.</h2></div>
          <div className="facilities-grid">
            {facilities.map(({ name, icon: Icon, detail }) => <Reveal key={name}><article className="facility-card"><Icon size={26} /><h3>{name}</h3><p>{detail}</p></article></Reveal>)}
          </div>
        </div>
      </section>

      <section className="section locations-section" id="locations">
        <div className="container">
          <div className="section-heading heading-row"><div><p className="eyebrow"><MapPin size={16} /> Two Nairobi branches</p><h2>Find your Ironform.</h2></div><p>Early starts, late finishes and a team ready when you are. Choose the branch that fits your day.</p></div>
          <Locations />
        </div>
      </section>

      <section className="trial-band">
        <div className="container trial-inner">
          <Reveal className="trial-copy"><p className="eyebrow">No pressure. All energy.</p><h2 aria-label="Your first session is free.">{["Your", "first", "session", "is", "free."].map((word, index) => <span style={{ "--word-delay": `${index * 55}ms` } as React.CSSProperties} key={word}>{word} </span>)}</h2></Reveal>
          <a className="button button-white" target="_blank" rel="noreferrer" href={whatsappLink("Hello! I would like to claim my free trial session at Ironform Fitness Centre.")}>Claim free trial</a>
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="container">
          <div className="section-heading heading-row"><div><p className="eyebrow">Member stories</p><h2>Nairobi gets<br />stronger here.</h2></div><p>Goals change. The feeling of showing up for yourself never does.</p></div>
          <Testimonials />
        </div>
      </section>

      <section className="section blog-section" id="blog">
        <div className="container">
          <div className="section-heading heading-row"><div><p className="eyebrow">Ironform field notes</p><h2>Train smarter.</h2></div><Link className="text-link" href="/blog">See all articles <span>→</span></Link></div>
          <div className="blog-grid">
            {blogPosts.map((post) => <article className="blog-card" key={post.slug}><Link href={`/blog/${post.slug}`} className="blog-image"><Image src={post.image} alt="" fill sizes="(max-width: 767px) 100vw, 33vw" className="cover-image" placeholder="blur" blurDataURL={blurDataURL} /></Link><div className="blog-body"><p className="eyebrow">{post.category} · {new Date(post.date).toLocaleDateString("en-KE", { day: "numeric", month: "short" })}</p><h3><Link href={`/blog/${post.slug}`}>{post.title}</Link></h3><p>{post.excerpt}</p><Link className="text-link" href={`/blog/${post.slug}`}>Read article <span>→</span></Link></div></article>)}
          </div>
        </div>
      </section>

      <section className="newsletter-section"><Newsletter /></section>
    </main>
  );
}
