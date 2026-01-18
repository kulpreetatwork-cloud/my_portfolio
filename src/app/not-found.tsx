import Link from 'next/link';
import { Home, ArrowLeft, Search } from 'lucide-react';
import { FadeIn } from '@/components/animations/FadeIn';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center gradient-mesh">
            <div className="container">
                <FadeIn>
                    <div className="text-center max-w-lg mx-auto">
                        {/* 404 Number */}
                        <div className="relative mb-8">
                            <span className="text-[150px] md:text-[200px] font-bold font-[family-name:var(--font-display)] leading-none gradient-text opacity-20">
                                404
                            </span>
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--accent-violet)] to-[var(--accent-cyan)] flex items-center justify-center">
                                    <Search className="w-12 h-12 text-white" />
                                </div>
                            </div>
                        </div>

                        {/* Message */}
                        <h1 className="text-3xl md:text-4xl font-bold font-[family-name:var(--font-display)] text-[var(--text-primary)]">
                            Page Not Found
                        </h1>
                        <p className="mt-4 text-lg text-[var(--text-secondary)]">
                            Oops! The page you're looking for doesn't exist or has been moved.
                        </p>

                        {/* Actions */}
                        <div className="mt-8 flex flex-wrap justify-center gap-4">
                            <Link href="/" className="btn-primary">
                                <Home size={18} />
                                Go Home
                            </Link>
                            <button
                                onClick={() => window.history.back()}
                                className="btn-secondary"
                            >
                                <ArrowLeft size={18} />
                                Go Back
                            </button>
                        </div>

                        {/* Quick Links */}
                        <div className="mt-12 pt-8 border-t border-[var(--border-color)]">
                            <p className="text-sm text-[var(--text-muted)] mb-4">
                                Here are some helpful links:
                            </p>
                            <div className="flex flex-wrap justify-center gap-4">
                                <Link
                                    href="/projects"
                                    className="text-[var(--accent-violet)] hover:text-[var(--accent-cyan)] transition-colors"
                                >
                                    Projects
                                </Link>
                                <Link
                                    href="/about"
                                    className="text-[var(--accent-violet)] hover:text-[var(--accent-cyan)] transition-colors"
                                >
                                    About
                                </Link>
                                <Link
                                    href="/contact"
                                    className="text-[var(--accent-violet)] hover:text-[var(--accent-cyan)] transition-colors"
                                >
                                    Contact
                                </Link>
                            </div>
                        </div>
                    </div>
                </FadeIn>
            </div>
        </div>
    );
}
