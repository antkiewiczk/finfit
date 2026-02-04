import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

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
    default: "FinFit Blog - Personal Finance & Fitness",
    template: "%s | FinFit Blog"
  },
  description: "Your trusted source for personal finance and fitness insights. Helping you build wealth and health, one article at a time.",
  keywords: ["personal finance", "fitness", "health", "budgeting", "investing", "workout", "nutrition"],
  authors: [{ name: "FinFit Blog" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://finfit.blog",
    siteName: "FinFit Blog",
    title: "FinFit Blog - Personal Finance & Fitness",
    description: "Your trusted source for personal finance and fitness insights.",
  },
  twitter: {
    card: "summary_large_image",
    title: "FinFit Blog - Personal Finance & Fitness",
    description: "Your trusted source for personal finance and fitness insights.",
  },
  metadataBase: new URL("https://finfit.blog"),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
