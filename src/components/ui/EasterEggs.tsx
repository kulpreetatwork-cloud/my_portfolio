'use client';

import { useEffect, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Konami Code: ↑ ↑ ↓ ↓ ← → ← → B A
const KONAMI_CODE = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
];

// Secret word: Type "hire" anywhere on the page
const SECRET_WORD = ['KeyH', 'KeyI', 'KeyR', 'KeyE'];

interface EasterEggState {
    konamiActivated: boolean;
    secretWordActivated: boolean;
    clickCount: number;
}

export function EasterEggs() {
    const [state, setState] = useState<EasterEggState>({
        konamiActivated: false,
        secretWordActivated: false,
        clickCount: 0,
    });
    const [konamiProgress, setKonamiProgress] = useState<string[]>([]);
    const [secretWordProgress, setSecretWordProgress] = useState<string[]>([]);
    const [showConfetti, setShowConfetti] = useState(false);

    // Console Easter egg on mount
    useEffect(() => {
        console.log('%c 🚀 Welcome to my portfolio! ', 'background: linear-gradient(90deg, #7c3aed, #06b6d4); color: white; font-size: 20px; padding: 10px; border-radius: 5px;');
        console.log('%c Looking for Easter eggs? Try the Konami code! ', 'color: #7c3aed; font-size: 14px;');
        console.log('%c Or maybe type a secret word... 🤫 ', 'color: #06b6d4; font-size: 12px;');
        console.log('%c Built with ❤️ by Kulpreet Singh ', 'color: #a1a1aa; font-size: 11px;');
    }, []);

    // Keyboard listener for easter eggs
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Skip if typing in an input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) {
                return;
            }

            const key = e.code;

            // Check Konami code
            setKonamiProgress(prev => {
                const newProgress = [...prev, key].slice(-KONAMI_CODE.length);

                // Check if matches
                if (newProgress.length === KONAMI_CODE.length &&
                    newProgress.every((k, i) => k === KONAMI_CODE[i])) {
                    setState(s => ({ ...s, konamiActivated: true }));
                    triggerConfetti();
                    console.log('%c 🎮 KONAMI CODE ACTIVATED! 🎮 ', 'background: #7c3aed; color: white; font-size: 16px; padding: 5px;');
                }

                return newProgress;
            });

            // Check secret word
            setSecretWordProgress(prev => {
                const newProgress = [...prev, key].slice(-SECRET_WORD.length);

                if (newProgress.length === SECRET_WORD.length &&
                    newProgress.every((k, i) => k === SECRET_WORD[i])) {
                    setState(s => ({ ...s, secretWordActivated: true }));
                    console.log('%c 💼 Psst... I am actively looking for opportunities! Lets connect! ', 'background: #06b6d4; color: white; font-size: 14px; padding: 5px;');
                }

                return newProgress;
            });
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    // Logo click easter egg
    const handleLogoClick = useCallback(() => {
        setState(s => {
            const newCount = s.clickCount + 1;
            if (newCount >= 5) {
                console.log('%c 🐣 You found a secret! Thanks for being curious! ', 'background: #22c55e; color: white; font-size: 14px; padding: 5px;');
                return { ...s, clickCount: 0 };
            }
            return { ...s, clickCount: newCount };
        });
    }, []);

    // Confetti effect
    const triggerConfetti = () => {
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 3000);
    };

    return (
        <>
            {/* Konami Code celebration overlay */}
            <AnimatePresence>
                {state.konamiActivated && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[300] pointer-events-none flex items-center justify-center"
                    >
                        <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            exit={{ scale: 0, rotate: 180 }}
                            transition={{ type: 'spring', duration: 0.8 }}
                            className="bg-[var(--bg-secondary)] p-8 rounded-2xl shadow-2xl border border-[var(--accent-violet)]/50 text-center pointer-events-auto"
                            onClick={() => setState(s => ({ ...s, konamiActivated: false }))}
                        >
                            <div className="text-6xl mb-4">🎮</div>
                            <h2 className="text-2xl font-bold gradient-text mb-2">
                                Konami Code Activated!
                            </h2>
                            <p className="text-[var(--text-secondary)] mb-4">
                                You found the classic Easter egg! 🕹️
                            </p>
                            <p className="text-xs text-[var(--text-muted)]">
                                Click to close
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Secret word popup */}
            <AnimatePresence>
                {state.secretWordActivated && (
                    <motion.div
                        initial={{ opacity: 0, y: 50, x: 50 }}
                        animate={{ opacity: 1, y: 0, x: 0 }}
                        exit={{ opacity: 0, y: 50, x: 50 }}
                        transition={{ type: 'spring', duration: 0.5 }}
                        className="fixed bottom-24 right-8 z-[300] pointer-events-auto"
                        onClick={() => setState(s => ({ ...s, secretWordActivated: false }))}
                    >
                        <div className="bg-gradient-to-r from-[var(--accent-violet)] to-[var(--accent-cyan)] p-4 rounded-2xl shadow-xl max-w-xs">
                            <div className="flex items-center gap-3">
                                <span className="text-3xl">💼</span>
                                <div>
                                    <p className="text-white font-semibold text-sm">
                                        You typed &quot;hire&quot;!
                                    </p>
                                    <p className="text-white/80 text-xs">
                                        I&apos;m available for opportunities. Let&apos;s connect!
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Confetti effect */}
            <AnimatePresence>
                {showConfetti && (
                    <div className="fixed inset-0 z-[250] pointer-events-none overflow-hidden">
                        {[...Array(50)].map((_, i) => (
                            <motion.div
                                key={i}
                                className="absolute w-3 h-3 rounded-full"
                                style={{
                                    left: `${Math.random() * 100}%`,
                                    backgroundColor: ['#7c3aed', '#06b6d4', '#22c55e', '#f59e0b', '#ef4444'][i % 5],
                                }}
                                initial={{
                                    y: -20,
                                    opacity: 1,
                                    scale: Math.random() * 0.5 + 0.5,
                                    rotate: 0,
                                }}
                                animate={{
                                    y: window.innerHeight + 100,
                                    opacity: 0,
                                    rotate: Math.random() * 720 - 360,
                                }}
                                transition={{
                                    duration: Math.random() * 2 + 2,
                                    delay: Math.random() * 0.5,
                                    ease: 'easeOut',
                                }}
                            />
                        ))}
                    </div>
                )}
            </AnimatePresence>
        </>
    );
}

// Export hook for logo click tracking
export function useEasterEggClick() {
    const [clickCount, setClickCount] = useState(0);

    const handleClick = useCallback(() => {
        setClickCount(c => {
            const newCount = c + 1;
            if (newCount >= 5) {
                console.log('%c 🐣 You found a secret! ', 'background: #22c55e; color: white; font-size: 14px; padding: 5px;');
                return 0;
            }
            return newCount;
        });
    }, []);

    return { clickCount, handleClick };
}
