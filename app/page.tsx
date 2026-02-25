"use client";

import { useEffect, useState } from "react";
import { useAnimationContext } from "@/context/AnimationContext";
import { AnimatePresence, motion } from "framer-motion";
import Launch from "@/components/Launch";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EventsList from "@/components/EventsList";
import Footer from "@/components/Footer";

// How long the Launch content animations play before the overlay glides up.
// Launch content finishes at ~3.2 s — we hold for an extra beat then exit.
const LAUNCH_HOLD_MS = 3000;

export default function Home() {
  const { setShouldStartBrandReveal } = useAnimationContext();
  const [showLaunch, setShowLaunch] = useState(true);

  // Automatically trigger the glide-up exit after the Launch content has played
  useEffect(() => {
    const t = setTimeout(() => setShowLaunch(false), LAUNCH_HOLD_MS);
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      {/* ── Launch overlay ─────────────────────────────────────────
                White background, glides up after LAUNCH_HOLD_MS.
                onExitComplete fires after the slide finishes → tells
                BrandReveal to start its D'FESTA stroke animation.
            ──────────────────────────────────────────────────────────── */}
      <AnimatePresence onExitComplete={setShouldStartBrandReveal}>
        {showLaunch && (
          <motion.div
            key="launch"
            initial={{ y: "0%", borderBottomLeftRadius: "12px", borderBottomRightRadius: "12px" }}
            exit={{
              y: "-100%",
              borderBottomLeftRadius: "52px",
              borderBottomRightRadius: "52px",
            }}
            transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
            // Hard-coded white so the launch page is always on white,
            // regardless of the user's current OS / app theme.
            style={{ backgroundColor: "#ffffff" }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          >
            <Launch />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main page content ── */}
      <Navbar />
      <main>
        <Hero />
        <EventsList />
      </main>
      <Footer />
    </>
  );
}
