"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ImageOff } from "lucide-react";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type GalleryItem = {
    id: number;
    src: string;
    alt: string;
    label: string;
    category: string;
    accent: string;
};

const galleryItems: GalleryItem[] = [
    { id: 1, src: "", alt: "Keynote session", label: "Keynote", category: "Events", accent: "from-amber-500/20 to-violet-600/20" },
    { id: 2, src: "", alt: "Hands-on workshop", label: "AI Workshop", category: "Workshops", accent: "from-cyan-500/20 to-blue-600/20" },
    { id: 3, src: "", alt: "Prize distribution", label: "Prize Night", category: "Ceremony", accent: "from-rose-500/20 to-pink-600/20" },
    { id: 4, src: "", alt: "Team photo", label: "Core Team", category: "Team", accent: "from-emerald-500/20 to-teal-600/20" },
    { id: 5, src: "", alt: "DataViz competition", label: "DataViz", category: "Events", accent: "from-orange-500/20 to-red-600/20" },
    { id: 6, src: "", alt: "ML workshop session", label: "ML Bootcamp", category: "Workshops", accent: "from-indigo-500/20 to-purple-600/20" },
    { id: 7, src: "", alt: "Inauguration ceremony", label: "Inauguration", category: "Ceremony", accent: "from-amber-400/20 to-orange-600/20" },
    { id: 8, src: "", alt: "Organizing team", label: "Organizing Team", category: "Team", accent: "from-violet-500/20 to-fuchsia-600/20" },
    { id: 9, src: "", alt: "Hackathon session", label: "Hackathon", category: "Events", accent: "from-sky-500/20 to-indigo-600/20" },
];

const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
    hidden: { opacity: 0, y: 24, scale: 0.97 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: EASE } },
};

const Gallery = () => {
    const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

    return (
        <section className="py-20 px-4 max-w-7xl mx-auto">

            {/* ── Page header ── */}
            <div className="mb-16 flex flex-col gap-5">
                <motion.span
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold tracking-[0.25em] uppercase w-fit"
                >
                    Gallery
                </motion.span>

                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1, duration: 0.6, ease: EASE }}
                        className="text-5xl md:text-6xl font-extrabold tracking-tight leading-none"
                    >
                        Moments &amp;{" "}
                        <span
                            className="inline-block"
                            style={{
                                background: "linear-gradient(135deg, #f59e0b, #6366f1)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            Memories
                        </span>
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.55, ease: EASE }}
                        className="max-w-sm text-sm text-muted-foreground leading-relaxed"
                    >
                        A curated visual record of the energy, creativity, and passion that define D&apos;FESTA.
                    </motion.p>
                </div>

                {/* Divider */}
                <motion.div
                    initial={{ scaleX: 0, originX: "0%" }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.3, duration: 0.7, ease: EASE }}
                    className="h-px w-full bg-gradient-to-r from-primary/60 via-secondary/30 to-transparent"
                />
            </div>

            {/* ── Masonry grid ── */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4"
            >
                {galleryItems.map((item) => (
                    <motion.div
                        key={item.id}
                        variants={itemVariants}
                        whileHover={{ y: -4 }}
                        transition={{ type: "spring", stiffness: 300, damping: 24 }}
                        className="group relative rounded-2xl overflow-hidden cursor-pointer break-inside-avoid"
                        style={{ aspectRatio: item.id % 3 === 0 ? "4/5" : item.id % 2 === 0 ? "4/3" : "1/1" }}
                        onClick={() => setLightbox(item)}
                    >
                        {/* Gradient placeholder */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${item.accent}`} />
                        <div className="absolute inset-0 glass opacity-40" />

                        {/* Real image */}
                        {item.src && (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={item.src} alt={item.alt} className="absolute inset-0 w-full h-full object-cover" />
                        )}

                        {/* Placeholder icon */}
                        {!item.src && (
                            <div className="absolute inset-0 flex items-center justify-center">
                                <ImageOff size={28} className="text-white/20" />
                            </div>
                        )}

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300" />

                        {/* Bottom label */}
                        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                            <div className="flex items-end justify-between">
                                <div>
                                    <p className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary/80 mb-0.5">{item.category}</p>
                                    <p className="text-white font-semibold text-sm leading-tight">{item.label}</p>
                                </div>
                                <div className="w-7 h-7 rounded-full glass flex items-center justify-center">
                                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                                        <path d="M2 10L10 2M10 2H4M10 2V8" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                    </svg>
                                </div>
                            </div>
                        </div>

                        {/* Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10" />
                    </motion.div>
                ))}
            </motion.div>

            {/* ── Lightbox ── */}
            <AnimatePresence>
                {lightbox && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.22 }}
                        className="fixed inset-0 z-[200] flex items-center justify-center bg-black/75 backdrop-blur-lg p-4 md:p-10"
                        onClick={() => setLightbox(null)}
                    >
                        <motion.div
                            initial={{ scale: 0.93, opacity: 0, y: 16 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.93, opacity: 0, y: 16 }}
                            transition={{ duration: 0.3, ease: EASE }}
                            className="relative w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl"
                            onClick={e => e.stopPropagation()}
                        >
                            {lightbox.src ? (
                                // eslint-disable-next-line @next/next/no-img-element
                                <img src={lightbox.src} alt={lightbox.alt} className="w-full object-cover rounded-3xl" />
                            ) : (
                                <div className={`w-full aspect-video bg-gradient-to-br ${lightbox.accent} flex flex-col items-center justify-center gap-3 rounded-3xl`}>
                                    <ImageOff size={36} className="text-white/30" />
                                    <p className="text-white/50 text-sm font-medium">{lightbox.label}</p>
                                </div>
                            )}

                            {/* Meta bar */}
                            <div className="absolute bottom-0 inset-x-0 px-6 py-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent rounded-b-3xl">
                                <p className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary/80 mb-0.5">{lightbox.category}</p>
                                <p className="text-white font-bold text-lg">{lightbox.label}</p>
                            </div>

                            {/* Close */}
                            <button
                                onClick={() => setLightbox(null)}
                                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/90 transition-colors"
                            >
                                <X size={15} />
                            </button>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Gallery;
