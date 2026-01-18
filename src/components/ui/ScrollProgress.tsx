'use client';

import { motion, useScroll, useSpring } from 'framer-motion';

export function ScrollProgress() {
    const { scrollYProgress } = useScroll();

    // Smooth spring animation for the progress
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            className="fixed top-0 left-0 right-0 h-1 z-[60] origin-left"
            style={{
                scaleX,
                background: 'linear-gradient(90deg, var(--accent-violet), var(--accent-cyan))',
            }}
        />
    );
}

// Alternative: Circular progress indicator
export function CircularProgress() {
    const { scrollYProgress } = useScroll();

    const pathLength = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="fixed bottom-8 right-8 z-50 hidden md:block"
        >
            <svg width="60" height="60" viewBox="0 0 60 60">
                {/* Background circle */}
                <circle
                    cx="30"
                    cy="30"
                    r="26"
                    fill="none"
                    stroke="var(--bg-tertiary)"
                    strokeWidth="4"
                />
                {/* Progress circle */}
                <motion.circle
                    cx="30"
                    cy="30"
                    r="26"
                    fill="none"
                    stroke="url(#progress-gradient)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    style={{
                        pathLength,
                        rotate: -90,
                        transformOrigin: "center",
                    }}
                />
                <defs>
                    <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="var(--accent-violet)" />
                        <stop offset="100%" stopColor="var(--accent-cyan)" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Scroll to top button in center */}
            <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="absolute inset-0 flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--accent-violet)] transition-colors"
                aria-label="Scroll to top"
            >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 15l-6-6-6 6" />
                </svg>
            </button>
        </motion.div>
    );
}
