'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getFeaturedProjects } from '@/content/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { FadeIn } from '@/components/animations/FadeIn';

export function FeaturedProjects() {
    const featuredProjects = getFeaturedProjects();

    return (
        <section className="section bg-[var(--bg-secondary)]" id="projects">
            <div className="container">
                <FadeIn>
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)]">
                                Featured <span className="gradient-text">Projects</span>
                            </h2>
                            <p className="mt-4 text-[var(--text-secondary)] max-w-xl">
                                A selection of projects that showcase my skills and passion for building impactful applications.
                            </p>
                        </div>

                        <Link
                            href="/projects"
                            className="group flex items-center gap-2 text-[var(--accent-violet)] hover:text-[var(--accent-cyan)] transition-colors font-medium"
                        >
                            View All Projects
                            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </div>
                </FadeIn>

                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                    {featuredProjects.map((project, index) => (
                        <ProjectCard key={project.slug} project={project} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
}
