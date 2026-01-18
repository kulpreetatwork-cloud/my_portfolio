'use client';

import { useState, ReactNode } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';

interface TiltCardProps {
    children: ReactNode;
    className?: string;
    tiltAmount?: number;
    glowOnHover?: boolean;
    scaleOnHover?: boolean;
}

export function TiltCard({
    children,
    className = '',
    tiltAmount = 10,
    glowOnHover = true,
    scaleOnHover = true,
}: TiltCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position for 3D tilt effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for tilt
    const springConfig = { damping: 20, stiffness: 200 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [tiltAmount, -tiltAmount]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-tiltAmount, tiltAmount]), springConfig);

    // Handle mouse move for 3D effect
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        mouseX.set((e.clientX - centerX) / rect.width);
        mouseY.set((e.clientY - centerY) / rect.height);
    };

    const handleMouseLeave = () => {
        mouseX.set(0);
        mouseY.set(0);
        setIsHovered(false);
    };

    return (
        <div className="perspective-1000">
            <motion.div
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={handleMouseLeave}
                style={{
                    rotateX,
                    rotateY,
                    transformStyle: "preserve-3d",
                }}
                animate={{
                    scale: scaleOnHover && isHovered ? 1.02 : 1,
                }}
                transition={{ duration: 0.2 }}
                className={`relative ${className}`}
            >
                {/* Glow effect */}
                {glowOnHover && (
                    <motion.div
                        className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[var(--accent-violet)] to-[var(--accent-cyan)] opacity-0 blur-sm -z-10"
                        animate={{
                            opacity: isHovered ? 0.5 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                    />
                )}

                {/* Content with 3D depth */}
                <div
                    style={{
                        transform: "translateZ(20px)",
                        transformStyle: "preserve-3d",
                    }}
                >
                    {children}
                </div>
            </motion.div>
        </div>
    );
}

// Simpler version for light 3D effect without perspective wrapper
export function TiltCardSimple({
    children,
    className = '',
}: {
    children: ReactNode;
    className?: string;
}) {
    return (
        <motion.div
            whileHover={{
                scale: 1.02,
                y: -4,
            }}
            transition={{ duration: 0.2 }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
