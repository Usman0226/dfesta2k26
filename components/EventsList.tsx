"use client";

import React, { useState } from 'react';
import EventCard from './EventCard';
import { events } from '@/lib/eventsData';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, Sparkles, BookOpen } from 'lucide-react';

const TABS = [
    {
        key: 'Technical' as const,
        label: 'Technical',
        Icon: Cpu,
        description: 'Compete in cutting-edge challenges that test your analytical and engineering skills.',
    },
    {
        key: 'Non-Technical' as const,
        label: 'Non-Technical',
        Icon: Sparkles,
        description: 'Express creativity and critical thinking through debates, quizzes, and cultural activities.',
    },
    {
        key: 'Workshop' as const,
        label: 'Workshops',
        Icon: BookOpen,
        description: 'Hands-on sessions to sharpen your practical skill set.',
    },
] as const;

type TabKey = (typeof TABS)[number]['key'];

const cardVariants = {
    hidden: { opacity: 0, y: 28 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        transition: { duration: 0.45, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] },
    }),
    exit: { opacity: 0, y: -12, transition: { duration: 0.25 } },
};

const panelVariants = {
    enter: (dir: number) => ({ opacity: 0, x: dir * 32 }),
    center: { opacity: 1, x: 0, transition: { duration: 0.38, ease: [0.16, 1, 0.3, 1] } },
    exit: (dir: number) => ({ opacity: 0, x: dir * -32, transition: { duration: 0.25 } }),
};

const EventsList = () => {
    const [activeTab, setActiveTab] = useState<TabKey>('Technical');
    const [direction, setDirection] = useState(1);

    const tabIndex = TABS.findIndex(t => t.key === activeTab);
    const activeData = TABS[tabIndex];
    const filtered = events.filter(e => e.category === activeTab);

    const handleTabChange = (key: TabKey) => {
        const newIndex = TABS.findIndex(t => t.key === key);
        setDirection(newIndex > tabIndex ? 1 : -1);
        setActiveTab(key);
    };

    return (
        <section id="events" className="py-24 px-4 max-w-7xl mx-auto">
            {/* Section header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
                <div className="flex flex-col gap-4">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold tracking-widest uppercase w-fit"
                    >
                        Schedule
                    </motion.div>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-4xl md:text-5xl font-bold tracking-tight"
                    >
                        Events &amp; <span className="text-gradient">Workshops</span>
                    </motion.h2>
                </div>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                    className="max-w-md text-muted-foreground font-medium"
                >
                    Discover a wide range of technical and creative events designed to push your boundaries and showcase your talent.
                </motion.p>
            </div>

            {/* Tab Bar */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
                className="flex justify-center mb-12"
            >
                <div className="relative inline-flex gap-1 p-1.5 rounded-2xl glass shadow-lg">
                    {TABS.map(({ key, label, Icon }) => {
                        const isActive = activeTab === key;
                        return (
                            <button
                                key={key}
                                onClick={() => handleTabChange(key)}
                                className="relative z-10 flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-colors duration-200 outline-none focus-visible:ring-2 focus-visible:ring-primary"
                                style={{ color: isActive ? 'var(--primary-foreground)' : undefined }}
                            >
                                {/* Animated pill background */}
                                {isActive && (
                                    <motion.span
                                        layoutId="active-tab-pill"
                                        className="absolute inset-0 rounded-xl"
                                        style={{
                                            background: 'linear-gradient(135deg, var(--color-primary), var(--color-secondary))',
                                        }}
                                        transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                                    />
                                )}
                                <span className={`relative z-10 transition-colors duration-200 ${isActive ? 'text-white' : 'text-muted-foreground hover:text-foreground'}`}>
                                    <Icon size={15} />
                                </span>
                                <span className={`relative z-10 hidden sm:inline transition-colors duration-200 ${isActive ? 'text-white' : 'text-muted-foreground hover:text-foreground'}`}>
                                    {label}
                                </span>
                            </button>
                        );
                    })}
                </div>
            </motion.div>

            {/* Active tab description */}
            <AnimatePresence mode="wait" initial={false}>
                <motion.p
                    key={activeTab + '-desc'}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.25 }}
                    className="text-center text-muted-foreground font-medium mb-10 text-sm"
                >
                    {activeData.description}
                </motion.p>
            </AnimatePresence>

            {/* Tab Content */}
            <AnimatePresence mode="wait" custom={direction} initial={false}>
                <motion.div
                    key={activeTab}
                    custom={direction}
                    variants={panelVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                >
                    {filtered.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="flex flex-col items-center justify-center py-24 gap-4 text-muted-foreground"
                        >
                            <activeData.Icon size={48} className="opacity-20" />
                            <p className="text-lg font-medium opacity-50">No events added yet — check back soon!</p>
                        </motion.div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filtered.map((event, index) => (
                                <motion.div
                                    key={event.id}
                                    custom={index}
                                    variants={cardVariants}
                                    initial="hidden"
                                    animate="visible"
                                    exit="exit"
                                >
                                    <EventCard event={event} index={index} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </motion.div>
            </AnimatePresence>
        </section>
    );
};

export default EventsList;
