'use client';

import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export function CustomCursor() {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(true);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    // Smooth spring animation
    const springConfig = { damping: 25, stiffness: 300 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    useEffect(() => {
        // Check if mobile
        const checkMobile = () => {
            setIsMobile(window.matchMedia('(max-width: 768px)').matches ||
                'ontouchstart' in window);
        };
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnter = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.matches('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')) {
                setIsHovering(true);
            }
        };

        const handleMouseLeave = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.matches('a, button, [role="button"], input, textarea, select, [data-cursor-hover]')) {
                setIsHovering(false);
            }
        };

        const handleMouseOut = () => {
            setIsVisible(false);
        };

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseover', handleMouseEnter);
        document.addEventListener('mouseout', handleMouseLeave);
        document.addEventListener('mouseleave', handleMouseOut);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleMouseEnter);
            document.removeEventListener('mouseout', handleMouseLeave);
            document.removeEventListener('mouseleave', handleMouseOut);
            window.removeEventListener('resize', checkMobile);
        };
    }, [cursorX, cursorY, isVisible]);

    // Don't render on mobile
    if (isMobile) return null;

    return (
        <>
            {/* Main cursor dot */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference"
                style={{
                    x: smoothX,
                    y: smoothY,
                }}
            >
                <motion.div
                    animate={{
                        scale: isHovering ? 2.5 : 1,
                        opacity: isVisible ? 1 : 0,
                    }}
                    transition={{ duration: 0.2 }}
                    className="relative -translate-x-1/2 -translate-y-1/2"
                >
                    <div className="w-3 h-3 bg-white rounded-full" />
                </motion.div>
            </motion.div>

            {/* Cursor glow/trail */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-[99]"
                style={{
                    x: smoothX,
                    y: smoothY,
                }}
            >
                <motion.div
                    animate={{
                        scale: isHovering ? 1.5 : 1,
                        opacity: isVisible ? 0.5 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                    className="relative -translate-x-1/2 -translate-y-1/2"
                >
                    <div
                        className="w-8 h-8 rounded-full"
                        style={{
                            background: 'radial-gradient(circle, var(--accent-violet) 0%, transparent 70%)',
                        }}
                    />
                </motion.div>
            </motion.div>
        </>
    );
}

// Simpler cursor ring
export function CursorRing() {
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isMobile, setIsMobile] = useState(true);

    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 20, stiffness: 200 };
    const smoothX = useSpring(cursorX, springConfig);
    const smoothY = useSpring(cursorY, springConfig);

    useEffect(() => {
        setIsMobile(window.matchMedia('(max-width: 768px)').matches ||
            'ontouchstart' in window);

        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);
            if (!isVisible) setIsVisible(true);
        };

        const handleHoverStart = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (target.closest('a, button, [role="button"]')) {
                setIsHovering(true);
            }
        };

        const handleHoverEnd = () => {
            setIsHovering(false);
        };

        window.addEventListener('mousemove', moveCursor);
        document.addEventListener('mouseover', handleHoverStart);
        document.addEventListener('mouseout', handleHoverEnd);

        return () => {
            window.removeEventListener('mousemove', moveCursor);
            document.removeEventListener('mouseover', handleHoverStart);
            document.removeEventListener('mouseout', handleHoverEnd);
        };
    }, [cursorX, cursorY, isVisible]);

    if (isMobile) return null;

    return (
        <motion.div
            className="fixed top-0 left-0 pointer-events-none z-[100]"
            style={{
                x: smoothX,
                y: smoothY,
            }}
        >
            <motion.div
                animate={{
                    scale: isHovering ? 1.8 : 1,
                    opacity: isVisible ? 1 : 0,
                }}
                transition={{ duration: 0.2 }}
                className="relative -translate-x-1/2 -translate-y-1/2"
            >
                <div
                    className="w-6 h-6 rounded-full border-2 border-[var(--accent-violet)]"
                    style={{
                        boxShadow: isHovering ? '0 0 20px var(--accent-violet)' : 'none',
                    }}
                />
            </motion.div>
        </motion.div>
    );
}
