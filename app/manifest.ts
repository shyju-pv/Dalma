import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "Dalma Ayurvedic Treatment & Wellness Centre", short_name: "Dalma Ayurvedic", description: "Traditional Kerala Ayurveda in Sharjah", start_url: "/", display: "standalone", background_color: "#F3EFE5", theme_color: "#173F2A" };
}
