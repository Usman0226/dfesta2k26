"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { teamMembers, stats, type TeamMember } from "@/lib/teamData";
import { Mail } from "lucide-react";


const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];
const VP = { once: true, margin: "-60px 0px" };

function useCounter(target: number, duration = 1600) {
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true, margin: "-40px 0px" });

    useEffect(() => {
        if (!inView) return;
        let current = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
            current = Math.min(current + step, target);
            setCount(Math.round(current));
            if (current >= target) clearInterval(timer);
        }, 16);
        return () => clearInterval(timer);
    }, [inView, target, duration]);

    return { ref, count };
}

/* ── Stat pill ──────────────────────────────────────────────────── */
function StatPill({ value, suffix, label }: { value: number; suffix: string; label: string }) {
    const { ref, count } = useCounter(value);
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 20, scale: 0.95 },
                visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease: EASE } },
            }}
            className="flex flex-col items-center gap-1 px-5 py-4 glass rounded-2xl flex-1 min-w-[90px]"
        >
            <span className="text-3xl md:text-4xl font-black text-gradient leading-none">
                <span ref={ref}>{count}</span>
                {suffix}
            </span>
            <span className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground text-center">
                {label}
            </span>
        </motion.div>
    );
}

/* ── Avatar ─────────────────────────────────────────────────────── */
function Avatar({ member, size = "md" }: { member: TeamMember; size?: "sm" | "md" | "lg" }) {
    const szMap = { sm: "w-14 h-14 text-xl", md: "w-20 h-20 text-3xl", lg: "w-28 h-28 text-5xl" };
    const ringMap = { sm: "p-[2px]", md: "p-[3px]", lg: "p-[3px]" };
    const initials = member.name
        .split(" ")
        .filter(w => w.startsWith("Dr.") ? false : true)
        .slice(0, 2)
        .map(w => w[0])
        .join("");

    return (
        <div className={`rounded-full bg-gradient-to-br ${member.accent} ${ringMap[size]} flex-shrink-0`}>
            {member.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={member.image}
                    alt={member.name}
                    className={`${szMap[size]} rounded-full object-cover`}
                />
            ) : (
                <div
                    className={`${szMap[size]} rounded-full bg-background flex items-center justify-center font-black text-transparent bg-gradient-to-br ${member.accent} bg-clip-text`}
                    style={{
                        background: "var(--background)",
                    }}
                >
                    <span
                        className="font-black"
                        style={{
                            background: `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        {initials}
                    </span>
                </div>
            )}
        </div>
    );
}

/* ── HOD Card ───────────────────────────────────────────────────── */
function HODCard({ member }: { member: TeamMember }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.94 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={VP}
            transition={{ duration: 0.7, ease: EASE }}
            whileTap={{ scale: 0.98 }}
            className="group relative w-full max-w-sm mx-auto border border-gray-200 rounded-xl"
        >
            {/* Ambient glow ring */}
            <div className={`absolute -inset-px rounded-[28px] bg-gradient-to-br ${member.accent} opacity-40 blur-xl group-hover:opacity-60 transition-opacity duration-500`} />

            <div className="relative glass rounded-[24px] p-6 md:p-8 flex flex-col items-center text-center gap-5 border border-white/10 overflow-hidden">
                {/* Corner orbit dots */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-8 -right-8 w-24 h-24 rounded-full border border-dashed border-primary/20"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full border border-dashed border-secondary/20"
                />

                {/* Crown badge */}
                <motion.div
                    initial={{ scale: 0, rotate: -10 }}
                    whileInView={{ scale: 1, rotate: 0 }}
                    viewport={VP}
                    transition={{ delay: 0.3, duration: 0.5, ease: EASE }}
                    className="absolute top-4 right-4 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase"
                    style={{
                        background: "linear-gradient(135deg, #f59e0b, #6366f1)",
                        color: "#fff",
                    }}
                >
                    HOD
                </motion.div>

                <Avatar member={member} size="lg" />

                <div className="flex flex-col gap-1.5 relative z-10">
                    <h3 className="text-xl md:text-2xl font-extrabold tracking-tight">{member.name}</h3>
                    <p
                        className="text-sm font-bold"
                        style={{
                            background: "linear-gradient(135deg, #f59e0b, #6366f1)",
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                        }}
                    >
                        {member.designation}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium tracking-wide">{member.subdept}</p>
                </div>

                {member.email && (
                    <a
                        href={`mailto:${member.email}`}
                        className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-primary transition-colors font-mono"
                    >
                        <Mail size={12} />
                        {member.email}
                    </a>
                )}
            </div>
        </motion.div>
    );
}

function FacultyCard({ member, index }: { member: TeamMember; index: number }) {
    const fromLeft = index % 2 === 0;
    return (
        <motion.div
            initial={{ opacity: 0, x: fromLeft ? -32 : 32, y: 16 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            whileHover={{ y: -4, scale: 1.01 }}
            viewport={VP}
            transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
            whileTap={{ scale: 0.98 }}
            className="group relative glass rounded-2xl p-5 flex items-center gap-4 border border-white/10 hover:border-white/20 transition-colors overflow-hidden cursor-default"
        >
            <div
                className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl bg-gradient-to-b ${member.accent} opacity-80`}
            />
 
            <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-15 transition-opacity duration-500 bg-gradient-to-br ${member.accent} blur-2xl -z-10`}
            />
            <div className={`absolute -inset-2 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${member.accent} blur-xl -z-10`} />

            <Avatar member={member} size="md" />

            <div className="flex flex-col gap-0.5 min-w-0">
                <h4 className="font-bold text-base tracking-tight truncate">{member.name}</h4>
                <p className="text-xs font-semibold text-primary truncate">{member.designation}</p>
                <p className="text-[11px] text-muted-foreground truncate">{member.subdept}</p>
            </div>
        </motion.div>
    );
}

function StudentCard({ member, index }: { member: TeamMember; index: number }) {
    return (
        <motion.div
            variants={{
                hidden: { opacity: 0, y: 24, scale: 0.94, filter: "blur(4px)" },
                visible: {
                    opacity: 1, y: 0, scale: 1, filter: "blur(0px)",
                    transition: { duration: 0.5, delay: index * 0.07, ease: EASE },
                },
            }}
            whileTap={{ scale: 0.96 }}
            className="group relative glass rounded-2xl p-4 flex flex-col items-center text-center gap-3 border border-white/10 overflow-hidden cursor-default"
        >
            {/* Subtle gradient bg on hover */}
            <div className={`absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-500 bg-gradient-to-br ${member.accent}`} />

            <Avatar member={member} size="sm" />

            <div className="flex flex-col gap-0.5">
                <h5 className="font-bold text-sm tracking-tight">{member.name}</h5>
                <p className="text-[11px] font-semibold text-primary">{member.designation}</p>
                <p className="text-[10px] text-muted-foreground">{member.subdept}</p>
            </div>

            {/* Bottom accent dot */}
            <div className={`w-6 h-1 rounded-full bg-gradient-to-r ${member.accent} opacity-60`} />
        </motion.div>
    );
}

function SectionHeading() {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px 0px" });

    const words = ["Meet", "The", "Minds", "Behind", "D\u2019FESTA"];
    return (
        <div ref={ref} className="overflow-hidden">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight leading-none flex flex-wrap gap-x-4 gap-y-1">
                {words.map((word, i) => (
                    <span key={word} className="overflow-hidden inline-block">
                        <motion.span
                            className={`inline-block ${i === words.length - 1 ? "text-gradient" : ""}`}
                            initial={{ y: "110%", opacity: 0 }}
                            animate={inView ? { y: "0%", opacity: 1 } : {}}
                            transition={{ duration: 0.65, delay: i * 0.1, ease: EASE }}
                        >
                            {word}
                        </motion.span>
                    </span>
                ))}
            </h2>
        </div>
    );
}

function LineDraw({ delay = 0 }: { delay?: number }) {
    return (
        <motion.div
            initial={{ scaleX: 0, originX: "0%" }}
            whileInView={{ scaleX: 1 }}
            viewport={VP}
            transition={{ duration: 0.8, delay, ease: EASE }}
            className="h-px w-full bg-gradient-to-r from-primary/60 via-secondary/40 to-transparent"
        />
    );
}

function RoleLabel({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={VP}
            transition={{ duration: 0.5, ease: EASE }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-[11px] font-bold tracking-[0.22em] uppercase w-fit"
        >
            {children}
        </motion.div>
    );
}

 const About = () => {
    const hod = teamMembers.find(m => m.role === "hod")!;
    const faculty = teamMembers.filter(m => m.role === "faculty");
    const students = teamMembers.filter(m => m.role === "student");

    return (
        <section id="about" className="relative py-2 px-4 overflow-hidden">

            {/* ── Background ambience ── */}
            <div className="pointer-events-none absolute inset-0 -z-10">
                <div className="absolute top-[15%] left-[0%] w-[55%] h-[45%] bg-primary/8 dark:bg-primary/5 blur-[140px] rounded-full" />
                <div className="absolute bottom-[10%] right-[0%] w-[50%] h-[40%] bg-secondary/8 dark:bg-secondary/5 blur-[120px] rounded-full" />
                {/* Dot grid */}
                <div
                    className="absolute inset-0 opacity-[0.025] dark:opacity-[0.05]"
                    style={{
                        backgroundImage: "radial-gradient(circle, currentColor 1px, transparent 1px)",
                        backgroundSize: "28px 28px",
                    }}
                />
            </div>

            <div className="max-w-5xl mx-auto flex flex-col gap-14">

                {/* ── Header ── */}
                <div className="flex flex-col gap-5">
                    <RoleLabel>About Us</RoleLabel>
                    <SectionHeading />
                    <motion.p
                        initial={{ opacity: 0, y: 16 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={VP}
                        transition={{ duration: 0.55, delay: 0.2, ease: EASE }}
                        className="text-sm md:text-base text-muted-foreground leading-relaxed max-w-xl"
                    >
                        The Department of CSE – Data Science at MITS is driven by a passionate team of
                        educators and innovators committed to shaping the next generation of data professionals.
                    </motion.p>

                    <LineDraw delay={0.3} />

                    {/* Stats */}
                    <motion.div
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
                        }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VP}
                        className="flex flex-row gap-3 flex-wrap"
                    >
                        {stats.map(s => (
                            <StatPill key={s.label} {...s} />
                        ))}
                    </motion.div>
                </div>

                {/* ── HOD ── */}
                <div className="flex flex-col gap-5">
                    <RoleLabel>Leadership</RoleLabel>
                    <HODCard member={hod} />
                </div>

                <LineDraw />

                {/* ── Faculty Coordinators ── */}
                <div className="flex flex-col gap-5">
                    <RoleLabel>Faculty Coordinators</RoleLabel>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {faculty.map((m, i) => (
                            <FacultyCard key={m.id} member={m} index={i} />
                        ))}
                    </div>
                </div>

                <LineDraw />

                {/* ── Student Coordinators ── */}
                <div className="flex flex-col gap-5">
                    <RoleLabel>Student Coordinators</RoleLabel>
                    <motion.div
                        variants={{
                            hidden: {},
                            visible: { transition: { staggerChildren: 0.07 } },
                        }}
                        initial="hidden"
                        whileInView="visible"
                        viewport={VP}
                        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4"
                    >
                        {students.map((m, i) => (
                            <StudentCard key={m.id} member={m} index={i} />
                        ))}
                    </motion.div>
                </div>

                {/* ── Bottom closing line ── */}
                <LineDraw />
            </div>
        </section>
    );
};

export default About;
