'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, Sparkles } from 'lucide-react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { profile } from '@/content/profile';
import { FadeIn } from '@/components/animations/FadeIn';

export function CTASection() {
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 200 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), springConfig);

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
        <section className="section relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--accent-violet)]/5 to-transparent" />

            <div className="container relative z-10">
                <FadeIn>
                    <div className="perspective-1000 max-w-4xl mx-auto">
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
                                scale: isHovered ? 1.01 : 1,
                            }}
                            transition={{ duration: 0.2 }}
                            className="relative"
                        >
                            {/* Glow effect */}
                            <motion.div
                                className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[var(--accent-violet)] to-[var(--accent-cyan)] opacity-20 blur-lg -z-10"
                                animate={{
                                    opacity: isHovered ? 0.4 : 0.2,
                                }}
                                transition={{ duration: 0.3 }}
                            />

                            <div
                                className="glass-card p-8 md:p-12 lg:p-16 text-center"
                                style={{ transform: "translateZ(15px)" }}
                            >
                                <motion.div
                                    initial={{ scale: 0 }}
                                    whileInView={{ scale: 1 }}
                                    viewport={{ once: true }}
                                    transition={{ type: 'spring', duration: 0.5 }}
                                    whileHover={{ rotate: 360 }}
                                    className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--accent-violet)] to-[var(--accent-cyan)] flex items-center justify-center"
                                >
                                    <Sparkles className="w-8 h-8 text-white" />
                                </motion.div>

                                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold font-[family-name:var(--font-display)]">
                                    Let&apos;s Build Something{' '}
                                    <span className="gradient-text">Amazing</span> Together
                                </h2>

                                <p className="mt-6 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                                    I&apos;m actively seeking opportunities where I can contribute to innovative projects
                                    and collaborate with talented teams. Whether you have a project in mind or just want
                                    to connect — I&apos;d love to hear from you!
                                </p>

                                <div className="flex flex-wrap items-center justify-center gap-4 mt-8">
                                    <Link href="/contact" className="btn-primary text-lg px-8 py-4">
                                        <Mail size={20} />
                                        Get in Touch
                                    </Link>
                                    <a
                                        href={`mailto:${profile.email}`}
                                        className="btn-secondary text-lg px-8 py-4"
                                    >
                                        {profile.email}
                                        <ArrowRight size={20} />
                                    </a>
                                </div>

                                {/* Availability badge */}
                                <div className="mt-8 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-sm">
                                    <span className="relative flex h-2 w-2">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                                    </span>
                                    {profile.availability} • Open to opportunities
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </FadeIn>
            </div>
        </section>
    );
}
