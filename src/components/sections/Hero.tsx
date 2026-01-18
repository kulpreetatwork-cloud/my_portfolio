'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowDown, Mail, FolderOpen, Download, MapPin, Briefcase } from 'lucide-react';
import { profile } from '@/content/profile';
import { Typewriter } from '@/components/animations/TextReveal';

export function Hero() {
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position for 3D tilt effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for tilt
    const springConfig = { damping: 25, stiffness: 150 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig);

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
        <section className="relative min-h-screen flex items-center justify-center gradient-mesh overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 -left-32 w-64 h-64 bg-[var(--accent-violet)]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[var(--accent-cyan)]/10 rounded-full blur-3xl" />
            </div>

            <div className="container relative z-10 pt-24 pb-16">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="text-center lg:text-left order-2 lg:order-1"
                    >
                        {/* Status Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--accent-violet)]/10 border border-[var(--accent-violet)]/20 mb-6"
                        >
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                            </span>
                            <span className="text-sm text-[var(--text-secondary)]">
                                {profile.availability}
                            </span>
                        </motion.div>

                        {/* Name */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 }}
                            className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)] leading-tight"
                        >
                            Hi, I&apos;m{' '}
                            <span className="gradient-text">{profile.name.split(' ')[0]}</span>
                        </motion.h1>

                        {/* Title */}
                        <motion.p
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="mt-4 text-xl md:text-2xl text-[var(--accent-cyan)] font-medium"
                        >
                            {profile.title}
                        </motion.p>

                        {/* Tagline with Typewriter effect */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="mt-6 text-lg text-[var(--text-secondary)] max-w-xl mx-auto lg:mx-0"
                        >
                            <Typewriter
                                text={profile.tagline}
                                delay={800}
                                speed={30}
                            />
                        </motion.div>

                        {/* Location & Preference */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.55 }}
                            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-6 text-sm text-[var(--text-muted)]"
                        >
                            <span className="flex items-center gap-1.5">
                                <MapPin size={14} />
                                {profile.location}
                            </span>
                            <span className="flex items-center gap-1.5">
                                <Briefcase size={14} />
                                {profile.workPreference.join(' / ')}
                            </span>
                        </motion.div>

                        {/* CTA Buttons */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                            className="flex flex-wrap items-center justify-center lg:justify-start gap-4 mt-8"
                        >
                            <Link href="/contact" className="btn-primary">
                                <Mail size={18} />
                                Get in Touch
                            </Link>
                            <Link href="/projects" className="btn-secondary">
                                <FolderOpen size={18} />
                                View Projects
                            </Link>
                            <a href={profile.resume.url} download className="btn-secondary">
                                <Download size={18} />
                                Resume
                            </a>
                        </motion.div>
                    </motion.div>

                    {/* Avatar with 3D Effect */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, rotateY: -30 }}
                        animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                        transition={{
                            duration: 0.8,
                            delay: 0.2,
                            type: "spring",
                            stiffness: 100
                        }}
                        className="order-1 lg:order-2 flex justify-center perspective-1000"
                    >
                        <motion.div
                            onMouseMove={handleMouseMove}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={handleMouseLeave}
                            style={{
                                rotateX,
                                rotateY,
                                transformStyle: "preserve-3d",
                            }}
                            className="relative cursor-pointer"
                        >
                            {/* Floating animation container */}
                            <motion.div
                                animate={{
                                    y: [0, -12, 0],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                }}
                            >
                                {/* Outer glow ring */}
                                <motion.div
                                    className="absolute -inset-4 rounded-full bg-gradient-to-r from-[var(--accent-violet)] via-[var(--accent-cyan)] to-[var(--accent-violet)] opacity-30 blur-xl"
                                    animate={{
                                        opacity: isHovered ? 0.5 : 0.3,
                                        scale: isHovered ? 1.1 : 1,
                                    }}
                                    transition={{ duration: 0.3 }}
                                />

                                {/* Rotating gradient border */}
                                <motion.div
                                    className="absolute -inset-1 rounded-full bg-gradient-conic from-[var(--accent-violet)] via-[var(--accent-cyan)] to-[var(--accent-violet)]"
                                    animate={{
                                        rotate: 360,
                                    }}
                                    transition={{
                                        duration: 8,
                                        repeat: Infinity,
                                        ease: "linear",
                                    }}
                                    style={{
                                        background: "conic-gradient(from 0deg, #7c3aed, #06b6d4, #7c3aed)",
                                    }}
                                />

                                {/* Inner gradient border */}
                                <div className="relative rounded-full p-1 bg-gradient-to-br from-[var(--accent-violet)] to-[var(--accent-cyan)]">
                                    {/* Photo container */}
                                    <motion.div
                                        className="relative w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden bg-[var(--bg-secondary)]"
                                        style={{
                                            transformStyle: "preserve-3d",
                                            transform: "translateZ(20px)",
                                        }}
                                    >
                                        <Image
                                            src={profile.profileImage}
                                            alt={profile.name}
                                            fill
                                            priority
                                            className="object-cover transition-transform duration-500"
                                            style={{
                                                transform: isHovered ? "scale(1.1)" : "scale(1)",
                                            }}
                                            sizes="(max-width: 768px) 256px, 320px"
                                        />

                                        {/* Shine overlay on hover */}
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent"
                                            initial={{ x: "-100%", opacity: 0 }}
                                            animate={{
                                                x: isHovered ? "100%" : "-100%",
                                                opacity: isHovered ? 1 : 0,
                                            }}
                                            transition={{ duration: 0.6 }}
                                        />
                                    </motion.div>
                                </div>

                                {/* Decorative floating particles */}
                                <motion.div
                                    className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-[var(--accent-violet)]"
                                    animate={{
                                        y: [0, -8, 0],
                                        opacity: [0.5, 1, 0.5],
                                    }}
                                    transition={{
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                />
                                <motion.div
                                    className="absolute -bottom-4 -left-4 w-3 h-3 rounded-full bg-[var(--accent-cyan)]"
                                    animate={{
                                        y: [0, 6, 0],
                                        opacity: [0.5, 1, 0.5],
                                    }}
                                    transition={{
                                        duration: 2.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 0.5,
                                    }}
                                />
                                <motion.div
                                    className="absolute top-1/2 -right-6 w-2 h-2 rounded-full bg-[var(--accent-violet)]/80"
                                    animate={{
                                        x: [0, 4, 0],
                                        opacity: [0.3, 0.8, 0.3],
                                    }}
                                    transition={{
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: 1,
                                    }}
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>

                {/* Scroll indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2"
                >
                    <span className="text-xs text-[var(--text-muted)]">Scroll to explore</span>
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                    >
                        <ArrowDown size={20} className="text-[var(--accent-violet)]" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
