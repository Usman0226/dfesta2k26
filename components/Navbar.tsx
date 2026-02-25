"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ThemeToggle } from './ui/skiper-ui/ThemeToggle';
import { Menu, X } from 'lucide-react';
import { useAnimationContext } from '@/context/AnimationContext';

const navContainer: Variants = {
    hidden: {},
    visible: {
        transition: { staggerChildren: 0.05, delayChildren: 0 },
    },
};

const navItem: Variants = {
    hidden: { opacity: 0, y: -18 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
};

const Navbar = () => {
    const { isRevealComplete } = useAnimationContext();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '#' },
        { name: 'Events', href: '#events' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' },
    ];

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-none shadow-none ${isScrolled ? 'py-2 bg-transparent backdrop-blur-md' : 'py-4 bg-transparent'}`}>
            <div className="w-full px-4 md:px-12">
                <motion.div
                    className="flex items-center justify-between"
                    variants={navContainer}
                    initial="hidden"
                    animate={isRevealComplete ? "visible" : "hidden"}
                >
                    {/* Logo block */}
                    <motion.div variants={navItem} className="flex items-center gap-3">
                        <Image src="/MITS-LOGO.png" alt="Logo" width={48} height={48} className="object-contain rounded-xl" />
                        <div className="flex flex-col leading-tight">
                            <span className="text-sm font-bold tracking-tight">MITS-Deemed to be University</span>
                            <span className="text-xs font-semibold tracking-widest uppercase text-gradient">Dept. of Data Science</span>
                        </div>
                    </motion.div>

                    {/* Desktop nav links */}
                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                variants={navItem}
                                href={link.href}
                                className="text-sm font-medium hover:text-primary transition-colors"
                            >
                                {link.name}
                            </motion.a>
                        ))}
                        <motion.div variants={navItem}>
                            <ThemeToggle />
                        </motion.div>
                    </div>

                    {/* Mobile toggle */}
                    <motion.div variants={navItem} className="md:hidden flex items-center gap-4">
                        <ThemeToggle />
                        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -14 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -14 }}
                        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        className="absolute top-full left-0 w-full p-4 md:hidden"
                    >
                        <div className="glass rounded-2xl p-6 flex flex-col gap-4">
                            {navLinks.map((link) => (
                                <a
                                    key={link.name}
                                    href={link.href}
                                    className="text-lg font-medium"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
