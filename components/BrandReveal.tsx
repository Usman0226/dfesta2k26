"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAnimationContext } from '@/context/AnimationContext';

const BrandReveal = ({ onComplete }: { onComplete: () => void }) => {
    const { shouldStartBrandReveal } = useAnimationContext();

    const text = "D'FESTA";
    const letters = text.split("");

    // How long after shouldStartBrandReveal=true before we call onComplete
    // (Navbar + Hero CTA animate in). Covers all stroke + fill animations.
    const TOTAL_MS = 5500;

    // Start the completion timer only once the overlay has fully exited
    useEffect(() => {
        if (!shouldStartBrandReveal) return;
        const timer = setTimeout(onComplete, TOTAL_MS);
        return () => clearTimeout(timer);
    }, [shouldStartBrandReveal, onComplete]);

    // Per-letter stroke animation timings — no upfront START_DELAY needed
    // because we now wait for shouldStartBrandReveal before animating at all.
    const STROKE_DURATION = 0.9;
    const STAGGER_DELAY = 0.45;
    const FILL_DELAY = letters.length * STAGGER_DELAY + STROKE_DURATION - 0.2;

    const getLetterStroke = (i: number) => ({
        hidden: { strokeDashoffset: 3000, opacity: 0 },
        visible: {
            strokeDashoffset: 0,
            opacity: 1,
            transition: {
                strokeDashoffset: {
                    duration: STROKE_DURATION,
                    delay: i * STAGGER_DELAY,
                    ease: "easeInOut",
                },
                opacity: {
                    duration: 0.01,
                    delay: i * STAGGER_DELAY,
                },
            } as any,
        },
    });

    const getLetterFill = (i: number) => ({
        hidden: { fillOpacity: 0 },
        visible: {
            fillOpacity: 1,
            transition: {
                duration: 0.5,
                delay: FILL_DELAY + i * 0.05,
                ease: "easeOut",
            } as any,
        },
    });

    const subTextAnim = {
        hidden: { opacity: 0, y: 10, letterSpacing: "0.2em" },
        visible: {
            opacity: 0.7,
            y: 0,
            letterSpacing: "0.5em",
            transition: {
                duration: 0.8,
                delay: FILL_DELAY + 0.4,
                ease: "easeOut",
            } as any,
        },
    };

    // Gate: don't animate at all until the Launch overlay has exited
    const animateState = shouldStartBrandReveal ? "visible" : "hidden";

    return (
        <div className="relative flex flex-col items-center justify-center pb-2 min-h-[300px]">
            <svg className="absolute w-0 h-0">
                <defs>
                    <linearGradient id="ink-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#6366f1" />
                    </linearGradient>

                    <filter id="writing-glow" x="-50%" y="-50%" width="200%" height="200%">
                        <feGaussianBlur stdDeviation="3.5" result="blur" />
                        <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0" />
                        <feComposite in="SourceGraphic" in2="blur" operator="over" />
                    </filter>
                </defs>
            </svg>

            <motion.svg
                viewBox="0 0 800 280"
                className="w-full h-auto overflow-visible"
                initial="hidden"
                animate={animateState}
            >
                {/* Main Script Text */}
                <g
                    style={{
                        fontFamily: "var(--font-script)",
                        fontSize: "200",
                        fontWeight: "bold",
                        fontStyle: "italic",
                    }}
                >
                    {letters.map((letter, i) => {
                        const xPos = 70 + (i * 93);
                        return (
                            <g key={i} transform={`translate(${xPos}, 210)`}>
                                {/* Stroke layer — draws each letter like a pen */}
                                <motion.text
                                    x="0"
                                    y="0"
                                    textAnchor="middle"
                                    strokeDasharray="3000"
                                    initial="hidden"
                                    animate={animateState}
                                    variants={getLetterStroke(i)}
                                    style={{
                                        stroke: "url(#ink-gradient)",
                                        strokeWidth: "5",
                                        fill: "transparent",
                                        strokeLinecap: "round",
                                        strokeLinejoin: "round",
                                        filter: "url(#writing-glow)",
                                    }}
                                >
                                    {letter}
                                </motion.text>

                                {/* Fill layer — fades in after all strokes finish */}
                                <motion.text
                                    x="0"
                                    y="0"
                                    textAnchor="middle"
                                    initial="hidden"
                                    animate={animateState}
                                    variants={getLetterFill(i)}
                                    style={{ fill: "url(#ink-gradient)" }}
                                >
                                    {letter}
                                </motion.text>
                            </g>
                        );
                    })}
                </g>
            </motion.svg>

            {/* Professional subheading */}
            <motion.p
                variants={subTextAnim}
                initial="hidden"
                animate={animateState}
                className="mt-3 text-xs md:text-sm font-bold uppercase select-none flex items-center gap-2"
                style={{ fontFamily: "var(--font-display)", letterSpacing: "0.4em" }}
            >
                <span className="text-zinc-400 dark:text-zinc-500">DEPARTMENT OF</span>
                <span
                    style={{
                        background: "linear-gradient(to right, var(--color-primary), var(--color-secondary))",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        fontSize: "1.05em",
                    }}
                >
                    DATA SCIENCE
                </span>
            </motion.p>

            {/* Ambient depth */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/10 to-secondary/10 blur-[120px] rounded-full opacity-50 dark:opacity-40" />
        </div>
    );
};

export default BrandReveal;
