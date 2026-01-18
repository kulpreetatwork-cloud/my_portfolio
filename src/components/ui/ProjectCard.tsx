'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Github, ExternalLink } from 'lucide-react';
import type { Project } from '@/content/projects';

interface ProjectCardProps {
    project: Project;
    index?: number;
}

export function ProjectCard({ project, index = 0 }: ProjectCardProps) {
    const [isHovered, setIsHovered] = useState(false);

    // Mouse position for 3D tilt effect
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smooth spring animation for tilt
    const springConfig = { damping: 20, stiffness: 200 };
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

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
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="perspective-1000"
        >
            <motion.article
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
                className="relative group glass-card overflow-hidden"
            >
                {/* Glow effect */}
                <motion.div
                    className="absolute -inset-px rounded-2xl bg-gradient-to-r from-[var(--accent-violet)] to-[var(--accent-cyan)] opacity-0 blur-sm -z-10"
                    animate={{
                        opacity: isHovered ? 0.4 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                />

                {/* Thumbnail - show image if available, otherwise gradient placeholder */}
                <div
                    className="relative h-48 bg-gradient-to-br from-[var(--accent-violet)]/20 to-[var(--accent-cyan)]/20 overflow-hidden"
                    style={{ transform: "translateZ(10px)" }}
                >
                    {project.images?.thumbnail ? (
                        <Image
                            src={project.images.thumbnail}
                            alt={`${project.name} screenshot`}
                            fill
                            className="object-cover object-top transition-transform duration-500"
                            style={{
                                transform: isHovered ? "scale(1.1)" : "scale(1)",
                            }}
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    ) : (
                        <>
                            <div className="absolute inset-0 bg-[var(--bg-secondary)] opacity-50" />
                            {/* Project name overlay when no image */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-4xl font-bold font-[family-name:var(--font-display)] text-[var(--accent-violet)]/30">
                                    {project.name.charAt(0)}
                                </span>
                            </div>
                        </>
                    )}

                    {/* Shine effect on hover */}
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent"
                        initial={{ x: "-100%", opacity: 0 }}
                        animate={{
                            x: isHovered ? "100%" : "-100%",
                            opacity: isHovered ? 1 : 0,
                        }}
                        transition={{ duration: 0.6 }}
                    />

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-secondary)] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>

                <div
                    className="p-6 space-y-4"
                    style={{ transform: "translateZ(20px)" }}
                >
                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                        {project.tags.slice(0, 3).map((tag) => (
                            <span
                                key={tag}
                                className="px-2.5 py-1 text-xs font-medium rounded-full bg-[var(--accent-violet)]/10 text-[var(--accent-violet)] border border-[var(--accent-violet)]/20"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>

                    {/* Title & Summary */}
                    <div>
                        <h3 className="text-xl font-bold font-[family-name:var(--font-display)] text-[var(--text-primary)] group-hover:text-[var(--accent-violet)] transition-colors">
                            {project.name}
                        </h3>
                        <p className="mt-2 text-[var(--text-secondary)] text-sm line-clamp-2">
                            {project.summary}
                        </p>
                    </div>

                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-1.5">
                        {project.tech.slice(0, 5).map((tech) => (
                            <span
                                key={tech}
                                className="px-2 py-0.5 text-xs rounded bg-[var(--bg-tertiary)] text-[var(--text-muted)]"
                            >
                                {tech}
                            </span>
                        ))}
                        {project.tech.length > 5 && (
                            <span className="px-2 py-0.5 text-xs rounded bg-[var(--bg-tertiary)] text-[var(--text-muted)]">
                                +{project.tech.length - 5}
                            </span>
                        )}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3 pt-2">
                        <Link
                            href={`/projects/${project.slug}`}
                            className="flex items-center gap-1.5 text-sm font-medium text-[var(--accent-violet)] hover:text-[var(--accent-cyan)] transition-colors"
                        >
                            View Details
                            <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                        </Link>

                        {project.links.github && (
                            <a
                                href={project.links.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-all"
                                aria-label={`${project.name} GitHub`}
                            >
                                <Github size={16} />
                            </a>
                        )}

                        {project.links.live && (
                            <a
                                href={project.links.live}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-all"
                                aria-label={`${project.name} Live Demo`}
                            >
                                <ExternalLink size={16} />
                            </a>
                        )}
                    </div>
                </div>
            </motion.article>
        </motion.div>
    );
}
