'use client';

import { useState } from 'react';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { skills, isHighlighted } from '@/content/skills';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';

// Skill icons mapping (simple text fallback)
const skillIcons: Record<string, string> = {
    'Java': '☕',
    'JavaScript': '🟨',
    'TypeScript': '🔷',
    'React': '⚛️',
    'Node.js': '🟢',
    'MongoDB': '🍃',
    'SQL': '🗃️',
    'Git': '📦',
    'AWS': '☁️',
    'Next.js': '▲',
};

// 3D Tilt Skill Card Component
function SkillCard({ category }: { category: { name: string; skills: string[] } }) {
    const [isHovered, setIsHovered] = useState(false);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const springConfig = { damping: 20, stiffness: 200 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), springConfig);

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
        <div className="perspective-1000 h-full">
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
                    scale: isHovered ? 1.02 : 1,
                }}
                transition={{ duration: 0.2 }}
                className="relative h-full"
            >
                {/* Glow effect */}
                <motion.div
                    className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[var(--accent-violet)] to-[var(--accent-cyan)] opacity-0 blur-sm -z-10"
                    animate={{
                        opacity: isHovered ? 0.4 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                />

                <div
                    className="glass-card p-6 h-full"
                    style={{ transform: "translateZ(15px)" }}
                >
                    <h3 className="text-lg font-semibold text-[var(--accent-violet)] mb-4">
                        {category.name}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                        {category.skills.map((skill) => (
                            <motion.span
                                key={skill}
                                whileHover={{ scale: 1.08, y: -2 }}
                                className={`px-3 py-1.5 text-sm rounded-lg transition-all cursor-default ${isHighlighted(skill)
                                    ? 'bg-[var(--accent-violet)]/10 text-[var(--accent-violet)] border border-[var(--accent-violet)]/20'
                                    : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
                                    }`}
                            >
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </div>
            </motion.div>
        </div>
    );
}

export function SkillsShowcase() {
    return (
        <section className="section" id="skills">
            <div className="container">
                <FadeIn>
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)]">
                            Skills & <span className="gradient-text">Technologies</span>
                        </h2>
                        <p className="mt-4 text-[var(--text-secondary)] max-w-2xl mx-auto">
                            Technologies I work with to bring ideas to life
                        </p>
                    </div>
                </FadeIn>

                {/* Highlighted Skills */}
                <FadeIn delay={0.1}>
                    <div className="flex flex-wrap justify-center gap-3 mb-12">
                        {skills.highlighted.map((skill, index) => (
                            <motion.span
                                key={skill}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{
                                    scale: 1.1,
                                    y: -4,
                                    boxShadow: "0 10px 30px rgba(124, 58, 237, 0.3)",
                                }}
                                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-[var(--accent-violet)]/20 to-[var(--accent-cyan)]/20 border border-[var(--accent-violet)]/30 text-[var(--text-primary)] font-medium flex items-center gap-2 cursor-default"
                            >
                                {skillIcons[skill] && <span className="text-lg">{skillIcons[skill]}</span>}
                                {skill}
                            </motion.span>
                        ))}
                    </div>
                </FadeIn>

                {/* Skill Categories Grid */}
                <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.categories.map((category) => (
                        <StaggerItem key={category.name}>
                            <SkillCard category={category} />
                        </StaggerItem>
                    ))}
                </StaggerContainer>
            </div>
        </section>
    );
}
