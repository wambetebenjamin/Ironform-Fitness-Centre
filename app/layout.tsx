import type { Metadata, Viewport } from "next";
import "@fontsource/barlow/400.css";
import "@fontsource/barlow/600.css";
import "@fontsource/barlow/700.css";
import "@fontsource/barlow-condensed/700.css";
import "@fontsource/barlow-condensed/900.css";
import "./globals.css";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import PwaRegister from "@/components/PwaRegister";
import WhatsAppButton from "@/components/WhatsAppButton";
import { siteUrl } from "@/lib/constants";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: "Ironform Fitness Centre | Nairobi Gym", template: "%s | Ironform Fitness Centre" },
  description: "High-energy gym training, expert coaches and group fitness classes in Westlands and Karen, Nairobi.",
  keywords: ["gym Nairobi", "gym Westlands", "gym Karen", "fitness classes Nairobi", "personal trainer Nairobi"],
  openGraph: {
    type: "website",
    locale: "en_KE",
    url: siteUrl,
    siteName: "Ironform Fitness Centre",
    title: "Train Hard. Live Stronger. | Ironform Nairobi",
    description: "Nairobi's leading fitness centre. Train in Westlands or Karen.",
    images: [{ url: "/images/hero.jpg", width: 1125, height: 750, alt: "Athlete training at Ironform Fitness Centre" }],
  },
  twitter: { card: "summary_large_image", title: "Ironform Fitness Centre", description: "Train hard. Live stronger in Westlands and Karen, Nairobi.", images: ["/images/hero.jpg"] },
  manifest: "/manifest.webmanifest",
  icons: { icon: [{ url: "/icon.svg", type: "image/svg+xml" }, { url: "/icons/icon-192.png", sizes: "192x192" }], apple: "/icons/icon-192.png" },
};

export const viewport: Viewport = { themeColor: "#0b1f33", width: "device-width", initialScale: 1 };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <PwaRegister />
        <Navbar />
        {children}
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
