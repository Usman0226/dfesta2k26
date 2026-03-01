"use client";

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import BrandReveal from './BrandReveal';
import { CountDown } from "./ui/skiper-ui/CountDown";
import { useAnimationContext } from '@/context/AnimationContext';
import { TextGenerateEffect } from "./ui/text-generate-effect";

const Hero = () => {
    const { isRevealComplete, setRevealComplete } = useAnimationContext();

    // Shared smooth reveal — opacity + tiny lift + blur defocus
    // Everything is pre-rendered so the layout NEVER shifts.
    const smoothReveal = (delay = 0) => ({
        animate: {
            opacity: isRevealComplete ? 1 : 0,
            y: isRevealComplete ? 0 : 10,
        },
        transition: {
            duration: 0.6,
            delay,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
    });

    const ScrollToEvents = () => {
        const eventsSection = document.getElementById("events");
        if (eventsSection) {
            eventsSection.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20">

            {/* ── Ambient background ── */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-[10%] left-[5%] w-[50%] h-[50%] bg-primary/20 dark:bg-primary/10 blur-[130px] rounded-full" />
                <div className="absolute bottom-[10%] right-[5%] w-[50%] h-[50%] bg-secondary/20 dark:bg-secondary/15 blur-[130px] rounded-full" />

            </div>

            <div className="max-w-4xl w-full flex flex-col items-center text-center gap-8 relative z-10">

                <div className="w-full">
                    <BrandReveal onComplete={setRevealComplete} />
                </div>

                {/* ── Event Date ── */}
                {/* <AnimatePresence>

                    <div className="w-full flex items-center justify-center gap-4 sm:gap-6 mt-4 opacity-90">
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={isRevealComplete ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-[2px] w-16 sm:w-32 bg-gradient-to-r from-transparent via-primary/50 to-primary origin-right rounded-full"
                        />
                        <TextGenerateEffect
                            words="08.04.2025"
                            className="text-primary dark:text-primary font-mono tracking-[0.3em] text-lg sm:text-xl drop-shadow-[0_0_15px_rgba(245,158,11,0.5)]"
                            filter={true}
                            duration={1.8}
                        />
                        <motion.div
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={isRevealComplete ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                            className="h-[2px] w-16 sm:w-32 bg-gradient-to-l from-transparent via-secondary/50 to-secondary origin-left rounded-full"
                        />
                    </div>
                </AnimatePresence> */}

                <motion.div
                    animate={smoothReveal(0).animate}
                    transition={smoothReveal(0).transition}
                    className="w-full"
                    style={{ pointerEvents: isRevealComplete ? "auto" : "none" }}
                >
                    <CountDown />
                </motion.div>

                {/* ── Register CTA ──
                    Soft trailing entry — 250 ms after the countdown */}
                <AnimatePresence>

                    <motion.button
                        onClick={() => ScrollToEvents()}
                        animate={smoothReveal(0.25).animate}
                        transition={smoothReveal(0.25).transition}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.97 }}
                        style={{ pointerEvents: isRevealComplete ? "auto" : "none" }}
                        className="px-10 py-4 rounded-2xl bg-primary text-white font-bold text-base tracking-wide hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                    >
                        Explore Events
                    </motion.button>
                </AnimatePresence>
            </div>
        </section>
    );
};

export default Hero;