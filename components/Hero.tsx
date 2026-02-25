"use client";

import React from 'react';
import { motion } from 'framer-motion';
import BrandReveal from './BrandReveal';
import { CountDown } from "./ui/skiper-ui/CountDown";
import { useAnimationContext } from '@/context/AnimationContext';

const Hero = () => {
    const { isRevealComplete, setRevealComplete } = useAnimationContext();

    // Shared smooth reveal — opacity + tiny lift + blur defocus
    // Everything is pre-rendered so the layout NEVER shifts.
    const smoothReveal = (delay = 0) => ({
        animate: {
            opacity: isRevealComplete ? 1 : 0,
            y: isRevealComplete ? 0 : 10,
            filter: isRevealComplete ? "blur(0px)" : "blur(6px)",
        },
        transition: {
            duration: 0.85,
            delay,
            ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
        },
    });

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-20">

            {/* ── Ambient background ── */}
            <div className="absolute inset-0 pointer-events-none -z-10">
                <div className="absolute top-[10%] left-[5%] w-[50%] h-[50%] bg-primary/20 dark:bg-primary/10 blur-[130px] rounded-full" />
                <div className="absolute bottom-[10%] right-[5%] w-[50%] h-[50%] bg-secondary/20 dark:bg-secondary/15 blur-[130px] rounded-full" />
                <div
                    className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06]"
                    style={{
                        backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)',
                        backgroundSize: '40px 40px',
                    }}
                />
            </div>

            <div className="max-w-4xl w-full flex flex-col items-center text-center gap-8 relative z-10">

                {/* ── D'FESTA brand reveal ── */}
                <div className="w-full">
                    <BrandReveal onComplete={setRevealComplete} />
                </div>

                {/* ── Countdown ──
                    Always rendered (no layout shift), fades in with blur defocus */}
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
                <motion.button
                    animate={smoothReveal(0.25).animate}
                    transition={smoothReveal(0.25).transition}
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.97 }}
                    style={{ pointerEvents: isRevealComplete ? "auto" : "none" }}
                    className="px-10 py-4 rounded-2xl bg-primary text-white font-bold text-base tracking-wide hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
                >
                    Register Now
                </motion.button>
            </div>
        </section>
    );
};

export default Hero;
