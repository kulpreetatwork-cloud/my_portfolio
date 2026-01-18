# Kulpreet Singh - Portfolio Website

A premium, industry-grade portfolio website built with Next.js 14, TypeScript, and Tailwind CSS featuring the Neo-Gradient design system.

![Portfolio Preview](./portfolio-preview.png)

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit [http://localhost:3000](http://localhost:3000)

## 🎨 Design System

**Neo-Gradient** theme featuring:
- Deep navy backgrounds (#0a0a0f)
- Electric violet (#7c3aed) & cyan (#06b6d4) accents
- Glassmorphism cards with backdrop blur
- Smooth Framer Motion animations
- Dark/Light theme toggle with persistence

## 📁 Project Structure

```
portfolio-site/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/              # About page
│   │   ├── projects/           # Projects listing & detail
│   │   ├── contact/            # Contact form
│   │   ├── resume/             # Resume viewer
│   │   ├── layout.tsx          # Root layout with SEO
│   │   └── page.tsx            # Home page
│   ├── components/
│   │   ├── layout/             # Navbar, Footer
│   │   ├── sections/           # Hero, FeaturedProjects, Skills, CTA
│   │   ├── ui/                 # ProjectCard, etc.
│   │   └── animations/         # Framer Motion components
│   ├── content/                # ⭐ EDIT THESE TO UPDATE CONTENT
│   │   ├── profile.ts          # Personal info, bio, socials
│   │   ├── projects.ts         # Project details
│   │   ├── skills.ts           # Skills by category
│   │   └── education.ts        # Education & certifications
│   └── lib/                    # Utilities
├── public/assets/              # Images, resume PDF
└── README.md
```

## ✏️ Content Editing Guide

### Update Personal Information
Edit `src/content/profile.ts`:
```typescript
export const profile = {
  name: "Your Name",
  title: "Your Title",
  tagline: "Your tagline",
  email: "your@email.com",
  // ... more fields
}
```

### Add a New Project
Edit `src/content/projects.ts`:
```typescript
export const projects: Project[] = [
  {
    slug: "project-slug",           // URL-friendly name
    name: "Project Name",
    summary: "One-line summary",
    description: "Full description...",
    role: "Solo Developer",         // or "Team Lead", "Team Member"
    featured: true,                 // Show on home page
    tags: ["AI", "Full-Stack"],
    tech: ["React", "Node.js"],
    highlights: [
      "Key achievement 1",
      "Key achievement 2"
    ],
    links: {
      live: "https://your-demo.com",
      github: "https://github.com/you/repo"
    },
    date: "2024"
  },
  // ... more projects
]
```

### Update Skills
Edit `src/content/skills.ts`:
```typescript
export const skills = {
  categories: [
    { name: "Frontend", skills: ["React", "Next.js", "Tailwind"] },
    // ... more categories
  ],
  highlighted: ["React", "Node.js"]  // Primary skills to emphasize
}
```

### Replace Assets
1. **Profile Photo**: Replace `public/assets/My_pic.jpg`
2. **Resume PDF**: Replace `public/assets/Kulpreet_Singh_Resume_Updated.pdf`
3. Update the file path in `src/content/profile.ts` if filename changes

## 🌐 Deployment

### Deploy to Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

### Deploy to Netlify
```bash
npm run build
# Deploy the `.next` folder or use Netlify CLI
```

### Environment Variables
Copy `.env.example` to `.env.local` and configure:

```bash
cp .env.example .env.local
```

| Variable | Required | Description |
|----------|----------|-------------|
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Optional | Web3Forms access key for contact form |

## 📧 Contact Form Setup

The contact form uses [Web3Forms](https://web3forms.com/) (free, no backend required):

1. Go to [web3forms.com](https://web3forms.com/)
2. Enter your email address and click "Create Access Key"
3. Check your email for the access key
4. Create `.env.local` and add:
   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key_here
   ```
5. Restart the dev server

**Without Web3Forms**: The form falls back to opening the user's email client with a pre-filled message.

## 🔍 SEO Checklist

- ✅ Dynamic meta titles per page
- ✅ OpenGraph & Twitter cards
- ✅ Structured data (JSON-LD Person schema)
- ✅ Semantic HTML5 elements
- ✅ Accessible with ARIA labels
- ✅ Skip-to-content link
- ✅ Reduced motion support

## 📊 Lighthouse Targets

| Metric | Target |
|--------|--------|
| Performance | 90+ |
| Accessibility | 95+ |
| SEO | 95+ |
| Best Practices | 90+ |

## 🎯 Features

- **Responsive Design**: Works on all devices (360px to 4K)
- **Dark/Light Theme**: Toggle with localStorage persistence
- **Project Filtering**: Search and filter by tags
- **Smooth Animations**: Framer Motion with reduced-motion support
- **Contact Form**: Web3Forms integration (free) with email fallback
- **PDF Resume Viewer**: Embedded viewer with download option

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| Next.js 14 | React framework with App Router |
| TypeScript | Type safety |
| Tailwind CSS 4 | Styling |
| Framer Motion | Animations |
| Lucide React | Icons |

## 📄 License

MIT License - Feel free to use and customize for your own portfolio!

---

Built with ❤️ by Kulpreet Singh
