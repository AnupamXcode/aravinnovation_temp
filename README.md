# Arav Innovations — Global Technology, Engineering & Strategy Platform

Arav Innovations is a multidisciplinary technology, IT strategy, full-stack software development, performance digital marketing, data compliance (DPDP/SOC-2), and staff augmentation platform engineered for enterprise scalability.

---

## 🌐 Live Deployment Links

- **Main Website (Public)**: [https://aravinnovation-temp.vercel.app/](https://aravinnovation-temp.vercel.app/)
- **Admin Control Center**: [https://aravinnovation-temp.vercel.app/admin](https://aravinnovation-temp.vercel.app/admin)

*(Note: Admin Panel requires authentication for administrative management access).*

---

## ✨ Key Features & Architecture

### 1. 🌍 Multilingual System & Arabic RTL Support
- Native multi-language support across **English (EN)**, **Hindi (HI)**, **Arabic (AR)**, **French (FR)**, and **Spanish (ES)**.
- Full **Arabic RTL (Right-to-Left)** layout flipping (`dir="rtl"`), reversing flex/grid alignment, text alignment, and directional icons.
- Centralized **Language & Translation CMS** in `/admin` to toggle active languages and manage localized dictionaries.

### 2. 🎛️ Complete Website CMS Admin Control Center
- Persistent Left Navigation Sidebar grouped into:
  - **WEBSITE PAGES**: Hero, 7 Core Practices, Industry Solutions, Case Studies, Methodology, Testimonials, Footer & Regional Details.
  - **DIGITAL PRESENCE & SOCIAL**: Dynamic Social Media Manager (Instagram, Facebook, LinkedIn, WhatsApp, X, YouTube, Clutch).
  - **COMMUNICATION**: Chatbot Knowledge Base & Contact Inquiries.
  - **LOCALIZATION & SEO**: Languages & RTL, Global Metadata.
  - **SYSTEM & ANIMATIONS**: Master motion switches, scroll reveal controls, hover feedback controls, and per-service maintenance toggles.
- **Quick Actions Shortcuts** & **Global Admin Search**.

### 3. 🤖 Arav Assistant Niche-Aware Multi-Step Chatbot
- Multi-step conversational context retention (retains service context across follow-up queries like *"What kind?"* or *"Tell me more"*).
- Combination intent recognition (e.g. *"SEO for E-Commerce"*, *"Web Development for SaaS"*).
- Direct call-to-action buttons (`[ Explore Service ]`, `[ View Case Studies ]`, `[ Contact Us ]`).
- Dynamic Knowledge Base management directly from `/admin`.

### 4. ⚡ Global Animation & Hover Interaction System
- **Page Entrance Sequences**: Smooth, fast fade and slide entrance for top-level pages.
- **Scroll Reveals**: Intersection Observer (`ScrollReveal`) for section headings, cards, images, and footer elements.
- **Universal Hover Interactions**: Left-to-right animated link underlines, button lift with arrow shifts (`→ -> →→`), card elevation, and social icon scaling.
- Full `prefers-reduced-motion` accessibility support.

### 5. 🏢 7 Core Practice Lines
1. **IT Strategy & Consulting** — Legacy modernization, cloud migration, technology roadmaps.
2. **Web & App Development** — Subsecond Next.js web applications, SaaS platforms, native mobile apps.
3. **Digital Marketing (B2B)** — High-intent LinkedIn & Google Search demand generation, closed-loop attribution.
4. **Search Engine Optimization (SEO)** — Technical audits, Core Web Vitals optimization, organic growth.
5. **Risk Governance & Compliance** — India DPDP Act 2023 readiness, SOC-2, GDPR, security posture.
6. **Audit & Improvement** — Code reviews, cloud cost waste reduction (FinOps), efficiency tuning.
7. **Training & Staff Augmentation** — Vetted senior engineering pods & talent scaling.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript
- **Internationalization**: `next-intl`
- **Animations**: `framer-motion` & `lucide-react`
- **Styling**: Tailwind CSS v4 & Vanilla CSS Design System
- **State Management**: React Context (`SiteContentProvider`, `SiteConfigProvider`)
- **Deployment**: Vercel Platform

---

## 🚀 Getting Started

### Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/AnupamXcode/aravinnovation_temp.git
   cd aravinnovation_temp
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run development server**:
   ```bash
   npm run dev
   ```

4. Open `http://localhost:3000` in your browser.

### Production Build Verification

```bash
npm run build
```

---

## 📄 License & Rights

© 2026 Arav Innovations. All rights reserved.
