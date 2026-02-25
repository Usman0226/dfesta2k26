"use client";

import { useState, useRef } from "react";
import dynamic from "next/dynamic";
import { useAnimationContext } from "@/context/AnimationContext";
import { AnimatePresence, motion } from "framer-motion";
import Launch from "@/components/Launch";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import EventsList from "@/components/EventsList";
import Footer from "@/components/Footer";
import About from "@/components/About";

// Gallery JS is only fetched the first time the user clicks "Gallery"
const Gallery = dynamic(() => import("@/components/Gallery"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center py-32">
      <div className="w-7 h-7 rounded-full border-2 border-primary border-t-transparent animate-spin" />
    </div>
  ),
});

export default function Home() {
  const { setShouldStartBrandReveal } = useAnimationContext();
  const [showLaunch, setShowLaunch] = useState(true);
  const [showGallery, setShowGallery] = useState(false);
  const galleryRef = useRef<HTMLElement>(null);

  const handleGalleryClick = () => {
    setShowGallery(true);
    // Allow one tick for the section to mount before scrolling
    setTimeout(() => {
      galleryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 60);
  };

  return (
    <>
      {/* ── Launch overlay ── */}
      <AnimatePresence onExitComplete={setShouldStartBrandReveal}>
        {showLaunch && (
          <motion.div
            key="launch"
            initial={{ y: "0%", borderBottomLeftRadius: "12px", borderBottomRightRadius: "12px" }}
            exit={{ y: "-100%", borderBottomLeftRadius: "52px", borderBottomRightRadius: "52px" }}
            transition={{ duration: 1.0, ease: [0.76, 0, 0.24, 1] }}
            style={{ backgroundColor: "#ffffff" }}
            className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          >
            <Launch onComplete={() => setShowLaunch(false)} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Main page content ── */}
      <Navbar onGalleryClick={handleGalleryClick} />
      <main>
        <Hero />
        <EventsList />
        <About />

        {/* Gallery — only mounted after the user clicks the nav link */}
        <AnimatePresence>
          {showGallery && (
            <motion.section
              ref={galleryRef}
              id="gallery"
              key="gallery"
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <Gallery />
            </motion.section>
          )}
        </AnimatePresence>
      </main>
      <Footer />
    </>
  );
}
