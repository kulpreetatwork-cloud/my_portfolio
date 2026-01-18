<div align="center">

# ✨ Kulpreet Singh | Portfolio

A **premium, industry-grade** portfolio website showcasing my projects, skills, and experience as a Full-Stack Developer.

[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-my--portfolio-7c3aed?style=for-the-badge)](https://my-portfolio-ten-lime-60.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

<img src="./public/og-image.png" alt="Portfolio Preview" width="600" />

</div>

---

## 🌟 Live Demo

**🔗 [https://my-portfolio-ten-lime-60.vercel.app/](https://my-portfolio-ten-lime-60.vercel.app/)**

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎨 Premium Design
- **Neo-Gradient** design system
- Dark/Light theme with smooth transitions
- Glassmorphism cards with backdrop blur
- Custom animated cursor (desktop)
- Floating particles background

</td>
<td width="50%">

### 🚀 Advanced Animations
- 3D tilt effects on hover
- Page transition animations
- Scroll progress indicator
- Text reveal & typewriter effects
- Branded loading screen

</td>
</tr>
<tr>
<td width="50%">

### 📱 Responsive & Accessible
- Mobile-first responsive design
- ARIA labels & semantic HTML
- Reduced motion support
- Keyboard navigation

</td>
<td width="50%">

### 🎮 Fun Easter Eggs
- Konami code celebration 🎮
- Type "hire" for a secret message 💼
- Console welcome messages
- Sound effects (opt-in)

</td>
</tr>
</table>

---

## 🛠️ Tech Stack

| Category | Technologies |
|----------|--------------|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript |
| **Styling** | Tailwind CSS 4 |
| **Animations** | Framer Motion |
| **Icons** | Lucide React |
| **Forms** | Web3Forms (free, no backend) |
| **Deployment** | Vercel |

---

## 🚀 Quick Start

```bash
# Clone the repository
git clone https://github.com/kulpreetatwork-cloud/my_portfolio.git

# Navigate to project directory
cd my_portfolio

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

---

## 📁 Project Structure

```
portfolio-site/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── about/              # About page with stats
│   │   ├── projects/           # Projects listing & detail
│   │   ├── contact/            # Contact form
│   │   ├── resume/             # Interactive resume
│   │   └── layout.tsx          # Root layout with SEO
│   ├── components/
│   │   ├── animations/         # Page transitions, text reveals
│   │   ├── layout/             # Navbar, Footer
│   │   ├── sections/           # Hero, Skills, CTA
│   │   └── ui/                 # Cards, buttons, effects
│   ├── content/                # ⭐ Edit these to update content
│   │   ├── profile.ts          # Personal info & bio
│   │   ├── projects.ts         # Project details
│   │   ├── skills.ts           # Technical skills
│   │   └── education.ts        # Education & certifications
│   └── lib/                    # Utilities
└── public/
    ├── assets/                 # Images, resume PDF
    └── og-image.png            # Social preview image
```

---

## ✏️ Customization

### Update Personal Info
Edit `src/content/profile.ts`:
```typescript
export const profile = {
  name: "Your Name",
  title: "Your Title",
  tagline: "Your tagline",
  email: "your@email.com",
  // ...
}
```

### Add Projects
Edit `src/content/projects.ts`:
```typescript
{
  slug: "project-name",
  name: "Project Name",
  summary: "One-line summary",
  featured: true,
  tech: ["React", "Node.js"],
  // ...
}
```

### Replace Assets
- **Profile Photo**: `public/assets/My_pic.jpg`
- **Resume PDF**: `public/assets/Kulpreet_Singh_Resume_Updated.pdf`
- **OG Image**: `public/og-image.png`

---

## 📧 Contact Form Setup

Uses [Web3Forms](https://web3forms.com/) (free, no backend needed):

1. Go to [web3forms.com](https://web3forms.com/)
2. Create a free access key with your email
3. Add to `.env.local`:
   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=your_access_key
   ```

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)
```bash
npm i -g vercel
vercel
```

Or connect your GitHub repo directly at [vercel.com](https://vercel.com)

---

## 📊 Performance

| Metric | Score |
|--------|-------|
| Performance | 90+ |
| Accessibility | 95+ |
| SEO | 95+ |
| Best Practices | 90+ |

---

## 📄 License

MIT License - Feel free to use and customize for your own portfolio!

---

<div align="center">

**Built with ❤️ by Kulpreet Singh**

[![GitHub](https://img.shields.io/badge/GitHub-kulpreetatwork--cloud-181717?style=flat-square&logo=github)](https://github.com/kulpreetatwork-cloud)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Kulpreet_Singh-0A66C2?style=flat-square&logo=linkedin)](https://linkedin.com/in/kulpreet-singh26)

</div>
