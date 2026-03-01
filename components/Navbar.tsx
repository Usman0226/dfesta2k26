"use client";

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { ThemeToggle } from './ui/skiper-ui/ThemeToggle';
import { Menu, X } from 'lucide-react';
import { useAnimationContext } from '@/context/AnimationContext';

const navItem: Variants = {
    hidden: { opacity: 0, y: -18 },
    visible: {
        opacity: 1,
        y: 0,

        transition: { duration: 0.48, ease: [0.16, 1, 0.3, 1] as [number, number, number, number], staggerChildren: 0.08, },
    },
};

const Navbar = ({ onGalleryClick }: { onGalleryClick?: () => void }) => {
    const { isRevealComplete } = useAnimationContext();
    const pathname = usePathname();
    const isVisible = pathname !== '/' || isRevealComplete;
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Home', href: '/' },
        { name: 'Events', href: '#events' },
        { name: 'Gallery', href: '#gallery' },
        { name: 'About', href: '#about' },
        { name: 'Contact', href: '#contact' },
    ];

    // Smooth-scroll to anchor links without a hard page navigation
    const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        if (href === '#gallery') {
            e.preventDefault();
            onGalleryClick?.();
            return;
        }
        if (href.startsWith('#') || href.startsWith('/#')) {
            e.preventDefault();
            const id = href.replace('/#', '').replace('#', '');
            const el = document.getElementById(id);
            if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }
        setIsMobileMenuOpen(false);
    };

    return (
        <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'py-2 bg-background/85 backdrop-blur-md border-b border-black/5 dark:border-white/10 shadow-sm' : 'py-4 bg-transparent border-b border-transparent shadow-none'}`}>
            <div className="w-full px-4 md:px-12">
                <motion.div
                    className="flex items-center justify-between"
                    variants={{
                        hidden: { y: -20, opacity: 0 },
                        visible: {
                            y: 0,
                            opacity: 1,
                            transition: {
                                staggerChildren: 0.09,
                                delayChildren: 0.2,
                                duration: 0.6,
                                ease: [0.16, 1, 0.3, 1]
                            }
                        },
                    }}
                    initial="hidden"
                    animate={isVisible ? "visible" : "hidden"}
                >
                    <motion.div variants={navItem} className="flex items-center gap-3">
                        <Image src="/MITS-LOGO.png" alt="Logo" width={48} height={48} className="object-contain rounded-xl" />
                        <motion.div variants={navItem} className="flex flex-col leading-tight text-foreground dark:text-white" style={{ fontFamily: 'var(--font-display)' }}>
                            <span className="text-sm text-foreground font-bold tracking-tight">MITS-Deemed to be University</span>
                            <span className="text-[8px] font-bold tracking-[0.3em] uppercase text-gradient">Dept. of Data Science</span>
                        </motion.div>
                    </motion.div>

                    <div className="hidden md:flex items-center gap-8">
                        {navLinks.map((link) => (
                            <motion.a
                                key={link.name}
                                variants={navItem}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className="text-sm font-semibold text-foreground hover:text-primary transition-colors tracking-wide"
                                style={{ fontFamily: 'var(--font-display)' }}
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
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 glass rounded-xl"
                        >
                            <AnimatePresence mode="wait">
                                {isMobileMenuOpen ? (
                                    <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <X size={20} />
                                    </motion.div>
                                ) : (
                                    <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                                        <Menu size={20} />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </button>
                    </motion.div>
                </motion.div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                        className="absolute top-full left-0 w-full overflow-hidden md:hidden bg-background/95 backdrop-blur-md border-b border-black/5 dark:border-white/10 shadow-lg"
                    >
                        <div className="p-6 flex flex-col gap-6">
                            {navLinks.map((link, i) => (
                                <motion.a
                                    key={link.name}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.05 + 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] }}
                                    href={link.href}
                                    className="text-2xl font-bold tracking-tight text-foreground dark:text-white hover:text-primary transition-colors"
                                    style={{ fontFamily: 'var(--font-display)' }}
                                    onClick={(e) => handleNavClick(e, link.href)}
                                >
                                    {link.name}
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;