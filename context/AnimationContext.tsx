"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface AnimationContextType {
    /** true once the BrandReveal D'FESTA stroke animation finishes → Navbar + Hero CTA appear */
    isRevealComplete: boolean;
    setRevealComplete: () => void;

    /** true once the Launch overlay has fully exited (slide-up done) → D'FESTA stroke starts */
    shouldStartBrandReveal: boolean;
    setShouldStartBrandReveal: () => void;
}

const AnimationContext = createContext<AnimationContextType>({
    isRevealComplete: false,
    setRevealComplete: () => { },
    shouldStartBrandReveal: false,
    setShouldStartBrandReveal: () => { },
});

export const AnimationProvider = ({ children }: { children: React.ReactNode }) => {
    const [isRevealComplete, setIsRevealComplete] = useState(false);
    const [shouldStartBrandReveal, setShouldStartBrandRevealState] = useState(false);

    const setRevealComplete = useCallback(() => {
        setIsRevealComplete(true);
    }, []);

    const setShouldStartBrandReveal = useCallback(() => {
        setShouldStartBrandRevealState(true);
    }, []);

    return (
        <AnimationContext.Provider value={{
            isRevealComplete,
            setRevealComplete,
            shouldStartBrandReveal,
            setShouldStartBrandReveal,
        }}>
            {children}
        </AnimationContext.Provider>
    );
};

export const useAnimationContext = () => {
    const ctx = useContext(AnimationContext);
    if (!ctx) {
        throw new Error("useAnimationContext must be used within an AnimationProvider");
    }
    return ctx;
};
