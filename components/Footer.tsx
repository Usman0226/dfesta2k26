"use client";

import React from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Instagram, Twitter, Github, Heart, ExternalLink } from "lucide-react";

const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
});

const quickLinks = [
    { label: "Home", href: "#" },
    { label: "Events", href: "#events" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
    { label: "Register", href: "#" },
];

const socials = [
    { Icon: Instagram, href: "#", label: "Instagram" },
    { Icon: Twitter, href: "#", label: "Twitter" },
    { Icon: Github, href: "#", label: "GitHub" },
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

            {/* Top grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-14 pb-14 border-b border-white/10">

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
                            DFESTA
                        </p>
                        <p className="text-[10px] font-mono font-bold tracking-[0.38em] uppercase text-muted-foreground mt-0.5">
                            2k26
                        </p>
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
                        A data science symposium that bridges rigorous methodology with
                        high-stakes creative output — shaping the next wave of ML &amp; AI.
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

                {/* ── Col 2 — Quick links ── */}
                <motion.div {...fadeUp(0.1)} className="flex flex-col gap-5">
                    <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground">
                        Quick Links
                    </h4>
                    <ul className="flex flex-col gap-3">
                        {quickLinks.map(({ label, href }) => (
                            <li key={label}>
                                <a
                                    href={href}
                                    className="group inline-flex items-center gap-1.5 text-sm font-medium hover:text-primary transition-colors"
                                >
                                    <span className="w-0 group-hover:w-3 h-px bg-primary transition-all duration-300 origin-left" />
                                    {label}
                                </a>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                {/* ── Col 3 — Social + register CTA ── */}
                <motion.div {...fadeUp(0.2)} className="flex flex-col gap-6">
                    <div className="flex flex-col gap-4">
                        <h4 className="text-xs font-bold tracking-[0.3em] uppercase text-muted-foreground">
                            Follow Us
                        </h4>
                        <div className="flex gap-3">
                            {socials.map(({ Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="group w-9 h-9 rounded-xl glass flex items-center justify-center hover:bg-primary hover:border-primary transition-all duration-300"
                                >
                                    <Icon size={16} className="text-muted-foreground group-hover:text-white transition-colors" />
                                </a>
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
                {/* Marquee-style label */}
                <p className="tracking-[0.3em] uppercase text-center md:text-left">
                    Department of Data Science &mdash; D&apos;FESTA 2k26 Official Event Portal
                </p>

                {/* Right — credit */}
                <p className="flex items-center gap-1.5 whitespace-nowrap shrink-0">
                    Designed with
                    <Heart size={11} className="fill-red-500 text-red-500 animate-pulse" />
                    by
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
