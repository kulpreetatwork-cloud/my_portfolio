import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, ExternalLink, Github, Calendar, User, ChevronRight } from 'lucide-react';
import { projects, getProjectBySlug } from '@/content/projects';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';

interface ProjectPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return projects.map((project) => ({
        slug: project.slug,
    }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        return { title: 'Project Not Found' };
    }

    return {
        title: project.name,
        description: project.summary,
        openGraph: {
            title: project.name,
            description: project.summary,
        },
    };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
    const { slug } = await params;
    const project = getProjectBySlug(slug);

    if (!project) {
        notFound();
    }

    return (
        <div className="pt-24 pb-16">
            {/* Header */}
            <section className="section gradient-mesh">
                <div className="container">
                    {/* Breadcrumb */}
                    <FadeIn>
                        <nav className="flex items-center gap-2 text-sm text-[var(--text-muted)] mb-8">
                            <Link href="/projects" className="hover:text-[var(--accent-violet)] transition-colors">
                                Projects
                            </Link>
                            <ChevronRight size={14} />
                            <span className="text-[var(--text-primary)]">{project.name}</span>
                        </nav>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <div className="max-w-4xl">
                            {/* Tags */}
                            <div className="flex flex-wrap gap-2 mb-4">
                                {project.tags.map((tag) => (
                                    <span
                                        key={tag}
                                        className="px-3 py-1 text-sm rounded-full bg-[var(--accent-violet)]/10 text-[var(--accent-violet)] border border-[var(--accent-violet)]/20"
                                    >
                                        {tag}
                                    </span>
                                ))}
                            </div>

                            {/* Title */}
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold font-[family-name:var(--font-display)]">
                                {project.name}
                            </h1>

                            {/* Summary */}
                            <p className="mt-4 text-xl text-[var(--accent-cyan)]">
                                {project.summary}
                            </p>

                            {/* Meta */}
                            <div className="mt-6 flex flex-wrap items-center gap-6 text-[var(--text-secondary)]">
                                <span className="flex items-center gap-2">
                                    <Calendar size={16} />
                                    {project.date}
                                </span>
                                <span className="flex items-center gap-2">
                                    <User size={16} />
                                    {project.role}
                                </span>
                            </div>

                            {/* Action Buttons */}
                            <div className="mt-8 flex flex-wrap gap-4">
                                {project.links.live && (
                                    <a
                                        href={project.links.live}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-primary"
                                    >
                                        <ExternalLink size={18} />
                                        View Live Demo
                                    </a>
                                )}
                                {project.links.github && (
                                    <a
                                        href={project.links.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="btn-secondary"
                                    >
                                        <Github size={18} />
                                        View Source Code
                                    </a>
                                )}
                            </div>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* Content */}
            <section className="section">
                <div className="container">
                    {/* Project Screenshot */}
                    {project.images?.desktop && (
                        <FadeIn className="mb-12">
                            <div className="relative w-full aspect-video rounded-2xl overflow-hidden glass-card">
                                <Image
                                    src={project.images.desktop}
                                    alt={`${project.name} screenshot`}
                                    fill
                                    className="object-cover object-top"
                                    sizes="(max-width: 768px) 100vw, 80vw"
                                    priority
                                />
                            </div>
                        </FadeIn>
                    )}

                    <div className="grid lg:grid-cols-3 gap-12">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-12">
                            {/* Description */}
                            <FadeIn>
                                <div>
                                    <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-4">
                                        Overview
                                    </h2>
                                    <p className="text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                                        {project.description}
                                    </p>
                                </div>
                            </FadeIn>

                            {/* Highlights */}
                            <FadeIn delay={0.1}>
                                <div>
                                    <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-4">
                                        Key Highlights
                                    </h2>
                                    <ul className="space-y-3">
                                        {project.highlights.map((highlight, index) => (
                                            <li key={index} className="flex items-start gap-3">
                                                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--accent-violet)]/10 text-[var(--accent-violet)] flex items-center justify-center text-sm font-medium">
                                                    {index + 1}
                                                </span>
                                                <span className="text-[var(--text-secondary)]">{highlight}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </FadeIn>

                            {/* Challenges */}
                            {project.challenges && project.challenges.length > 0 && (
                                <FadeIn delay={0.2}>
                                    <div>
                                        <h2 className="text-2xl font-bold font-[family-name:var(--font-display)] mb-4">
                                            Challenges & Solutions
                                        </h2>
                                        <ul className="space-y-3">
                                            {project.challenges.map((challenge, index) => (
                                                <li key={index} className="flex items-start gap-3">
                                                    <span className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-[var(--accent-cyan)]" />
                                                    <span className="text-[var(--text-secondary)]">{challenge}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </FadeIn>
                            )}
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-8">
                            {/* Tech Stack */}
                            <FadeIn>
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                                        Tech Stack
                                    </h3>
                                    <div className="flex flex-wrap gap-2">
                                        {project.tech.map((tech) => (
                                            <span
                                                key={tech}
                                                className="px-3 py-1.5 text-sm rounded-lg bg-[var(--bg-tertiary)] text-[var(--text-secondary)]"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </FadeIn>

                            {/* Links */}
                            <FadeIn delay={0.1}>
                                <div className="glass-card p-6">
                                    <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-4">
                                        Links
                                    </h3>
                                    <div className="space-y-3">
                                        {project.links.live && (
                                            <a
                                                href={project.links.live}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--accent-violet)]/10 transition-colors"
                                            >
                                                <ExternalLink size={18} className="text-[var(--accent-violet)]" />
                                                <span className="text-[var(--text-secondary)]">Live Demo</span>
                                            </a>
                                        )}
                                        {project.links.github && (
                                            <a
                                                href={project.links.github}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-3 p-3 rounded-lg bg-[var(--bg-tertiary)] hover:bg-[var(--accent-violet)]/10 transition-colors"
                                            >
                                                <Github size={18} className="text-[var(--accent-cyan)]" />
                                                <span className="text-[var(--text-secondary)]">Source Code</span>
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </FadeIn>
                        </div>
                    </div>

                    {/* Back Link */}
                    <FadeIn delay={0.3}>
                        <div className="mt-16 pt-8 border-t border-[var(--border-color)]">
                            <Link
                                href="/projects"
                                className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-violet)] transition-colors"
                            >
                                <ArrowLeft size={18} />
                                Back to all projects
                            </Link>
                        </div>
                    </FadeIn>
                </div>
            </section>
        </div>
    );
}
