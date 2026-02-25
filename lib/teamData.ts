export type TeamRole = "hod" | "faculty" | "student";

export interface TeamMember {
    id: string;
    name: string;
    designation: string;
    role: TeamRole;
    subdept?: string;
    image?: string;
    email?: string;
    linkedin?: string;
    /** Tailwind gradient classes for the avatar ring */
    accent: string;
}

export const teamMembers: TeamMember[] = [
    /* ── HOD ─────────────────────────────────────────────────────── */
    {
        id: "hod-1",
        name: "Dr. Faculty Name",
        designation: "Head of Department",
        role: "hod",
        subdept: "CSE – Data Science",
        email: "hod.ds@mits.ac.in",
        accent: "from-amber-400 via-orange-500 to-violet-500",
    },

    /* ── Faculty Coordinators ───────────────────────────────────── */
    {
        id: "fc-1",
        name: "Dr. Faculty Name",
        designation: "Faculty Coordinator",
        role: "faculty",
        subdept: "Assistant Professor",
        accent: "from-violet-500 to-indigo-600",
    },
    {
        id: "fc-2",
        name: "Dr. Faculty Name",
        designation: "Faculty Coordinator",
        role: "faculty",
        subdept: "Assistant Professor",
        accent: "from-indigo-500 to-purple-600",
    },
    {
        id: "fc-3",
        name: "Dr. Faculty Name",
        designation: "Faculty Coordinator",
        role: "faculty",
        subdept: "Assistant Professor",
        accent: "from-purple-500 to-fuchsia-600",
    },

    /* ── Student Coordinators ───────────────────────────────────── */
    {
        id: "sc-1",
        name: "Student Name",
        designation: "Student Coordinator",
        role: "student",
        subdept: "Final Year, DS",
        accent: "from-cyan-500 to-blue-600",
    },
    {
        id: "sc-2",
        name: "Student Name",
        designation: "Student Coordinator",
        role: "student",
        subdept: "Final Year, DS",
        accent: "from-blue-500 to-indigo-600",
    },
    {
        id: "sc-3",
        name: "Student Name",
        designation: "Event Lead",
        role: "student",
        subdept: "Third Year, DS",
        accent: "from-teal-500 to-cyan-600",
    },
    {
        id: "sc-4",
        name: "Student Name",
        designation: "Design Lead",
        role: "student",
        subdept: "Third Year, DS",
        accent: "from-sky-500 to-blue-600",
    },
];

export const stats = [
    { value: 6, suffix: "+", label: "Years of Excellence" },
    { value: 20, suffix: "+", label: "Events & Workshops" },
    { value: 500, suffix: "+", label: "Students Impacted" },
];
