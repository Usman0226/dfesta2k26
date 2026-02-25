"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Lazily load Gallery so its JS is only fetched when this route is visited
const Gallery = dynamic(() => import("@/components/Gallery"), {
    ssr: false,
    loading: () => (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-4 text-muted-foreground">
                <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                <p className="text-sm font-mono tracking-widest uppercase">Loading gallery</p>
            </div>
        </div>
    ),
});

export default function GalleryPage() {
    return (
        <>
            <Navbar />
            <main className="pt-24">
                <Gallery />
            </main>
            <Footer />
        </>
    );
}
