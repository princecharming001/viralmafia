import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "./components/smooth-scroll";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Viral Valley · go viral, together",
  description:
    "Viral Valley is an invite-only community for people growing a brand, personal or company, who want to learn how to go viral through events, workshops, and 30-day challenges with cash rewards.",
  openGraph: {
    title: "Viral Valley · go viral, together",
    description:
      "An invite-only community for people growing a personal or company brand who want to learn how to go viral through events, workshops, and 30-day challenges.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full">
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
