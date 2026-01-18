'use client';

import { ReactNode } from 'react';
import { ScrollProgress } from '@/components/ui/ScrollProgress';
import { CustomCursor } from '@/components/ui/CustomCursor';
import { FloatingParticles } from '@/components/ui/AnimatedBackground';
import { LoadingScreen } from '@/components/ui/LoadingScreen';
import { SoundProvider } from '@/components/ui/SoundEffects';
import { EasterEggs } from '@/components/ui/EasterEggs';
import { BackToTop } from '@/components/ui/BackToTop';

interface ClientProvidersProps {
    children: ReactNode;
}

export function ClientProviders({ children }: ClientProvidersProps) {
    return (
        <SoundProvider>
            {/* Loading screen (first visit only) */}
            <LoadingScreen minDuration={2000} />

            {/* Easter eggs (Konami code, secret word, etc.) */}
            <EasterEggs />

            {/* Scroll progress bar at top */}
            <ScrollProgress />

            {/* Custom cursor (desktop only) */}
            <CustomCursor />

            {/* Floating particles background */}
            <FloatingParticles count={15} />

            {/* Back to top button */}
            <BackToTop />

            {/* Main content */}
            {children}
        </SoundProvider>
    );
}
