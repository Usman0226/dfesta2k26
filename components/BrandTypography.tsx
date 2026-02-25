"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const BrandTypography = ({ onComplete }: { onComplete: () => void }) => {

    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete();
        }, 7000); // Sequence adjustment for script reveal
        return () => clearTimeout(timer);
    }, [onComplete]);

    const scriptText = "D'FESTA";
    const subText = "DEPARTMENT OF DATA SCIENCE";

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 3.5 // Alignment with Launch screen exit
            },
        },
    };

    const scriptAnim = {
        hidden: {
            opacity: 0,
            pathLength: 0,
            y: 10,
            scale: 0.95
        },
        visible: {
            opacity: 1,
            pathLength: 1,
            y: 0,
            scale: 1,
            transition: {
                duration: 1.5,
                ease: "easeInOut"
            } as any
        },
    };

    const subTextAnim = {
        hidden: { opacity: 0, y: 10, letterSpacing: "0.2em" },
        visible: {
            opacity: 0.8,
            y: 0,
            letterSpacing: "0.4em",
            transition: {
                duration: 1.2,
                delay: 5.5, // Appears after script
                ease: "easeOut"
            } as any
        }
    };

    return (
        <div className="relative flex flex-col items-center justify-center py-12">
            <motion.div
                variants={container}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center gap-2"
            >
                {/* Script Typography */}
                <motion.h1
                    variants={scriptAnim}
                    className="text-8xl md:text-[10rem] font-bold tracking-normal italic relative"
                    style={{
                        fontFamily: "var(--font-script)",
                        background: "linear-gradient(135deg, var(--color-primary) 20%, var(--color-secondary) 80%)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textShadow: "0 10px 40px rgba(245, 158, 11, 0.15)",
                        lineHeight: 1.1
                    }}
                >
                    {scriptText}
                    {/* Subtle glow layer for dark theme brilliance */}
                    <div className="absolute inset-0 blur-2xl opacity-20 dark:opacity-30 bg-gradient-to-br from-primary to-secondary -z-10 pointer-events-none" />
                </motion.h1>

                {/* Clean Subtext */}
                <motion.p
                    variants={subTextAnim}
                    className="text-xs md:text-sm font-bold uppercase tracking-[0.4em] text-zinc-500 dark:text-zinc-400"
                    style={{ fontFamily: "var(--font-display)" }}
                >
                    {subText}
                </motion.p>
            </motion.div>

            {/* Ambient Background Glows */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3.5, duration: 2 }}
                className="absolute inset-0 -z-10 pointer-events-none"
            >
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-3xl h-48 bg-primary/10 blur-[120px] rounded-full" />
                <div className="absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full animate-pulse" />
            </motion.div>
        </div>
    );
};

export default BrandTypography;
