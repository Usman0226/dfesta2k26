"use client";

import React from 'react';
import { motion } from 'framer-motion';
import * as Icons from 'lucide-react';
import { Event } from '@/lib/eventsData';

interface EventCardProps {
    event: Event;
    index: number;
}

const EventCard = ({ event, index }: EventCardProps) => {
    // Dynamically get icon component
    const IconComponent = (Icons as any)[event.icon] || Icons.HelpCircle;

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ y: -5 }}
            className="group relative glass rounded-3xl p-6 overflow-hidden cursor-pointer"
        >
            <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <IconComponent size={80} />
            </div>

            <div className="flex flex-col h-full justify-between gap-6 relative z-10">
                <div className="flex flex-col gap-2">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <IconComponent size={24} />
                    </div>
                    <div>
                        <span className="text-xs font-mono uppercase tracking-widest text-primary/80">{event.category}</span>
                        <h3 className="text-2xl font-bold tracking-tight mt-1">{event.title}</h3>
                    </div>
                    <p className="text-sm text-muted-foreground line-clamp-2">{event.description}</p>
                </div>

                <div className="flex flex-col gap-3 pt-4 border-t border-white/10">
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

                <motion.button
                    whileTap={{ scale: 0.95 }}
                    className="w-full py-3 rounded-2xl bg-white text-black dark:bg-zinc-800 dark:text-white font-bold text-sm hover:bg-primary transition-colors group-hover:text-white mt-2"
                >
                    Learn More
                </motion.button>
            </div>

            {/* Hover Glow Effect */}
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-secondary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-500 -z-10" />
        </motion.div>
    );
};

export default EventCard;
