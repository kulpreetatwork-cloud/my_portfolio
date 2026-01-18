import { type ClassValue, clsx } from "clsx";

// Simple cn utility for combining class names
export function cn(...inputs: ClassValue[]): string {
    return clsx(inputs);
}

// Format date string
export function formatDate(date: string): string {
    return date;
}

// Create slug from text
export function slugify(text: string): string {
    return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, '');
}
