'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { Search, Filter, X } from 'lucide-react';
import { projects, getAllTags } from '@/content/projects';
import { ProjectCard } from '@/components/ui/ProjectCard';
import { FadeIn } from '@/components/animations/FadeIn';

export default function ProjectsPage() {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const allTags = getAllTags();

    const filteredProjects = projects.filter((project) => {
        const matchesSearch = project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
            project.tech.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesTag = !selectedTag || project.tags.includes(selectedTag);

        return matchesSearch && matchesTag;
    });

    return (
        <div className="pt-24 pb-16">
            <section className="section">
                <div className="container">
                    {/* Header */}
                    <FadeIn>
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-display)]">
                                My <span className="gradient-text">Projects</span>
                            </h1>
                            <p className="mt-4 text-[var(--text-secondary)] max-w-2xl mx-auto">
                                A collection of projects that showcase my skills in full-stack development,
                                from AI-powered applications to real-time systems.
                            </p>
                        </div>
                    </FadeIn>

                    {/* Filters */}
                    <FadeIn delay={0.1}>
                        <div className="mb-8 space-y-4">
                            {/* Search */}
                            <div className="relative max-w-md mx-auto">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[var(--text-muted)]" />
                                <input
                                    type="text"
                                    placeholder="Search projects..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-12 pr-4 py-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-violet)] transition-colors"
                                />
                                {searchQuery && (
                                    <button
                                        onClick={() => setSearchQuery('')}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-lg hover:bg-[var(--bg-tertiary)]"
                                    >
                                        <X size={16} className="text-[var(--text-muted)]" />
                                    </button>
                                )}
                            </div>

                            {/* Tags */}
                            <div className="flex flex-wrap justify-center gap-2">
                                <button
                                    onClick={() => setSelectedTag(null)}
                                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${!selectedTag
                                            ? 'bg-[var(--accent-violet)] text-white'
                                            : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
                                        }`}
                                >
                                    All
                                </button>
                                {allTags.map((tag) => (
                                    <button
                                        key={tag}
                                        onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedTag === tag
                                                ? 'bg-[var(--accent-violet)] text-white'
                                                : 'bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:bg-[var(--bg-tertiary)]'
                                            }`}
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </FadeIn>

                    {/* Projects Grid */}
                    {filteredProjects.length > 0 ? (
                        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                            {filteredProjects.map((project, index) => (
                                <ProjectCard key={project.slug} project={project} index={index} />
                            ))}
                        </div>
                    ) : (
                        <FadeIn>
                            <div className="text-center py-16">
                                <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-[var(--bg-secondary)] flex items-center justify-center">
                                    <Filter className="w-8 h-8 text-[var(--text-muted)]" />
                                </div>
                                <h3 className="text-xl font-semibold text-[var(--text-primary)]">No projects found</h3>
                                <p className="mt-2 text-[var(--text-secondary)]">
                                    Try adjusting your search or filter criteria
                                </p>
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setSelectedTag(null);
                                    }}
                                    className="mt-4 btn-secondary"
                                >
                                    Clear Filters
                                </button>
                            </div>
                        </FadeIn>
                    )}
                </div>
            </section>
        </div>
    );
}
