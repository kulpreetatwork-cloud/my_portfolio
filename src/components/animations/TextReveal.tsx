'use client';

import { useEffect, useState, ReactNode } from 'react';
import { motion, Variants } from 'framer-motion';

// Text that animates in word by word
interface TextRevealProps {
    text: string;
    className?: string;
    delay?: number;
    staggerDelay?: number;
}

export function TextReveal({
    text,
    className = '',
    delay = 0,
    staggerDelay = 0.05
}: TextRevealProps) {
    const words = text.split(' ');

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        },
    };

    const wordVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: 'blur(10px)',
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: 'blur(0px)',
            transition: {
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    return (
        <motion.span
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={`inline-flex flex-wrap ${className}`}
        >
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    variants={wordVariants}
                    className="mr-[0.25em] inline-block"
                >
                    {word}
                </motion.span>
            ))}
        </motion.span>
    );
}

// Character by character reveal
export function CharacterReveal({
    text,
    className = '',
    delay = 0,
    staggerDelay = 0.03,
}: TextRevealProps) {
    const characters = text.split('');

    const containerVariants: Variants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: staggerDelay,
                delayChildren: delay,
            },
        },
    };

    const charVariants: Variants = {
        hidden: {
            opacity: 0,
            y: 10,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.2,
            },
        },
    };

    return (
        <motion.span
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className={className}
        >
            {characters.map((char, i) => (
                <motion.span
                    key={i}
                    variants={charVariants}
                    className="inline-block"
                    style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                >
                    {char}
                </motion.span>
            ))}
        </motion.span>
    );
}

// Typewriter effect
export function Typewriter({
    text,
    className = '',
    delay = 0,
    speed = 50, // ms per character
    cursor = true,
}: {
    text: string;
    className?: string;
    delay?: number;
    speed?: number;
    cursor?: boolean;
}) {
    const [displayText, setDisplayText] = useState('');
    const [isTyping, setIsTyping] = useState(true);

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        let currentIndex = 0;

        const startTyping = () => {
            timeout = setTimeout(() => {
                if (currentIndex < text.length) {
                    setDisplayText(text.slice(0, currentIndex + 1));
                    currentIndex++;
                    startTyping();
                } else {
                    setIsTyping(false);
                }
            }, speed);
        };

        const delayTimeout = setTimeout(startTyping, delay);

        return () => {
            clearTimeout(timeout);
            clearTimeout(delayTimeout);
        };
    }, [text, delay, speed]);

    return (
        <span className={className}>
            {displayText}
            {cursor && (
                <motion.span
                    animate={{ opacity: isTyping ? 1 : [1, 0] }}
                    transition={{
                        duration: 0.5,
                        repeat: isTyping ? 0 : Infinity,
                        repeatType: 'reverse',
                    }}
                    className="inline-block ml-0.5 w-0.5 h-[1em] bg-current align-middle"
                />
            )}
        </span>
    );
}

// Gradient text reveal (slides gradient across text)
export function GradientTextReveal({
    children,
    className = '',
    delay = 0,
}: {
    children: ReactNode;
    className?: string;
    delay?: number;
}) {
    return (
        <motion.span
            initial={{ backgroundPosition: '200% center' }}
            animate={{ backgroundPosition: '0% center' }}
            transition={{
                duration: 1.5,
                delay,
                ease: [0.25, 0.46, 0.45, 0.94],
            }}
            className={`inline-block bg-clip-text text-transparent bg-[length:200%_auto] ${className}`}
            style={{
                backgroundImage: 'linear-gradient(90deg, var(--accent-violet), var(--accent-cyan), var(--accent-violet))',
            }}
        >
            {children}
        </motion.span>
    );
}

// Split text animation (lines come from different directions)
export function SplitReveal({
    children,
    className = '',
    delay = 0,
}: {
    children: string;
    className?: string;
    delay?: number;
}) {
    const lines = children.split('\n');

    return (
        <div className={className}>
            {lines.map((line, i) => (
                <motion.div
                    key={i}
                    initial={{
                        opacity: 0,
                        x: i % 2 === 0 ? -50 : 50,
                    }}
                    animate={{
                        opacity: 1,
                        x: 0,
                    }}
                    transition={{
                        duration: 0.6,
                        delay: delay + i * 0.15,
                        ease: [0.25, 0.46, 0.45, 0.94],
                    }}
                >
                    {line}
                </motion.div>
            ))}
        </div>
    );
}
