'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
    minDuration?: number; // Minimum time to show loading screen
}

// Generate static particle positions (not random on each render)
const particlePositions = [
    { left: 25, top: 30 },
    { left: 70, top: 25 },
    { left: 45, top: 60 },
    { left: 80, top: 55 },
    { left: 30, top: 70 },
    { left: 60, top: 40 },
    { left: 20, top: 50 },
    { left: 75, top: 75 },
];

export function LoadingScreen({ minDuration = 1500 }: LoadingScreenProps) {
    const [isLoading, setIsLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);

        // Check if we've already shown the loading screen this session
        const hasLoaded = sessionStorage.getItem('hasLoaded');
        if (hasLoaded) {
            setIsLoading(false);
            return;
        }

        // Simulate loading progress
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(progressInterval);
                    return 100;
                }
                return prev + 10;
            });
        }, 100);

        // Hide loading screen after minimum duration
        const timer = setTimeout(() => {
            setIsLoading(false);
            sessionStorage.setItem('hasLoaded', 'true');
        }, minDuration);

        return () => {
            clearTimeout(timer);
            clearInterval(progressInterval);
        };
    }, [minDuration]);

    // Don't render anything until mounted to avoid hydration issues
    if (!mounted) return null;

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{
                        opacity: 0,
                        transition: { duration: 0.5, ease: 'easeInOut' }
                    }}
                    className="fixed inset-0 z-[200] bg-[var(--bg-primary)] flex flex-col items-center justify-center"
                >
                    {/* Logo/Initials Animation */}
                    <motion.div
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
                        className="relative mb-8"
                    >
                        {/* Rotating ring */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                            className="absolute -inset-4 rounded-full border-2 border-dashed border-[var(--accent-violet)]/30"
                        />

                        {/* Inner glow */}
                        <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-[var(--accent-violet)] to-[var(--accent-cyan)] opacity-30 blur-xl" />

                        {/* Logo circle */}
                        <div className="relative w-24 h-24 rounded-full bg-gradient-to-br from-[var(--accent-violet)] to-[var(--accent-cyan)] flex items-center justify-center">
                            <span className="text-3xl font-bold text-white font-[family-name:var(--font-display)]">
                                K
                            </span>
                        </div>
                    </motion.div>

                    {/* Name */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                        className="text-center mb-8"
                    >
                        <h1 className="text-2xl font-bold font-[family-name:var(--font-display)] gradient-text">
                            Kulpreet Singh
                        </h1>
                        <p className="text-[var(--text-muted)] text-sm mt-2">
                            Full-Stack Developer
                        </p>
                    </motion.div>

                    {/* Progress bar */}
                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: '200px' }}
                        transition={{ delay: 0.5, duration: 0.3 }}
                        className="relative"
                    >
                        <div className="h-1 w-[200px] bg-[var(--bg-tertiary)] rounded-full overflow-hidden">
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${Math.min(progress, 100)}%` }}
                                className="h-full bg-gradient-to-r from-[var(--accent-violet)] to-[var(--accent-cyan)]"
                            />
                        </div>

                        {/* Loading text */}
                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.7 }}
                            className="text-[var(--text-muted)] text-xs mt-3 text-center"
                        >
                            Loading experience...
                        </motion.p>
                    </motion.div>

                    {/* Floating particles with static positions */}
                    {particlePositions.map((pos, i) => (
                        <motion.div
                            key={i}
                            className={`absolute w-2 h-2 rounded-full ${i % 2 === 0 ? 'bg-[var(--accent-violet)]' : 'bg-[var(--accent-cyan)]'
                                }`}
                            style={{
                                left: `${pos.left}%`,
                                top: `${pos.top}%`,
                            }}
                            animate={{
                                y: [0, -20, 0],
                                opacity: [0.2, 0.6, 0.2],
                            }}
                            transition={{
                                duration: 2 + i * 0.3,
                                repeat: Infinity,
                                delay: i * 0.2,
                            }}
                        />
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );
}

// Simpler loading spinner for use in other places
export function LoadingSpinner({ size = 'md' }: { size?: 'sm' | 'md' | 'lg' }) {
    const sizes = {
        sm: 'w-4 h-4 border-2',
        md: 'w-8 h-8 border-3',
        lg: 'w-12 h-12 border-4',
    };

    return (
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
            className={`${sizes[size]} border-[var(--accent-violet)]/30 border-t-[var(--accent-violet)] rounded-full`}
        />
    );
}
