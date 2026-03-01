"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Event } from '@/lib/eventsData';

interface EventCardProps {
    event: Event;
    index: number;
}

const EventCard = ({ event, index }: EventCardProps) => {
    const IconComponent = (Icons as unknown as Record<string, React.ElementType>)[event.icon] || Icons.HelpCircle;
    const [isExpanded, setIsExpanded] = useState(false);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        setMousePos({
            x: e.clientX - rect.left,
            y: e.clientY - rect.top,
        });
    };

    useEffect(() => {
        if (isExpanded) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isExpanded]);

    return (
        <>
            {/* --- Base Card (Grid Item) --- */}
            <motion.div
                layoutId={`card-container-${event.id}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "0px 0px -50px 0px" }}
                transition={{
                    y: { duration: 0.5, delay: index * 0.05, type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.5, delay: index * 0.05 },
                    layout: { type: "spring", stiffness: 350, damping: 30 }
                }}
                whileHover={{ y: -5, transition: { type: "spring", stiffness: 400, damping: 25 } }}
                onMouseMove={handleMouseMove}
                className="group relative glass rounded-3xl p-6 overflow-hidden shadow-xl border border-gray-300 dark:border-white/10 flex flex-col h-full bg-white/60 dark:bg-black/40 backdrop-blur-sm sm:backdrop-blur-md cursor-pointer will-change-transform"
                onClick={() => setIsExpanded(true)}
            >
                {/* Dynamic Spotlight Effect on Hover */}
                <div
                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 hidden dark:block"
                    style={{
                        background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(255,255,255, 0.08), transparent 40%)`,
                    }}
                />
                <div
                    className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 block dark:hidden"
                    style={{
                        background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(0,0,0, 0.04), transparent 40%)`,
                    }}
                />

                {/* Background Glow */}
                <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10 hidden sm:block" />

                <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                    <IconComponent size={80} />
                </div>

                <div className="flex flex-col h-full justify-between gap-6 relative z-10 pointer-events-none">
                    <div className="flex flex-col gap-2">
                        <motion.div layoutId={`icon-${event.id}`} transition={{ layout: { type: "spring", stiffness: 350, damping: 30 } }} className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                            <IconComponent size={24} />
                        </motion.div>
                        <div>
                            <span className="text-xs font-mono uppercase tracking-widest text-primary/80">{event.category}</span>
                            <h3 className="text-2xl font-bold tracking-tight mt-1">{event.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                    </div>

                    <div className="flex flex-col gap-3 pt-4 border-t border-black/10 dark:border-white/10">
                        <div className="flex items-center gap-2 text-xs font-medium opacity-70">
                            <Icons.Calendar size={14} />
                            <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium opacity-70">
                            <Icons.MapPin size={14} />
                            <span>{event.venue}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs font-medium opacity-70">
                            <Icons.Clock size={14} />
                            <span>{event.time}</span>
                        </div>
                    </div>

                    <div className="flex gap-3 w-full mt-2 pointer-events-auto">
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }}
                            className="hover:text-white flex-1 py-3 rounded-2xl border border-gray-100 dark:border-zinc-700 bg-transparent font-bold text-sm hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors"
                        >
                            Details
                        </motion.button>
                        <motion.button
                            whileTap={{ scale: 0.95 }}
                            onClick={(e) => e.stopPropagation()}
                            className="border border-gray-100 flex-1 py-3 rounded-2xl bg-black/40 text-white dark:bg-white dark:text-black font-bold text-sm hover:bg-primary dark:hover:bg-primary transition-colors hover:text-white shadow-md z-10"
                        >
                            Register
                        </motion.button>
                    </div>
                </div>
            </motion.div>

            {/* --- Expanded Modal View --- */}
            <AnimatePresence>
                {isExpanded && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-12">
                        {/* Backdrop - Solid semi-transparent, no blur for performance */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={() => setIsExpanded(false)}
                            className="absolute inset-0 bg-black/60 cursor-pointer will-change-opacity"
                        />

                        {/* Expanded Card Container */}
                        <motion.div
                            layoutId={`card-container-${event.id}`}
                            transition={{ layout: { type: "spring", stiffness: 350, damping: 30 } }}
                            className="relative text-black dark:text-white w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-950 rounded-[2rem] shadow-2xl border border-black/5 dark:border-white/10 flex flex-col z-10 will-change-transform origin-center"
                            style={{ scrollbarWidth: 'none', WebkitOverflowScrolling: 'touch' }}
                        >
                            {/* Sticky Modal Header (to house close button nicely) */}
                            <div className="sticky top-0 right-0 w-full flex justify-end p-4 sm:p-6 z-50 pointer-events-none">
                                <motion.button
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.8 }}
                                    onClick={() => setIsExpanded(false)}
                                    className="p-3 rounded-full bg-black/10 hover:bg-black/20 dark:bg-white/10 dark:hover:bg-white/20 transition-colors pointer-events-auto text-black dark:text-white"
                                >
                                    <Icons.X size={20} />
                                </motion.button>
                            </div>

                            <div className="px-6 sm:px-10 pb-6 sm:pb-10 -mt-16 sm:-mt-20">
                                {/* Event Header info */}
                                <div className="flex flex-col gap-4 pr-16 pt-8 sm:pt-12">
                                    <motion.div layoutId={`icon-${event.id}`} transition={{ layout: { type: "spring", stiffness: 350, damping: 30 } }} className="w-16 h-16 rounded-3xl bg-primary/10 flex items-center justify-center text-primary">
                                        <IconComponent size={32} />
                                    </motion.div>
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.1 }}
                                    >
                                        <span className="text-sm font-mono uppercase tracking-widest text-primary/80 block">{event.category}</span>
                                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mt-2 text-black dark:text-white">{event.title}</h3>
                                    </motion.div>
                                    <motion.p
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.15 }}
                                        className="text-lg md:text-xl text-black/70 dark:text-white/70 leading-relaxed mt-2"
                                    >
                                        {event.description}
                                    </motion.p>
                                </div>

                                {/* Event Time/Location Grid */}
                                <motion.div
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2 }}
                                    className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-8 border-b border-black/10 dark:border-white/10"
                                >
                                    <div className="flex items-center gap-4 text-black dark:text-white">
                                        <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 text-primary"><Icons.Calendar size={20} /></div>
                                        <div className="flex flex-col">
                                            <span className="text-xs uppercase font-mono opacity-50">Date</span>
                                            <span className="font-medium sm:text-lg">{event.date}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-black dark:text-white">
                                        <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 text-primary"><Icons.MapPin size={20} /></div>
                                        <div className="flex flex-col">
                                            <span className="text-xs uppercase font-mono opacity-50">Venue</span>
                                            <span className="font-medium sm:text-lg">{event.venue}</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-4 text-black dark:text-white">
                                        <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 text-primary"><Icons.Clock size={20} /></div>
                                        <div className="flex flex-col">
                                            <span className="text-xs uppercase font-mono opacity-50">Time</span>
                                            <span className="font-medium sm:text-lg">{event.time}</span>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Organizers Section (Fades in) */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ delay: 0.25, duration: 0.3 }}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-8 py-8"
                                >
                                    <div className="space-y-6">
                                        <h4 className="text-2xl font-semibold flex items-center gap-2 text-black dark:text-white">
                                            <Icons.Users size={24} className="text-primary" />
                                            Organizers
                                        </h4>

                                        {event.facultyCoordinator && (
                                            <div className="group bg-primary/5 hover:bg-primary/10 transition-colors rounded-2xl p-5 border border-primary/20 text-black dark:text-white">
                                                <p className="text-xs font-mono text-primary uppercase mb-2 tracking-wide">Faculty Co-Ordinator</p>
                                                <p className="font-semibold text-xl">{event.facultyCoordinator.name}</p>
                                                <a href={`tel:${event.facultyCoordinator.phone}`} className="text-sm opacity-80 flex items-center gap-2 mt-2 hover:text-primary transition-colors w-fit">
                                                    <Icons.Phone size={14} /> {event.facultyCoordinator.phone}
                                                </a>
                                            </div>
                                        )}

                                        {event.studentCoordinator && (
                                            <div className="group bg-secondary/5 hover:bg-secondary/10 transition-colors rounded-2xl p-5 border border-secondary/20 text-black dark:text-white">
                                                <p className="text-xs font-mono text-secondary uppercase mb-2 tracking-wide">Student Co-Ordinator</p>
                                                <p className="font-semibold text-xl">{event.studentCoordinator.name}</p>
                                                <a href={`tel:${event.studentCoordinator.phone}`} className="text-sm opacity-80 flex items-center gap-2 mt-2 hover:text-secondary transition-colors w-fit">
                                                    <Icons.Phone size={14} /> {event.studentCoordinator.phone}
                                                </a>
                                            </div>
                                        )}

                                        {event.teamLeader && (
                                            <div className="group bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors rounded-2xl p-5 border border-black/10 dark:border-white/10 text-black dark:text-white">
                                                <p className="text-xs font-mono uppercase mb-2 tracking-wide opacity-70">Team Leader</p>
                                                <p className="font-semibold text-xl">{event.teamLeader.name}</p>
                                                <a href={`tel:${event.teamLeader.phone}`} className="text-sm opacity-80 flex items-center gap-2 mt-2 hover:text-black/80 dark:hover:text-white/80 transition-colors w-fit">
                                                    <Icons.Phone size={14} /> {event.teamLeader.phone}
                                                </a>
                                            </div>
                                        )}
                                    </div>

                                    <div className="space-y-6 text-black dark:text-white">
                                        {event.teamMembers && event.teamMembers.length > 0 && (
                                            <>
                                                <h4 className="text-2xl font-semibold flex items-center gap-2">
                                                    <Icons.UserPlus size={24} className="text-primary" />
                                                    Team Members
                                                </h4>
                                                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                                    {event.teamMembers.map((member, idx) => (
                                                        <li key={idx} className="flex items-center gap-3 bg-black/5 dark:bg-white/5 rounded-xl p-4 border border-black/5 dark:border-white/5 hover:bg-black/10 dark:hover:bg-white/10 transition-colors">
                                                            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-sm uppercase">
                                                                {member.substring(0, 2)}
                                                            </div>
                                                            <span className="font-medium text-base">{member}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </>
                                        )}
                                    </div>
                                </motion.div>
                            </div>

                            {/* Sticky Bottom CTA */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                transition={{ delay: 0.2 }}
                                className="sticky bottom-0 w-full mt-auto pt-4 border-t border-black/10 dark:border-white/10 bg-white dark:bg-zinc-950 p-6 sm:p-8"
                            >
                                <motion.button
                                    whileTap={{ scale: 0.98 }}
                                    className="w-full py-5 text-lg rounded-2xl bg-black text-white dark:bg-white dark:text-black font-bold hover:bg-primary dark:hover:bg-primary hover:text-white dark:hover:text-white transition-colors shadow-2xl"
                                >
                                    Register Now
                                </motion.button>
                            </motion.div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default EventCard;
