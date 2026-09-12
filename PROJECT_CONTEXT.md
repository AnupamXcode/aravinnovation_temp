# ARAV INNOVATIONS — MASTER PROJECT CONTEXT & AI GUIDELINES
> **SINGLE SOURCE OF TRUTH FOR ALL FUTURE DEVELOPMENT AND OPTIMIZATION WORK**

---

## 1. EXECUTIVE SUMMARY & BUSINESS CONTEXT

### What Arav Innovations Is
**Arav Innovations** is a multidisciplinary B2B enterprise technology consulting, full-stack software engineering, digital growth, risk & governance (GRC), technical SEO, and staff augmentation firm. 
- **Global Operations**: Operating primarily across **India (HQ: Gurgaon, NCR)** and **UAE (Dubai, Silicon Oasis)**.
- **Positioning**: Premium enterprise technology advisory & engineering partner for mid-market and enterprise organizations.
- **Brand Perception**: Authoritative, trustworthy, modern, outcome-focused, and financially disciplined (CFO/CIO aligned).
- **Explicit Anti-Patterns**: Arav Innovations must **NOT** be represented as a cheap software house, a generic marketing agency, an over-engineered portfolio, an AI-hype wrapper, or a gaming/cyberpunk agency.

---

## 2. BRAND SYSTEM & DESIGN RULES (LOCKED 🔒)

### 6-Color Palette ONLY
All visual elements, backgrounds, texts, borders, badges, and state changes MUST strictly adhere to the approved 6-color system:

| Role | Color Name | Hex Code | Usage |
| :--- | :--- | :--- | :--- |
| **Primary Brand** | Executive Orange | `#f15e1c` | Primary CTAs, key highlights, active states, brand badges |
| **Secondary Accent** | Growth Green | `#2e936f` | Success metrics, outcomes, green accents, secondary CTAs |
| **Base Background** | Pure White / Clean Canvas | `#ffffff` | Light mode card backgrounds, primary container bases |
| **Highlight** | Soft Yellow | `#ffec69` | Subtle highlights, active badges, tag accents |
| **Accent Gold** | Prestige Gold | `#fab60a` | Ratings, stars, premium feature badges, accent borders |
| **Background Tint** | Peach Tint | `#f7d7b0` | Borders, subtle card dividers, light background fills |

> [!CAUTION]
> **COLOR PALETTE ENFORCEMENT**
> DO NOT introduce external colors (cyan, magenta, neon blue, purple, dark gray, or unapproved gradients). All dark mode elements utilize pure AMOLED black (`#000000` / `#050505` / `#080808`) paired strictly with the 6 brand tokens.

---

## 3. CORE ARCHITECTURE & STACK

- **Framework**: Next.js 16 (App Router with Turbopack)
- **Language**: TypeScript (Strict Mode)
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss"`)
- **Animation System**: Framer Motion + GSAP (throttled RAF for cursor proximity)
- **Internationalization (i18n)**: `next-intl` with locale routing (`/en`, `/hi`, `/ar`)
- **Font System**: Google Fonts (`Plus_Jakarta_Sans` for Display, `Inter` for Sans Body, `Noto_Sans_Arabic`, `Noto_Sans_Devanagari`) with `display: 'swap'`
- **SEO & Schema**: JSON-LD Organization & Service schemas (`components/seo/StructuredData.tsx`)

---

## 4. ALL 8 CORE SERVICES (OFFICIALLY IMPLEMENTED)

The repository officially implements **8 distinct core services** across `data/services.ts`, `components/services/InteractiveServiceStack3D.tsx`, and `lib/site-content.tsx`:

1. **IT Strategy & Implementation** (`/services/it-strategy-implementation`)
   - *Eyebrow*: ENTERPRISE IT STRATEGY & MODERNIZATION
   - *Focus*: Legacy system modernization, cloud roadmaps, architecture health checks.
2. **Digital Marketing & Brand Development** (`/services/digital-marketing-brand-development`)
   - *Eyebrow*: B2B DIGITAL MARKETING & BRAND AUTHORITY
   - *Focus*: High-intent customer pipelines, omnichannel brand authority, performance marketing.
3. **Web & Application Development** (`/services/web-app-development` & `/services/web-application-development`)
   - *Eyebrow*: ENTERPRISE WEB & APP ENGINEERING
   - *Focus*: Sub-second Next.js web platforms, SaaS portals, mobile apps, microservices.
4. **Risk, Compliance & Governance** (`/services/risk-compliance-governance`)
   - *Eyebrow*: ENTERPRISE RISK, COMPLIANCE & GRC
   - *Focus*: DPDP India compliance, ISO/SOC2 security readiness, data protection governance.
5. **Audit & Improvement** (`/services/audit-improvement`)
   - *Eyebrow*: ARCHITECTURE & PERFORMANCE AUDITS
   - *Focus*: System health checks, performance benchmarks, modernization roadmaps.
6. **Training & Staff Augmentation** (`/services/training-staff-augmentation`)
   - *Eyebrow*: ON-DEMAND TECH TALENT & STAFFING
   - *Focus*: Dedicated engineering teams, rapid talent scaling, team upskilling.
7. **SEO Services** (`/services/seo-services`)
   - *Eyebrow*: TECHNICAL SEO & GENERATIVE DISCOVERY (AEO)
   - *Focus*: Entity citations, topical authority hubs, AI search optimization.
8. **AI Portfolio** (`/services/ai-portfolio`)
   - *Eyebrow*: ENTERPRISE AI & AUTOMATION SOLUTIONS
   - *Focus*: Custom LLM integrations, operational workflow automation, intelligent bots.

---

## 5. HOMEPAGE ARCHITECTURE & SECTION ORDER

The homepage (`app/[locale]/page.tsx`) follows a strict narrative arc:

1. **Hero Section** (`components/hero/Hero.tsx` & `components/hero/HeroVideoBackground.tsx`):
   - Background Video: `/videos/Create_a_premium_minimalist_ci.mp4` (HTML5 autoplay, muted, loop, playsInline).
   - Headline: *"Technology That Moves Business Forward."*
   - Copy: CEO-approved blueprint text.
2. **3D Interactive Service Stack** (`components/services/InteractiveServiceStack3D.tsx`):
   - Desktop interactive carousel + Mobile stacked cards for all 8 services.
3. **Target Audience / Who We Help** (`components/home/WhoWeHelpSection.tsx`):
   - Buyer personas (Growing Enterprises, Mid-Market Leaders, Digital Innovators).
4. **Enterprise Technology Practices** (`components/home/EnterprisePracticesSection.tsx`):
   - Grid layout highlighting core practice outcomes.
5. **Executive Endorsements & Proof** (`components/home/ExecutiveEndorsementsSection.tsx`):
   - Metrics, verified client quotes, executive endorsements.
6. **Latest Insights & Knowledge** (`components/home/LatestInsightsSection.tsx`):
   - Featured blog cards connected to internationalized content.
7. **Global Footer & Contact** (`components/layout/Footer.tsx`):
   - Minimalist static footer with India and UAE office addresses.

---

## 6. CRITICAL "DO NOT TOUCH" & NON-NEGOTIABLE LIST 🔒

Future AI coding agents must **NEVER** modify or remove the following without explicit user instructions:

- ❌ **HOMEPAGE BACKGROUND VIDEO**: The video `/videos/Create_a_premium_minimalist_ci.mp4` **MUST NEVER** be removed, hidden on mobile, replaced with a static poster image, or disabled to boost PageSpeed scores. Optimize *around* it, never by removing it.
- ❌ **CORE 8 SERVICES**: Never remove or hide any of the 8 services (`it-strategy-implementation`, `digital-marketing-brand-development`, `web-app-development`, `risk-compliance-governance`, `audit-improvement`, `training-staff-augmentation`, `seo-services`, `ai-portfolio`).
- ❌ **DESKTOP LAYOUT**: Mobile performance fixes must **NEVER** alter desktop CSS, layout, spacing, or hero presentation.
- ❌ **BRAND COLOR SYSTEM**: Do not add new colors outside the 6-color system (`#f15e1c`, `#2e936f`, `#ffffff`, `#ffec69`, `#fab60a`, `#f7d7b0`).
- ❌ **MULTILINGUAL SUPPORT**: Do not remove EN, HI, or AR language support or `next-intl` configuration.
- ❌ **AI CHATBOT**: Do not remove or disable `ClientChatbot.tsx`.
- ❌ **GLOBAL FOOTER CONTENT**: Keep India (Gurgaon) and UAE (Dubai) office details intact.

---

## 7. KNOWN ISSUES & HISTORIC SOLUTIONS

### Issue 1: Mobile Footer Stability & Scroll Flicker
- **Status**: **RESOLVED**
- **Root Cause**: Scroll-driven Framer Motion `whileInView` opacity transitions combined with viewport height locks (`100vh`) caused mobile browsers to flicker and drop rendering frames.
- **Solution / Intended Behavior**: The mobile footer (`components/layout/Footer.tsx`) is rendered as a 100% static HTML `<footer>` element in normal document flow. **No scroll-jacking, no fixed positioning, no 100vh height locks**.

### Issue 2: Service Card Image Sizes Payload
- **Status**: **RESOLVED**
- **Root Cause**: `sizes="(max-width: 1024px) 100vw, 50vw"` was forcing mobile browsers (320px–430px) to download 750px+ DPR images.
- **Solution**: Set `sizes="(max-width: 640px) 360px, (max-width: 1024px) 600px, 700px"` in [`InteractiveServiceStack3D.tsx`](file:///d:/Projects/AravInnovation/components/services/InteractiveServiceStack3D.tsx).

---

## 8. PERFORMANCE TARGETS & SAFETY PROTOCOL

### Current Mobile Baseline
- **Performance Score**: 76 – 85+ (Stretch goal 90+)
- **FCP**: ~1.4s
- **LCP**: ~1.4s – 2.5s (Reduced from 5.3s)
- **TBT**: ~130ms – 170ms
- **CLS**: 0 (Zero layout shifts)
- **Accessibility**: 97 – 100
- **Best Practices**: 100
- **SEO**: 100
- **Agentic Browsing**: 3/3

### Performance Safety Rule
Performance optimizations must be **SURGICAL**. 
- Identify the exact bottleneck.
- Make the minimal required change.
- Never delete features, videos, services, or sections to artificial boost scores.
- Always run `npm run build` to verify **597/597 static pages compile clean**.

---

## 9. FUTURE AI AGENT EXECUTION PROTOCOL

Every future AI agent working on this repository MUST follow this protocol:

### Step 1: Pre-Execution Scope Lock
1. Read `PROJECT_CONTEXT.md` completely.
2. Classify the task into one of these strict categories:
   - `SINGLE-COMPONENT FIX` (Modify target component only)
   - `PAGE-SPECIFIC CHANGE` (Modify target page only)
   - `GLOBAL CHANGE` (Requires full regression check)
   - `PERFORMANCE OPTIMIZATION` (Surgical fix without visual/functional regression)
3. Enforce the **"Fix X ONLY"** rule: If the user requests "Fix footer", touch ONLY footer files. Do NOT alter navbar, hero, or global CSS.

### Step 2: Code Modification Rules
- Do NOT make unsolicited cleanups or architectural changes.
- Respect existing component signatures and props.
- Test mobile viewports (320px, 360px, 375px, 390px, 414px, 430px) and dark mode before declaring completion.

### Step 3: Mandatory Build Verification
Before reporting completion, run:
```bash
npm run build
```
Verify that all 597 static pages compile with **0 errors**.

---

## 10. VERIFICATION SUMMARY MATRIX

| Element / Area | Implementation File | Status | Verification Source |
| :--- | :--- | :--- | :--- |
| **Homepage Video** | `components/hero/HeroVideoBackground.tsx` | Verified / Locked | Direct file code check (`/videos/Create_a_premium_minimalist_ci.mp4`) |
| **8 Core Services** | `data/services.ts` | Verified / Active | Checked 8 service slugs in `services.ts` & `InteractiveServiceStack3D.tsx` |
| **Static Footer** | `components/layout/Footer.tsx` | Verified / Stable | Checked static HTML layout in `Footer.tsx` |
| **Brand System** | `app/globals.css` | Verified / Locked | Checked 6-color root CSS variables |
| **i18n (EN/HI/AR)** | `app/[locale]/layout.tsx`, `messages/*.json` | Verified / Active | Checked `next-intl` layout and translation files |
| **Production Build** | Next.js Turbopack Compiler | Verified / 100% Pass | `npm run build` (597/597 static pages compiled) |
