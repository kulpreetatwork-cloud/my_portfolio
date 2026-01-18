// Skills data - Edit this file to update your skills
export interface SkillCategory {
    name: string;
    icon?: string;
    skills: string[];
}

export const skills: {
    categories: SkillCategory[];
    highlighted: string[];
} = {
    categories: [
        {
            name: "Languages",
            skills: ["Java", "JavaScript", "TypeScript", "SQL", "HTML5", "CSS3"]
        },
        {
            name: "Frontend",
            skills: ["React", "Next.js", "Tailwind CSS", "Framer Motion", "Responsive Design"]
        },
        {
            name: "Backend",
            skills: ["Node.js", "Express.js", "REST APIs", "Socket.IO", "JWT Authentication"]
        },
        {
            name: "Database",
            skills: ["MongoDB", "MySQL", "PostgreSQL"]
        },
        {
            name: "AI/ML",
            skills: ["Groq API", "LLM Integration", "AI Assistants"]
        },
        {
            name: "DevOps & Tools",
            skills: ["Git", "GitHub", "Vercel", "Render", "AWS", "VS Code", "Postman"]
        },
        {
            name: "Concepts",
            skills: ["OOP", "DSA", "SDLC", "Agile", "System Design"]
        }
    ],
    // Skills to highlight as primary/expert
    highlighted: ["Java", "React", "Node.js", "MongoDB", "SQL", "JavaScript"]
};

// Get all skills as a flat array
export const getAllSkills = () => skills.categories.flatMap(c => c.skills);

// Check if a skill is highlighted
export const isHighlighted = (skill: string) => skills.highlighted.includes(skill);
