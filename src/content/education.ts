// Education & Certifications data
export interface Education {
    institution: string;
    degree: string;
    field?: string;
    location: string;
    period: string;
    grade: string;
    current?: boolean;
}

export interface Certification {
    name: string;
    issuer: string;
    date?: string;
    link?: string;
    credentialId?: string;
}

export const education: Education[] = [
    {
        institution: "G.L Bajaj Institute of Technology & Management",
        degree: "B.Tech",
        field: "Computer Science & Engineering (AI)",
        location: "Greater Noida, UP",
        period: "Nov 2022 - July 2026 (Expected)",
        grade: "CGPA: 7.64/10",
        current: true
    },
    {
        institution: "Regency Public School",
        degree: "Class XIIth",
        location: "Sitapur, UP",
        period: "June 2020 - July 2021",
        grade: "Percentage: 88%"
    }
];

export const certifications: Certification[] = [
    {
        name: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
        issuer: "Oracle",
        link: "https://drive.google.com/file/d/1Vki89FtbqCiA_7I5WK3fAAjKOj2wRYjG/view?usp=sharing"
    },
    {
        name: "Data Science Master — Virtual Internship",
        issuer: "Virtual Internship Program",
        link: "https://drive.google.com/file/d/1jE7sg5IYXhbQgdoAA9PjM1voCxw2wcUq/view?usp=drive_link"
    },
    {
        name: "Android Developer — Virtual Internship",
        issuer: "Virtual Internship Program",
        link: "https://drive.google.com/file/d/17gxvIyuztbjm_vyS-F7_UhQDGAsS5kvp/view?usp=drive_link"
    },
    {
        name: "RPA Developer — Virtual Internship",
        issuer: "Virtual Internship Program",
        link: "https://drive.google.com/file/d/1N6_LQo8WDD5ugE6wWvgBvzKSJisLr1iv/view?usp=sharing"
    }
];
