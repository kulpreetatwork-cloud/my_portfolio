'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
    Download, ExternalLink, Briefcase, GraduationCap, Code,
    Award, ArrowRight, Calendar, MapPin, Sparkles, FileCode,
    Database, Globe, Wrench, Brain
} from 'lucide-react';
import { profile } from '@/content/profile';
import { projects } from '@/content/projects';
import { skills } from '@/content/skills';
import { education, certifications } from '@/content/education';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';

// Icon mapping for skill categories
const categoryIcons: Record<string, React.ReactNode> = {
    'Languages': <Code size={20} />,
    'Frontend': <Globe size={20} />,
    'Backend': <Database size={20} />,
    'Database': <Database size={20} />,
    'AI / ML': <Brain size={20} />,
    'DevOps & Tools': <Wrench size={20} />,
    'Concepts': <Sparkles size={20} />,
};

export default function ResumePage() {
    const [activeSection, setActiveSection] = useState('experience');

    return (
        <div className="pt-24 pb-16">
            {/* Hero Section */}
            <section className="section gradient-mesh">
                <div className="container max-w-5xl">
                    <FadeIn>
                        <div className="text-center mb-12">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ type: 'spring', duration: 0.5 }}
                                className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[var(--accent-violet)] to-[var(--accent-cyan)] flex items-center justify-center"
                            >
                                <FileCode size={36} className="text-white" />
                            </motion.div>

                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)]">
                                Interactive <span className="gradient-text">Resume</span>
                            </h1>
                            <p className="mt-4 text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
                                Explore my experience, skills, and qualifications in an interactive format
                            </p>
                        </div>
                    </FadeIn>

                    {/* Quick Stats */}
                    <FadeIn delay={0.1}>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
                            {[
                                { label: 'Projects', value: projects.length + '+', icon: <Briefcase size={20} /> },
                                { label: 'Skills', value: skills.categories.reduce((a, c) => a + c.skills.length, 0) + '+', icon: <Code size={20} /> },
                                { label: 'Certifications', value: certifications.length, icon: <Award size={20} /> },
                                { label: 'Years Coding', value: '2+', icon: <Calendar size={20} /> },
                            ].map((stat, i) => (
                                <motion.div
                                    key={stat.label}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2 + i * 0.1 }}
                                    className="glass-card p-4 text-center"
                                >
                                    <div className="w-10 h-10 mx-auto mb-2 rounded-lg bg-[var(--accent-violet)]/10 flex items-center justify-center text-[var(--accent-violet)]">
                                        {stat.icon}
                                    </div>
                                    <div className="text-2xl font-bold gradient-text">{stat.value}</div>
                                    <div className="text-sm text-[var(--text-muted)]">{stat.label}</div>
                                </motion.div>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Download Buttons */}
                    <FadeIn delay={0.2}>
                        <div className="flex flex-wrap justify-center gap-4 mb-12">
                            <a
                                href={profile.resume.url}
                                download
                                className="btn-primary group"
                            >
                                <Download size={18} />
                                Download PDF
                                <motion.span
                                    animate={{ y: [0, 2, 0] }}
                                    transition={{ duration: 1, repeat: Infinity }}
                                >
                                    ↓
                                </motion.span>
                            </a>
                            <a
                                href={profile.resume.driveLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="btn-secondary"
                            >
                                <ExternalLink size={18} />
                                Google Drive
                            </a>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Interactive Resume Content */}
            <section className="section bg-[var(--bg-secondary)]">
                <div className="container max-w-5xl">
                    {/* Section Navigation */}
                    <FadeIn>
                        <div className="flex flex-wrap justify-center gap-2 mb-12">
                            {[
                                { id: 'experience', label: 'Experience', icon: <Briefcase size={16} /> },
                                { id: 'skills', label: 'Skills', icon: <Code size={16} /> },
                                { id: 'education', label: 'Education', icon: <GraduationCap size={16} /> },
                                { id: 'certifications', label: 'Certifications', icon: <Award size={16} /> },
                            ].map((section) => (
                                <button
                                    key={section.id}
                                    onClick={() => setActiveSection(section.id)}
                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all ${activeSection === section.id
                                        ? 'bg-gradient-to-r from-[var(--accent-violet)] to-[var(--accent-cyan)] text-white'
                                        : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                                        }`}
                                >
                                    {section.icon}
                                    {section.label}
                                </button>
                            ))}
                        </div>
                    </FadeIn>

                    {/* Experience Section */}
                    {activeSection === 'experience' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-8 flex items-center gap-3">
                                <Briefcase className="text-[var(--accent-violet)]" />
                                Project Experience
                            </h2>

                            <div className="space-y-6">
                                {projects.map((project, index) => (
                                    <motion.div
                                        key={project.slug}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="glass-card p-6 hover:border-[var(--accent-violet)]/50 transition-colors"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                                            <div className="flex-1">
                                                <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                                                    {project.name}
                                                </h3>
                                                <p className="text-[var(--accent-cyan)] text-sm mt-1">
                                                    {project.role}
                                                </p>
                                                <p className="mt-3 text-[var(--text-secondary)]">
                                                    {project.summary}
                                                </p>

                                                {/* Key Highlights */}
                                                <ul className="mt-4 space-y-2">
                                                    {project.highlights.slice(0, 3).map((highlight, i) => (
                                                        <li key={i} className="flex items-start gap-2 text-sm text-[var(--text-secondary)]">
                                                            <span className="text-[var(--accent-violet)] mt-1">▹</span>
                                                            {highlight}
                                                        </li>
                                                    ))}
                                                </ul>

                                                {/* Tech Stack */}
                                                <div className="mt-4 flex flex-wrap gap-2">
                                                    {project.tech.slice(0, 6).map((tech) => (
                                                        <span
                                                            key={tech}
                                                            className="px-2 py-1 text-xs rounded-md bg-[var(--bg-tertiary)] text-[var(--text-muted)]"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            <div className="flex flex-col items-end gap-2">
                                                <span className="text-sm text-[var(--text-muted)]">
                                                    {project.date}
                                                </span>
                                                <Link
                                                    href={`/projects/${project.slug}`}
                                                    className="flex items-center gap-1 text-sm text-[var(--accent-violet)] hover:text-[var(--accent-cyan)] transition-colors"
                                                >
                                                    View Details
                                                    <ArrowRight size={14} />
                                                </Link>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Skills Section */}
                    {activeSection === 'skills' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-8 flex items-center gap-3">
                                <Code className="text-[var(--accent-violet)]" />
                                Technical Skills
                            </h2>

                            <div className="grid md:grid-cols-2 gap-6">
                                {skills.categories.map((category, index) => (
                                    <motion.div
                                        key={category.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="glass-card p-6"
                                    >
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[var(--accent-violet)] to-[var(--accent-cyan)] flex items-center justify-center text-white">
                                                {categoryIcons[category.name] || <Code size={20} />}
                                            </div>
                                            <h3 className="font-semibold text-[var(--text-primary)]">
                                                {category.name}
                                            </h3>
                                        </div>

                                        <div className="flex flex-wrap gap-2">
                                            {category.skills.map((skill) => (
                                                <span
                                                    key={skill}
                                                    className={`px-3 py-1.5 text-sm rounded-lg transition-all ${skills.highlighted.includes(skill)
                                                        ? 'bg-[var(--accent-violet)]/20 text-[var(--accent-violet)] border border-[var(--accent-violet)]/30'
                                                        : 'bg-[var(--bg-tertiary)] text-[var(--text-secondary)]'
                                                        }`}
                                                >
                                                    {skill}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Education Section */}
                    {activeSection === 'education' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-8 flex items-center gap-3">
                                <GraduationCap className="text-[var(--accent-violet)]" />
                                Education
                            </h2>

                            <div className="space-y-6">
                                {education.map((edu, index) => (
                                    <motion.div
                                        key={edu.institution}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="glass-card p-6 relative overflow-hidden"
                                    >
                                        {edu.current && (
                                            <div className="absolute top-0 right-0 bg-gradient-to-r from-[var(--accent-violet)] to-[var(--accent-cyan)] text-white text-xs px-4 py-1 rounded-bl-xl">
                                                Current
                                            </div>
                                        )}

                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                            <div>
                                                <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                                                    {edu.degree}
                                                    {edu.field && (
                                                        <span className="text-[var(--accent-cyan)]"> in {edu.field}</span>
                                                    )}
                                                </h3>
                                                <p className="mt-1 text-[var(--text-secondary)]">
                                                    {edu.institution}
                                                </p>
                                                <div className="mt-2 flex items-center gap-4 text-sm text-[var(--text-muted)]">
                                                    <span className="flex items-center gap-1">
                                                        <MapPin size={14} />
                                                        {edu.location}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Calendar size={14} />
                                                        {edu.period}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    )}

                    {/* Certifications Section */}
                    {activeSection === 'certifications' && (
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                        >
                            <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-8 flex items-center gap-3">
                                <Award className="text-[var(--accent-violet)]" />
                                Certifications
                            </h2>

                            <div className="grid md:grid-cols-2 gap-4">
                                {certifications.map((cert, index) => (
                                    <motion.a
                                        key={cert.name}
                                        href={cert.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 }}
                                        className="glass-card p-5 hover:border-[var(--accent-violet)]/50 transition-all group"
                                    >
                                        <div className="flex items-start gap-4">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[var(--accent-violet)] to-[var(--accent-cyan)] flex items-center justify-center text-white flex-shrink-0">
                                                <Award size={24} />
                                            </div>
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-[var(--text-primary)] group-hover:text-[var(--accent-violet)] transition-colors">
                                                    {cert.name}
                                                </h3>
                                                <p className="text-sm text-[var(--text-secondary)] mt-1">
                                                    {cert.issuer}
                                                </p>
                                            </div>
                                            <ExternalLink size={16} className="text-[var(--text-muted)] group-hover:text-[var(--accent-violet)] transition-colors" />
                                        </div>
                                    </motion.a>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <section className="section">
                <div className="container max-w-3xl text-center">
                    <FadeIn>
                        <div className="glass-card p-8 md:p-12">
                            <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)]">
                                Interested in working together?
                            </h2>
                            <p className="mt-4 text-[var(--text-secondary)]">
                                I&apos;m always open to discussing new opportunities and exciting projects.
                            </p>
                            <div className="mt-8 flex flex-wrap justify-center gap-4">
                                <Link href="/contact" className="btn-primary">
                                    Get in Touch
                                    <ArrowRight size={18} />
                                </Link>
                                <a
                                    href={profile.resume.url}
                                    download
                                    className="btn-secondary"
                                >
                                    <Download size={18} />
                                    Download Resume
                                </a>
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}
