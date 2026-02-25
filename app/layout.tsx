import type { Metadata } from "next";
import { Geist, Geist_Mono, Dancing_Script, Outfit } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { AnimationProvider } from "@/context/AnimationContext";

/* ── Body / UI fonts ─────────────────────────────────── */
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

/* ── Display font (DATA SCIENCE, sub-headings) ───────── */
const outfit = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
});

/* ── Script / calligraphic font (D'FESTA lettering) ───── */
const dancingScript = Dancing_Script({
  variable: "--font-script",
  subsets: ["latin"],
  weight: ["700"],
});

export const metadata: Metadata = {
  title: "D'FESTA 2k26 | Dept. of Data Science, MITS",
  description: "A technical symposium by the Department of CSE-Data Science, MITS Deemed to be University.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${outfit.variable} ${dancingScript.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <AnimationProvider>
            {children}
          </AnimationProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
