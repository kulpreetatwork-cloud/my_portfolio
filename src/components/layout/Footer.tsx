import Link from 'next/link';
import { Github, Linkedin, Mail, Heart, MapPin, ArrowUpRight } from 'lucide-react';
import { profile } from '@/content/profile';

const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/about', label: 'About' },
    { href: '/projects', label: 'Projects' },
    { href: '/resume', label: 'Resume' },
    { href: '/contact', label: 'Contact' },
];

export function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-[var(--bg-secondary)] border-t border-[var(--border-color)]">
            {/* Main Footer Content */}
            <div className="container">
                {/* Top spacing */}
                <div className="pt-16 md:pt-20" />

                {/* Footer Grid - 3 columns on desktop */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">

                    {/* Column 1: Social Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-6">
                            Connect
                        </h3>

                        <div className="flex items-center gap-3 mb-6">
                            <a
                                href={profile.socials.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-white hover:bg-gradient-to-br hover:from-[var(--accent-violet)] hover:to-[var(--accent-cyan)] transition-all duration-300"
                                aria-label="GitHub"
                            >
                                <Github size={20} />
                            </a>
                            <a
                                href={profile.socials.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="p-3 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-white hover:bg-gradient-to-br hover:from-[var(--accent-violet)] hover:to-[var(--accent-cyan)] transition-all duration-300"
                                aria-label="LinkedIn"
                            >
                                <Linkedin size={20} />
                            </a>
                            <a
                                href={`mailto:${profile.email}`}
                                className="p-3 rounded-xl bg-[var(--bg-tertiary)] text-[var(--text-secondary)] hover:text-white hover:bg-gradient-to-br hover:from-[var(--accent-violet)] hover:to-[var(--accent-cyan)] transition-all duration-300"
                                aria-label="Email"
                            >
                                <Mail size={20} />
                            </a>
                        </div>

                        {/* Availability Badge */}
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                            </span>
                            <span className="text-sm text-green-400">
                                Open to opportunities
                            </span>
                        </div>
                    </div>

                    {/* Column 2: Quick Links */}
                    <div>
                        <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-6">
                            Quick Links
                        </h3>

                        <nav className="grid grid-cols-2 gap-3">
                            {quickLinks.map((link) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    className="text-[var(--text-secondary)] hover:text-[var(--accent-violet)] transition-colors"
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </nav>
                    </div>

                    {/* Column 3: Contact Info */}
                    <div>
                        <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider mb-6">
                            Get In Touch
                        </h3>

                        <div className="space-y-4">
                            <a
                                href={`mailto:${profile.email}`}
                                className="group flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--accent-violet)] transition-colors"
                            >
                                <Mail size={16} className="flex-shrink-0" />
                                <span>{profile.email}</span>
                                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                            </a>

                            <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                                <MapPin size={16} className="flex-shrink-0" />
                                <span>{profile.location}</span>
                            </div>

                            {/* Work preference tags */}
                            <div className="flex flex-wrap gap-2 pt-2">
                                {profile.workPreference.map((pref) => (
                                    <span
                                        key={pref}
                                        className="px-3 py-1 text-xs rounded-full bg-[var(--accent-violet)]/10 text-[var(--accent-violet)] border border-[var(--accent-violet)]/20"
                                    >
                                        {pref}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom spacing */}
                <div className="pb-12 md:pb-16" />
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-[var(--border-color)]">
                <div className="container">
                    <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-sm text-[var(--text-muted)] flex items-center gap-2">
                            © {currentYear} {profile.name}
                            <span className="text-[var(--border-color)]">•</span>
                            <span className="flex items-center gap-1">
                                Built with <Heart size={14} className="text-[var(--accent-violet)] fill-current" />
                            </span>
                        </p>

                        <p className="text-sm text-[var(--text-muted)]">
                            Designed & Developed by {profile.name.split(' ')[0]}
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
}
