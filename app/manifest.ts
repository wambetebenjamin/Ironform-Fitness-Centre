import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Ironform Fitness Centre",
    short_name: "Ironform",
    description: "Gym memberships and class bookings for Ironform Westlands and Karen.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f3ee",
    theme_color: "#0b1f33",
    icons: [
      { src: "/icons/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icons/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
