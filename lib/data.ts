import scheduleData from "@/data/schedule.json";
import trainersData from "@/data/trainers.json";

export const whatsappNumber = "254112272061";
export const whatsappBase = `https://wa.me/${whatsappNumber}`;

export const classCategories = [
  { name: "Strength Training", slug: "strength-training", image: "/images/class-strength.jpg", description: "Build resilient, functional strength with coached compound lifts." },
  { name: "HIIT", slug: "hiit", image: "/images/class-hiit.jpg", description: "Fast, coached intervals that sharpen fitness and torch limits." },
  { name: "Yoga", slug: "yoga", image: "/images/class-yoga.jpg", description: "Move better, recover fully and build control from the ground up." },
  { name: "Boxing", slug: "boxing", image: "/images/class-boxing.jpg", description: "Learn clean technique, footwork and fight-level conditioning." },
  { name: "Zumba", slug: "zumba", image: "/images/class-zumba.jpg", description: "High-energy movement, big rhythm and a full-body cardio session." },
  { name: "Spinning", slug: "spinning", image: "/images/class-spinning.jpg", description: "Ride powerful climbs and sprints to a driving Nairobi beat." },
] as const;

export type ClassSlug = (typeof classCategories)[number]["slug"];

export type ScheduleItem = {
  time: string;
  name: string;
  slug: string;
  trainer: string;
  duration: number;
};

export const schedule = scheduleData as Record<string, ScheduleItem[]>;
export const trainers = trainersData;

export const memberships = [
  {
    name: "Starter",
    price: "6,500",
    duration: "Per month",
    featured: false,
    inclusions: ["Full gym access", "2 group classes weekly", "Fitness assessment", "Locker use", "Training app access", "1 guest pass"],
  },
  {
    name: "Elite",
    price: "17,500",
    duration: "Per quarter",
    featured: true,
    inclusions: ["Unlimited gym access", "Unlimited group classes", "Quarterly body scan", "Towel service", "Nutrition starter guide", "3 guest passes"],
  },
  {
    name: "Pro Annual",
    price: "59,000",
    duration: "Per year",
    featured: false,
    inclusions: ["Everything in Elite", "4 personal sessions", "Monthly body scan", "Priority class booking", "Both branch access", "Membership freeze"],
  },
];

export const blogPosts = [
  { slug: "build-a-stronger-week", title: "Build a Stronger Training Week", category: "Workout guide", excerpt: "A practical four-day split for strength, conditioning and recovery.", image: "/images/blog-workout.jpg", date: "2026-09-18" },
  { slug: "fuel-training-kenyan-foods", title: "Fuel Training With Kenyan Foods", category: "Nutrition", excerpt: "Smart, familiar meals for steady energy and stronger sessions.", image: "/images/blog-nutrition.jpg", date: "2026-09-12" },
  { slug: "recovery-is-training", title: "Recovery Is Part of Training", category: "Recovery", excerpt: "Sleep, mobility and pacing habits that help your progress stick.", image: "/images/blog-recovery.jpg", date: "2026-09-05" },
];

export function whatsappLink(message: string) {
  return `${whatsappBase}?text=${encodeURIComponent(message)}`;
}
