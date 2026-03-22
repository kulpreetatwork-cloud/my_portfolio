// Projects data - Edit this file to add/update projects
export interface Project {
    slug: string;
    name: string;
    summary: string;
    description: string;
    role: "Solo Developer" | "Team Lead" | "Team Member";
    featured: boolean;
    tags: string[];
    tech: string[];
    highlights: string[];
    challenges?: string[];
    links: {
        live?: string;
        github?: string;
    };
    date: string;
    // Optional: Add screenshots when available
    images?: {
        thumbnail?: string;
        desktop?: string;
        mobile?: string;
    };
}

export const projects: Project[] = [
    {
        slug: "wealthwise",
        name: "WealthWise",
        summary: "AI-Powered Personal Finance Platform",
        description: `A comprehensive full-stack personal finance platform that helps users take control of their financial life. Built with the MERN stack and integrated with Groq's LLM API, WealthWise provides intelligent insights and real-time financial management capabilities.

The platform features 8+ modules covering transactions, budgets, goals, bills, and investments — all with complete CRUD functionality. The AI financial assistant analyzes spending patterns and provides personalized recommendations to help users make better financial decisions.`,
        role: "Solo Developer",
        featured: true,
        tags: ["AI", "Full-Stack", "Finance", "MERN"],
        tech: ["React", "Node.js", "Express", "MongoDB", "Groq API", "Socket.io", "Recharts", "Framer Motion", "JWT", "Vercel", "Render"],
        highlights: [
            "Developed 8+ modules with complete CRUD functionality for comprehensive financial management",
            "Integrated Groq LLM API for AI-powered financial insights and personalized recommendations",
            "Implemented secure JWT authentication with refresh tokens and role-based access control",
            "Built real-time notification system using Socket.io for budget alerts and bill reminders",
            "Created interactive data visualizations with Recharts for spending analysis",
            "Deployed to production with CI/CD pipeline on Vercel and Render"
        ],
        challenges: [
            "Designed efficient MongoDB schemas to handle complex financial relationships",
            "Implemented rate limiting and input validation for enhanced security",
            "Built responsive dark-themed UI with smooth Framer Motion animations"
        ],
        links: {
            live: "https://wealthwise-topaz.vercel.app/",
            github: "https://github.com/kulpreetatwork-cloud/wealthwise"
        },
        date: "2024",
        images: {
            thumbnail: "/assets/Wealthwise.png",
            desktop: "/assets/Wealthwise.png"
        }
    },
    {
        slug: "chatpulse",
        name: "ChatPulse",
        summary: "Real-Time Chat Application",
        description: `A modern, real-time chat application built for seamless communication. ChatPulse leverages Socket.IO for instant messaging and supports rich features like media sharing, online status tracking, and cross-device synchronization.

The application focuses on providing an engaging user experience with features like unseen message tracking, search functionality, and real-time presence indicators. The backend is designed for reliability with message persistence in MongoDB and efficient data handling.`,
        role: "Solo Developer",
        featured: true,
        tags: ["Real-Time", "Full-Stack", "Chat", "MERN"],
        tech: ["React", "Node.js", "Express", "MongoDB", "Socket.IO", "Cloudinary", "JWT"],
        highlights: [
            "Built responsive, interactive chat interface with real-time messaging via Socket.IO",
            "Implemented user authentication, profile management, and online/offline status tracking",
            "Developed image upload functionality with Cloudinary integration",
            "Created message notifications and unseen message tracking for better engagement",
            "Enabled multi-device usage with synchronized chat sessions",
            "Designed efficient backend for message persistence and real-time updates"
        ],
        challenges: [
            "Optimized Socket.IO connections for reliable real-time communication",
            "Implemented efficient MongoDB queries for message history retrieval",
            "Built responsive UI that works seamlessly across devices"
        ],
        links: {
            live: "https://chat-pulse-seven.vercel.app/",
            github: "https://github.com/kulpreetatwork-cloud/ChatPulse"
        },
        date: "2024",
        images: {
            thumbnail: "/assets/Chatpulse.png",
            desktop: "/assets/Chatpulse.png"
        }
    },
    {
        slug: "prepwise",
        name: "PrepWise",
        summary: "AI-Powered Mock Interview Platform",
        description: `A real-time AI voice-powered mock interview platform designed for college students and freshers who want personalized interview preparation to land their dream job. PrepWise features a Zoom-like AI interviewer that speaks, listens, and adapts in real-time, delivering detailed post-interview feedback with actionable insights.

The platform offers 10+ target roles, multiple interview types (Technical, Behavioral, HR, System Design), customizable difficulty levels, and duration options. It includes a community forum with upvote/downvote system, a leaderboard with rankings, a GitHub-style contribution heatmap, advanced analytics, and reusable interview templates — all wrapped in a dark-first UI with glassmorphism design.`,
        role: "Team Member",
        featured: true,
        tags: ["AI", "Full-Stack", "Real-Time", "MERN"],
        tech: ["React", "Node.js", "Express", "MongoDB", "Groq API", "Socket.IO", "Tailwind CSS", "Framer Motion", "Zustand", "Recharts", "JWT", "Passport.js", "Vite", "Vercel", "Render"],
        highlights: [
            "Built real-time AI voice interview system powered by Groq LLM with browser-native Speech Recognition and Synthesis",
            "Implemented comprehensive interview customization with 10+ roles, multiple types, difficulty levels, and duration options",
            "Developed detailed AI feedback with scoring, category breakdowns, radar/bar chart visualizations, and PDF report generation",
            "Created community forum with posts, threaded comments, upvote/downvote system, and category filtering",
            "Built leaderboard with rankings by Top Scores, Most Interviews, Longest Streaks, and Most Improved",
            "Implemented GitHub-style contribution heatmap and advanced analytics with performance breakdowns"
        ],
        challenges: [
            "Integrated real-time Socket.IO communication for seamless AI voice interview flow",
            "Designed dynamic Groq prompt generation that adapts based on user customizations and responses",
            "Built responsive dark-first UI with glassmorphism design and lazy-loaded routes for performance"
        ],
        links: {
            live: "https://prepwise-blue.vercel.app",
            github: "https://github.com/kulpreetatwork-cloud/prepwise"
        },
        date: "2025",
        images: {
            thumbnail: "/assets/Prepwise.png",
            desktop: "/assets/Prepwise.png"
        }
    }
];

// Helper function to get featured projects
export const getFeaturedProjects = () => projects.filter(p => p.featured);

// Helper function to get project by slug
export const getProjectBySlug = (slug: string) => projects.find(p => p.slug === slug);

// Get all unique tags
export const getAllTags = () => [...new Set(projects.flatMap(p => p.tags))];
