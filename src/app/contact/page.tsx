'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Linkedin, Github, CheckCircle, AlertCircle } from 'lucide-react';
import { profile } from '@/content/profile';
import { FadeIn } from '@/components/animations/FadeIn';

// Web3Forms API endpoint (free, no backend required)
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';

// You need to get your access key from https://web3forms.com/
// For now, we'll use a placeholder - replace with your actual key
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY || '';

export default function ContactPage() {
    const [formState, setFormState] = useState({
        name: '',
        email: '',
        subject: '',
        message: '',
    });
    const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('sending');
        setErrorMessage('');

        // If Web3Forms key is not configured, fall back to mailto
        if (!WEB3FORMS_ACCESS_KEY) {
            try {
                const mailtoLink = `mailto:${profile.email}?subject=${encodeURIComponent(formState.subject)}&body=${encodeURIComponent(
                    `From: ${formState.name} (${formState.email})\n\n${formState.message}`
                )}`;
                window.location.href = mailtoLink;
                setStatus('success');
                setFormState({ name: '', email: '', subject: '', message: '' });
            } catch {
                setStatus('error');
                setErrorMessage('Failed to open email client. Please try again.');
            }
            setTimeout(() => setStatus('idle'), 5000);
            return;
        }

        // Submit to Web3Forms
        try {
            const response = await fetch(WEB3FORMS_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    access_key: WEB3FORMS_ACCESS_KEY,
                    name: formState.name,
                    email: formState.email,
                    subject: `Portfolio Contact: ${formState.subject}`,
                    message: formState.message,
                    from_name: 'Portfolio Contact Form',
                    // Honeypot for spam protection
                    botcheck: '',
                }),
            });

            const result = await response.json();

            if (result.success) {
                setStatus('success');
                setFormState({ name: '', email: '', subject: '', message: '' });
            } else {
                setStatus('error');
                setErrorMessage(result.message || 'Something went wrong. Please try again.');
            }
        } catch (error) {
            setStatus('error');
            setErrorMessage('Network error. Please check your connection and try again.');
        }

        // Reset status after 5 seconds
        setTimeout(() => setStatus('idle'), 5000);
    };

    return (
        <div className="pt-24 pb-16">
            <section className="section">
                <div className="container">
                    {/* Header */}
                    <FadeIn>
                        <div className="text-center mb-12">
                            <h1 className="text-4xl md:text-5xl font-bold font-[family-name:var(--font-display)]">
                                Get in <span className="gradient-text">Touch</span>
                            </h1>
                            <p className="mt-4 text-[var(--text-secondary)] max-w-2xl mx-auto">
                                Have a project in mind or just want to connect? I'd love to hear from you.
                                Let's discuss how we can work together!
                            </p>
                        </div>
                    </FadeIn>

                    <div className="grid lg:grid-cols-5 gap-12">
                        {/* Contact Info */}
                        <FadeIn className="lg:col-span-2">
                            <div className="space-y-8">
                                {/* Contact Details */}
                                <div className="glass-card p-6 space-y-6">
                                    <h2 className="text-xl font-semibold text-[var(--text-primary)]">
                                        Contact Information
                                    </h2>

                                    <a
                                        href={`mailto:${profile.email}`}
                                        className="flex items-start gap-4 group"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-[var(--accent-violet)]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--accent-violet)]/20 transition-colors">
                                            <Mail size={18} className="text-[var(--accent-violet)]" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-[var(--text-muted)]">Email</p>
                                            <p className="text-[var(--text-primary)] group-hover:text-[var(--accent-violet)] transition-colors">
                                                {profile.email}
                                            </p>
                                        </div>
                                    </a>

                                    <a
                                        href={`tel:${profile.phone}`}
                                        className="flex items-start gap-4 group"
                                    >
                                        <div className="w-10 h-10 rounded-xl bg-[var(--accent-cyan)]/10 flex items-center justify-center flex-shrink-0 group-hover:bg-[var(--accent-cyan)]/20 transition-colors">
                                            <Phone size={18} className="text-[var(--accent-cyan)]" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-[var(--text-muted)]">Phone</p>
                                            <p className="text-[var(--text-primary)] group-hover:text-[var(--accent-cyan)] transition-colors">
                                                {profile.phone}
                                            </p>
                                        </div>
                                    </a>

                                    <div className="flex items-start gap-4">
                                        <div className="w-10 h-10 rounded-xl bg-[var(--accent-violet)]/10 flex items-center justify-center flex-shrink-0">
                                            <MapPin size={18} className="text-[var(--accent-violet)]" />
                                        </div>
                                        <div>
                                            <p className="text-sm text-[var(--text-muted)]">Location</p>
                                            <p className="text-[var(--text-primary)]">{profile.location}</p>
                                            <p className="text-sm text-[var(--text-muted)]">{profile.timezone}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="glass-card p-6">
                                    <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-4">
                                        Connect With Me
                                    </h2>
                                    <div className="flex gap-3">
                                        <a
                                            href={profile.socials.linkedin}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--accent-violet)]/10 text-[var(--text-secondary)] hover:text-[var(--accent-violet)] transition-all"
                                        >
                                            <Linkedin size={20} />
                                            <span className="text-sm font-medium">LinkedIn</span>
                                        </a>
                                        <a
                                            href={profile.socials.github}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 p-3 rounded-xl bg-[var(--bg-tertiary)] hover:bg-[var(--accent-cyan)]/10 text-[var(--text-secondary)] hover:text-[var(--accent-cyan)] transition-all"
                                        >
                                            <Github size={20} />
                                            <span className="text-sm font-medium">GitHub</span>
                                        </a>
                                    </div>
                                </div>

                                {/* Availability Badge */}
                                <div className="glass-card p-6 text-center">
                                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400">
                                        <span className="relative flex h-2.5 w-2.5">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                        </span>
                                        {profile.availability}
                                    </div>
                                    <p className="mt-3 text-sm text-[var(--text-muted)]">
                                        Open to opportunities
                                    </p>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Contact Form */}
                        <FadeIn delay={0.1} className="lg:col-span-3">
                            <form onSubmit={handleSubmit} className="glass-card p-6 md:p-8">
                                <h2 className="text-xl font-semibold text-[var(--text-primary)] mb-6">
                                    Send a Message
                                </h2>

                                {/* Honeypot field for spam protection (hidden) */}
                                <input type="checkbox" name="botcheck" className="hidden" style={{ display: 'none' }} />

                                <div className="space-y-6">
                                    <div className="grid md:grid-cols-2 gap-6">
                                        {/* Name */}
                                        <div>
                                            <label htmlFor="name" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                                Your Name *
                                            </label>
                                            <input
                                                type="text"
                                                id="name"
                                                name="name"
                                                required
                                                value={formState.name}
                                                onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-violet)] transition-colors"
                                                placeholder="John Doe"
                                            />
                                        </div>

                                        {/* Email */}
                                        <div>
                                            <label htmlFor="email" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                                Your Email *
                                            </label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                required
                                                value={formState.email}
                                                onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                                                className="w-full px-4 py-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-violet)] transition-colors"
                                                placeholder="john@example.com"
                                            />
                                        </div>
                                    </div>

                                    {/* Subject */}
                                    <div>
                                        <label htmlFor="subject" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                            Subject *
                                        </label>
                                        <input
                                            type="text"
                                            id="subject"
                                            name="subject"
                                            required
                                            value={formState.subject}
                                            onChange={(e) => setFormState({ ...formState, subject: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-violet)] transition-colors"
                                            placeholder="Project Collaboration"
                                        />
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium text-[var(--text-secondary)] mb-2">
                                            Message *
                                        </label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            required
                                            rows={5}
                                            value={formState.message}
                                            onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                                            className="w-full px-4 py-3 rounded-xl bg-[var(--bg-tertiary)] border border-[var(--border-color)] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--accent-violet)] transition-colors resize-none"
                                            placeholder="Tell me about your project or just say hello..."
                                        />
                                    </div>

                                    {/* Status Messages */}
                                    {status === 'success' && (
                                        <div className="flex items-center gap-2 p-4 rounded-xl bg-green-500/10 border border-green-500/20 text-green-400">
                                            <CheckCircle size={20} />
                                            <span>Message sent successfully! I'll get back to you soon.</span>
                                        </div>
                                    )}

                                    {status === 'error' && (
                                        <div className="flex items-center gap-2 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400">
                                            <AlertCircle size={20} />
                                            <span>{errorMessage || 'Something went wrong. Please try again or email directly.'}</span>
                                        </div>
                                    )}

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={status === 'sending'}
                                        className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {status === 'sending' ? (
                                            <>
                                                <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send size={18} />
                                                Send Message
                                            </>
                                        )}
                                    </button>

                                    {/* Note about form service */}
                                    {!WEB3FORMS_ACCESS_KEY && (
                                        <p className="text-xs text-center text-[var(--text-muted)]">
                                            This will open your email client. For direct submissions, configure Web3Forms.
                                        </p>
                                    )}
                                </div>
                            </form>
                        </FadeIn>
                    </div>
                </div>
            </section>
        </div>
    );
}
