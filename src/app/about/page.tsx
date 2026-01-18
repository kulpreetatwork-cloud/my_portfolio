import { Metadata } from 'next';
import { MapPin, GraduationCap, Award, Heart, Code, Users, Lightbulb, MessageCircle, Coffee, Rocket, Calendar, FileCode } from 'lucide-react';
import { profile } from '@/content/profile';
import { education, certifications } from '@/content/education';
import { projects } from '@/content/projects';
import { skills } from '@/content/skills';
import { FadeIn, StaggerContainer, StaggerItem } from '@/components/animations/FadeIn';

export const metadata: Metadata = {
    title: 'About',
    description: profile.bio.long,
};

// Calculate some dynamic stats
const stats = [
    {
        icon: <FileCode size={24} />,
        value: projects.length + '+',
        label: 'Projects Built',
        color: 'var(--accent-violet)'
    },
    {
        icon: <Code size={24} />,
        value: skills.categories.reduce((acc, cat) => acc + cat.skills.length, 0) + '+',
        label: 'Technologies',
        color: 'var(--accent-cyan)'
    },
    {
        icon: <Coffee size={24} />,
        value: '1000+',
        label: 'Cups of Coffee',
        color: '#f59e0b'
    },
    {
        icon: <Rocket size={24} />,
        value: '∞',
        label: 'Ideas to Build',
        color: '#22c55e'
    },
];

export default function AboutPage() {
    return (
        <div className="pt-24 pb-16">
            {/* Hero Section - Without redundant image */}
            <section className="section gradient-mesh">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        {/* Animated Stats Card - Replaces the photo */}
                        <FadeIn direction="left">
                            <div className="relative">
                                {/* Decorative background */}
                                <div className="absolute -inset-4 bg-gradient-to-r from-[var(--accent-violet)]/20 to-[var(--accent-cyan)]/20 rounded-3xl blur-2xl" />

                                <div className="relative glass-card p-8 md:p-10">
                                    <div className="grid grid-cols-2 gap-6">
                                        {stats.map((stat, index) => (
                                            <div
                                                key={stat.label}
                                                className="text-center p-4 rounded-xl bg-[var(--bg-tertiary)]/50 hover:bg-[var(--bg-tertiary)] transition-colors"
                                            >
                                                <div
                                                    className="w-12 h-12 mx-auto mb-3 rounded-xl flex items-center justify-center"
                                                    style={{
                                                        backgroundColor: `${stat.color}20`,
                                                        color: stat.color
                                                    }}
                                                >
                                                    {stat.icon}
                                                </div>
                                                <div
                                                    className="text-3xl font-bold font-[family-name:var(--font-display)]"
                                                    style={{ color: stat.color }}
                                                >
                                                    {stat.value}
                                                </div>
                                                <div className="text-sm text-[var(--text-secondary)] mt-1">
                                                    {stat.label}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Fun tagline */}
                                    <div className="mt-6 text-center text-[var(--text-muted)] text-sm">
                                        <span className="inline-flex items-center gap-2">
                                            <Calendar size={14} />
                                            Coding since {new Date().getFullYear() - 2}+ years
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Content */}
                        <FadeIn direction="right" delay={0.1}>
                            <div>
                                <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-display)]">
                                    About <span className="gradient-text">Me</span>
                                </h1>

                                <div className="mt-6 flex flex-wrap items-center gap-4 text-[var(--text-secondary)]">
                                    <span className="flex items-center gap-2">
                                        <MapPin size={18} className="text-[var(--accent-violet)]" />
                                        {profile.location}
                                    </span>
                                    <span className="flex items-center gap-2">
                                        <GraduationCap size={18} className="text-[var(--accent-cyan)]" />
                                        {education[0].degree} in {education[0].field}
                                    </span>
                                </div>

                                <p className="mt-6 text-lg text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">
                                    {profile.bio.long}
                                </p>

                                {/* Work Preferences */}
                                <div className="mt-8 flex flex-wrap gap-2">
                                    {profile.workPreference.map((pref) => (
                                        <span
                                            key={pref}
                                            className="px-3 py-1.5 text-sm rounded-full bg-[var(--accent-violet)]/10 text-[var(--accent-violet)] border border-[var(--accent-violet)]/20"
                                        >
                                            {pref}
                                        </span>
                                    ))}
                                    <span className="px-3 py-1.5 text-sm rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                                        {profile.availability}
                                    </span>
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="section bg-[var(--bg-secondary)]">
                <div className="container">
                    <FadeIn>
                        <div className="text-center mb-12">
                            <h2 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)]">
                                What <span className="gradient-text">Drives</span> Me
                            </h2>
                            <p className="mt-4 text-[var(--text-secondary)] max-w-2xl mx-auto">
                                The principles and values that guide my work
                            </p>
                        </div>
                    </FadeIn>

                    <StaggerContainer className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {profile.values.map((value, index) => {
                            const icons = [<Code key="code" />, <Heart key="heart" />, <Lightbulb key="lightbulb" />, <Users key="users" />];
                            return (
                                <StaggerItem key={value.title}>
                                    <div className="glass-card p-6 h-full text-center">
                                        <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-gradient-to-br from-[var(--accent-violet)] to-[var(--accent-cyan)] flex items-center justify-center text-white">
                                            {icons[index] || <MessageCircle />}
                                        </div>
                                        <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                                            {value.title}
                                        </h3>
                                        <p className="mt-2 text-sm text-[var(--text-secondary)]">
                                            {value.description}
                                        </p>
                                    </div>
                                </StaggerItem>
                            );
                        })}
                    </StaggerContainer>
                </div>
            </section>

            {/* Education & Certifications */}
            <section className="section">
                <div className="container">
                    <div className="grid lg:grid-cols-2 gap-12">
                        {/* Education */}
                        <FadeIn>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] flex items-center gap-3 mb-8">
                                    <GraduationCap className="text-[var(--accent-violet)]" />
                                    Education
                                </h2>

                                <div className="space-y-6">
                                    {education.map((edu) => (
                                        <div key={edu.institution} className="glass-card p-6">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-[var(--text-primary)]">
                                                        {edu.degree}
                                                        {edu.field && <span className="text-[var(--accent-violet)]"> in {edu.field}</span>}
                                                    </h3>
                                                    <p className="mt-1 text-[var(--text-secondary)]">{edu.institution}</p>
                                                    <p className="mt-1 text-sm text-[var(--text-muted)]">{edu.location}</p>
                                                </div>
                                                {edu.current && (
                                                    <span className="px-2.5 py-1 text-xs font-medium rounded-full bg-[var(--accent-cyan)]/10 text-[var(--accent-cyan)] border border-[var(--accent-cyan)]/20">
                                                        Current
                                                    </span>
                                                )}
                                            </div>
                                            <div className="mt-4 text-sm">
                                                <span className="text-[var(--text-muted)]">{edu.period}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>

                        {/* Certifications */}
                        <FadeIn delay={0.1}>
                            <div>
                                <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-display)] flex items-center gap-3 mb-8">
                                    <Award className="text-[var(--accent-cyan)]" />
                                    Certifications
                                </h2>

                                <div className="space-y-4">
                                    {certifications.map((cert) => (
                                        <a
                                            key={cert.name}
                                            href={cert.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="block glass-card p-5 hover:border-[var(--accent-violet)] transition-colors"
                                        >
                                            <h3 className="font-medium text-[var(--text-primary)]">{cert.name}</h3>
                                            <p className="mt-1 text-sm text-[var(--text-secondary)]">{cert.issuer}</p>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>
        </div>
    );
}
