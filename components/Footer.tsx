"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Instagram, Linkedin, ExternalLink } from "lucide-react";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

const socials = [
    { Icon: Instagram, URL: "https://www.instagram.com/dfesta_26", label: "Instagram" },
    { Icon: Linkedin, URL: "https://www.linkedin.com/in/mits-cse-data-science-432ab9380", label: "LinkedIn" },
];

const Footer = () => (
    <footer className="relative overflow-hidden border-t border-white/10">
        {/* ── Ambient glow ── */}
        <div className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute bottom-0 left-[10%] w-[55%] h-[70%] bg-primary/10 blur-[140px] rounded-full" />
            <div className="absolute bottom-0 right-[5%]  w-[40%] h-[60%] bg-secondary/10 blur-[120px] rounded-full" />
        </div>

        {/* ── Main content ── */}
        <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10">

            {/* Top grid — 2 cols */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-14 pb-4 border-b border-white/10">

                {/* ── Col 1 — Brand + address ── */}
                <motion.div {...fadeUp(0)} className="flex flex-col gap-5">
                    {/* Wordmark */}
                    <div>
                        <p
                            className="text-4xl font-extrabold tracking-tight leading-none"
                            style={{
                                background: "linear-gradient(135deg, #f59e0b, #6366f1)",
                                WebkitBackgroundClip: "text",
                                WebkitTextFillColor: "transparent",
                            }}
                        >
                            <span className="text-red-700 tracking-wider" style={{ WebkitTextFillColor: "rgb(185 28 28)" }}>MITS</span>

                        </p>
                        <p className="text-[10px] font-mono font-bold tracking-[0.38em] uppercase text-muted-foreground mt-0.5">
                            DEEMED TO BE UNIVERSITY
                        </p>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                        A data science symposium that bridges rigorous methodology with
                        high-stakes creative output.
                    </p>

                    {/* Address */}
                    <div className="flex flex-col gap-2 text-xs text-muted-foreground">
                        <span className="flex items-start gap-2">
                            <MapPin size={13} className="mt-0.5 text-primary shrink-0" />
                            <span>
                                Department of Data Science<br />
                                MITS — Deemed to be University<br />
                                Madanapalle, Andhra Pradesh — 517325
                            </span>
                        </span>
                        <span className="flex items-center gap-2">
                            <Mail size={13} className="text-primary shrink-0" />
                            <a href="mailto:datascience@mits.ac.in" className="hover:text-primary transition-colors">
                                datascience@mits.ac.in
                            </a>
                        </span>
                    </div>
                </motion.div>

                {/* ── Col 2 — Social icons + register CTA ── */}
                <motion.div {...fadeUp(0.15)} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground">
                            Follow Us
                        </h4>
                        <div className="flex gap-3">
                            {socials.map(({ Icon, URL, label }) => (
                                <motion.a
                                    key={label}
                                    onClick={() => window.open(URL, "_blank")}
                                    aria-label={label}
                                    whileHover={{ y: -5 }}
                                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                                    className="group relative w-11 h-11 rounded-xl glass flex items-center justify-center cursor-pointer overflow-hidden"
                                >
                                    {/* Icon */}
                                    <Icon size={17} className="text-muted-foreground group-hover:text-white transition-colors duration-300 relative z-10" />
                                    {/* Primary fill */}
                                    <span className="absolute inset-0 bg-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                                    {/* Glow — same as EventCard */}
                                    <span className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-30 blur-xl transition-opacity duration-500 -z-10" />
                                </motion.a>
                            ))}
                        </div>
                    </div>

                    {/* ── CTA ── */}
                    <div className="glass rounded-2xl p-5 flex flex-col gap-3 border border-primary/20">
                        <p className="text-xs font-bold tracking-widest uppercase text-primary">
                            Register Now
                        </p>
                        <p className="text-sm text-muted-foreground">
                            Secure your spot at D&apos;FESTA 2k26 before seats fill up.
                        </p>
                        <a
                            href="#"
                            className="inline-flex items-center gap-2 self-start text-sm font-bold text-primary hover:underline underline-offset-4 transition"
                        >
                            Get your pass <ExternalLink size={13} />
                        </a>
                    </div>
                </motion.div>
            </div>

            {/* ── Bottom strip ── */}
            <motion.div
                {...fadeUp(0.3)}
                className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-[11px] text-muted-foreground font-mono"
            >
                <p className="tracking-[0.3em] uppercase text-center md:text-left">
                    Department of Data Science &mdash; D&apos;FESTA 2k26 Event Portal
                </p>
                <p className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
                    Crafted by
                    <span
                        className="font-bold"
                        style={{
                            background: "linear-gradient(to right, #f59e0b, #6366f1)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        ARC Club — Community
                    </span>
                </p>
            </motion.div>
        </div>
    </footer>
);

export default Footer;
