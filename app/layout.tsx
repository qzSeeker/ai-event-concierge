import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "AI Event Concierge Platform",
    template: "%s | AI Event Concierge",
  },
  description:
    "AI-powered event planning platform that generates smart venue proposals based on natural language input. Built for corporate offsites and team retreats.",
  
  keywords: [
    "AI Event Planner",
    "Event Concierge",
    "Corporate Offsite Planning",
    "AI Venue Suggestions",
    "Next.js AI App",
    "LLM Event Planning",
  ],

  authors: [{ name: "Arpit Yadav" }],
  creator: "Arpit Yadav - qzseeker",

  metadataBase: new URL("https://ai-event-concierge-beta.vercel.app"),

  openGraph: {
    title: "AI Event Concierge Platform",
    description:
      "Plan corporate events effortlessly with AI. Get venue suggestions, cost estimates, and tailored recommendations instantly.",
    url: "https://ai-event-concierge-beta.vercel.app/",
    siteName: "AI Event Concierge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "AI Event Concierge Platform",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "AI Event Concierge Platform",
    description:
      "AI-powered platform to plan corporate offsites with smart venue recommendations.",
    images: ["/og-image.png"],
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-white text-black`}
      >
        {children}
      </body>
    </html>
  );
}