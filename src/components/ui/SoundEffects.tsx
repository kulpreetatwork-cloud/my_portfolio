'use client';

import { createContext, useContext, useState, useCallback, ReactNode } from 'react';

// Sound effects context
interface SoundContextType {
    soundEnabled: boolean;
    toggleSound: () => void;
    playClick: () => void;
    playHover: () => void;
    playSuccess: () => void;
    playError: () => void;
    playWhoosh: () => void;
}

const SoundContext = createContext<SoundContextType | undefined>(undefined);

// Audio generator using Web Audio API (no external files needed)
function createOscillatorSound(
    frequency: number,
    duration: number,
    type: OscillatorType = 'sine',
    volume: number = 0.1
): () => void {
    return () => {
        try {
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.frequency.value = frequency;
            oscillator.type = type;

            gainNode.gain.setValueAtTime(volume, audioContext.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration);

            oscillator.start(audioContext.currentTime);
            oscillator.stop(audioContext.currentTime + duration);
        } catch (e) {
            // Audio not supported, fail silently
        }
    };
}

// Pre-defined sounds
const sounds = {
    click: createOscillatorSound(800, 0.05, 'sine', 0.08),
    hover: createOscillatorSound(600, 0.03, 'sine', 0.03),
    success: () => {
        createOscillatorSound(523.25, 0.1, 'sine', 0.08)(); // C5
        setTimeout(() => createOscillatorSound(659.25, 0.1, 'sine', 0.08)(), 100); // E5
        setTimeout(() => createOscillatorSound(783.99, 0.15, 'sine', 0.08)(), 200); // G5
    },
    error: () => {
        createOscillatorSound(200, 0.15, 'square', 0.05)();
        setTimeout(() => createOscillatorSound(150, 0.2, 'square', 0.05)(), 150);
    },
    whoosh: () => {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(400, audioContext.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(100, audioContext.currentTime + 0.2);

        gainNode.gain.setValueAtTime(0.05, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.2);
    },
};

export function SoundProvider({ children }: { children: ReactNode }) {
    const [soundEnabled, setSoundEnabled] = useState(false);

    const toggleSound = useCallback(() => {
        setSoundEnabled(prev => !prev);
    }, []);

    const playClick = useCallback(() => {
        if (soundEnabled) sounds.click();
    }, [soundEnabled]);

    const playHover = useCallback(() => {
        if (soundEnabled) sounds.hover();
    }, [soundEnabled]);

    const playSuccess = useCallback(() => {
        if (soundEnabled) sounds.success();
    }, [soundEnabled]);

    const playError = useCallback(() => {
        if (soundEnabled) sounds.error();
    }, [soundEnabled]);

    const playWhoosh = useCallback(() => {
        if (soundEnabled) sounds.whoosh();
    }, [soundEnabled]);

    return (
        <SoundContext.Provider value={{
            soundEnabled,
            toggleSound,
            playClick,
            playHover,
            playSuccess,
            playError,
            playWhoosh,
        }}>
            {children}
        </SoundContext.Provider>
    );
}

export function useSound() {
    const context = useContext(SoundContext);
    if (!context) {
        // Return no-op functions if provider not found
        return {
            soundEnabled: false,
            toggleSound: () => { },
            playClick: () => { },
            playHover: () => { },
            playSuccess: () => { },
            playError: () => { },
            playWhoosh: () => { },
        };
    }
    return context;
}

// Sound toggle button component
export function SoundToggle() {
    const { soundEnabled, toggleSound, playClick } = useSound();

    const handleClick = () => {
        playClick();
        toggleSound();
    };

    return (
        <button
            onClick={handleClick}
            className="p-2 rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-tertiary)] transition-all"
            aria-label={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
            title={soundEnabled ? 'Mute sounds' : 'Enable sounds'}
        >
            {soundEnabled ? (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
                    <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
                </svg>
            ) : (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M11 5L6 9H2v6h4l5 4V5z" />
                    <line x1="23" y1="9" x2="17" y2="15" />
                    <line x1="17" y1="9" x2="23" y2="15" />
                </svg>
            )}
        </button>
    );
}
