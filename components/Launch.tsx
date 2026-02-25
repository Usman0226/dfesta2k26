"use client";

import React from 'react';
import { motion } from "framer-motion";

type Ease4 = [number, number, number, number];
const EASE: Ease4 = [0.16, 1, 0.3, 1];

const fadeUp = (delay: number) => ({
    hidden: { opacity: 0, y: 18, filter: "blur(5px)" },
    show: {
        opacity: 1, y: 0, filter: "blur(0px)",
        transition: { duration: 0.5, delay, ease: EASE },
    },
});

const CharReveal = ({
    text,
    baseDelay,
    stagger = 0.042,
    duration = 0.55,
}: {
    text: string;
    baseDelay: number;
    stagger?: number;
    duration?: number;
}) => (
    <>
        {text.split("").map((ch, i) => (
            <span
                key={i}
                style={{
                    display: "inline-block",
                    overflow: "hidden",
                    lineHeight: 1.15,
                    verticalAlign: "bottom",
                }}
            >
                <motion.span
                    initial={{ y: "110%", opacity: 0 }}
                    animate={{ y: "0%", opacity: 1 }}
                    transition={{ delay: baseDelay + i * stagger, duration, ease: EASE }}
                    style={{ display: "inline-block", whiteSpace: "pre" }}
                >
                    {ch}
                </motion.span>
            </span>
        ))}
    </>
);

const Launch = () => (
    <motion.div
        className="relative flex flex-col items-center justify-center gap-0 text-center px-6 select-none rounded-b-2xl"
        initial="hidden"
        animate="show"
    >
        {/* Ambient glows */}
        <div className="absolute inset-0 -z-10 pointer-events-none">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[320px] bg-amber-400/15 blur-[130px] rounded-full" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[380px] h-[200px] bg-indigo-400/15 blur-[110px] rounded-full" />
        </div>

        {/* Logo */}
        <motion.img
            variants={{
                hidden: { opacity: 0, scale: 0.78, filter: "blur(12px)", y: 14 },
                show: {
                    opacity: 1, scale: 1, filter: "blur(0px)", y: 0,
                    transition: { duration: 0.6, ease: EASE }
                },
            }}
            src="/DEPT_LOGO.png"
            alt="Dept Logo"
            className="w-24 md:w-36 h-auto drop-shadow-2xl mb-3"
        />

        {/* Eyebrow */}
        <motion.p
            variants={fadeUp(0.2)}
            className="text-[10px] md:text-xs font-mono font-semibold tracking-[0.38em] uppercase text-zinc-400 mb-4"
        >
            MITS · Deemed to be University
        </motion.p>

        {/* "DEPARTMENT OF" label */}
        <motion.p
            variants={fadeUp(0.32)}
            className="text-[11px] md:text-xs font-bold tracking-[0.5em] uppercase text-zinc-400 mb-1"
            style={{ fontFamily: "var(--font-display)" }}
        >
            Department of
        </motion.p>

        <h1 aria-label="Data Science" className="leading-none mb-1">
            <span
                className="block font-black uppercase"
                style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(3.5rem, 12vw, 8rem)",
                    letterSpacing: "-0.03em",
                    background: "linear-gradient(100deg, #f59e0b 0%, #a78bfa 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                }}
            >
                <CharReveal text="DATA" baseDelay={0.42} stagger={0.04} duration={0.4} />
            </span>

            {/* "SCIENCE" — outlined / stroke style with subtle fill, smaller */}
            <span
                className="block font-black uppercase"
                style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(1.6rem, 5.5vw, 3.8rem)",
                    letterSpacing: "0.28em",
                    WebkitTextStroke: "1.5px #6366f1",
                    color: "transparent",
                    // subtle fill so it doesn't look empty
                    background: "linear-gradient(to right, #818cf880, #06b6d480)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    // re-apply stroke on top via text-stroke (overrides fill transparency)
                    paintOrder: "stroke fill",
                } as React.CSSProperties}
            >
                <CharReveal text="SCIENCE" baseDelay={0.6} stagger={0.036} duration={0.4} />
            </span>
        </h1>

        {/* Divider */}
        <motion.div
            variants={fadeUp(0.95)}
            className="flex items-center gap-3 w-full max-w-xs mt-5 mb-0"
        >
            <motion.span
                className="flex-1 h-px"
                style={{ background: "linear-gradient(to right, transparent, #f59e0b)" }}
                initial={{ scaleX: 0, originX: "0%" }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.0, duration: 0.45, ease: EASE }}
            />
            <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-amber-400" />
            </span>
            <motion.span
                className="flex-1 h-px"
                style={{ background: "linear-gradient(to left, transparent, #6366f1)" }}
                initial={{ scaleX: 0, originX: "100%" }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.0, duration: 0.45, ease: EASE }}
            />
        </motion.div>
    </motion.div>
);

export default Launch;
