# ARAV INNOVATIONS — PROJECT CONTEXT & AI GUIDELINES
## What to Change, What NOT to Change, How to Work With This Codebase

---

## BEFORE YOU START: READ THIS ENTIRE DOCUMENT

This document is for **any AI, developer, or tool** working on the Arav Innovations website. It defines:
- ✅ What CAN be changed
- ❌ What CANNOT be changed  
- 🔒 Protected elements
- 📋 Project structure & key files
- 🎯 Decision-making framework

**ALWAYS apply these rules. No exceptions.**

---

## PART 1: PROJECT OVERVIEW

**Project:** Arav Innovations Website Redesign (Complete)  
**Status:** Production-ready (28 Delta Prompts completed)  
**Stack:** Next.js 14 (App Router) + TypeScript + Tailwind CSS + Framer Motion  
**Deployment:** Vercel (`aravinnovation-temp.vercel.app`)  
**Team:** Anupam Shrivastava (founder/product), Claude (AI development partner)  

**Business:** B2B IT Consulting & Digital Transformation  
**Markets:** India (HQ: Gurgaon) + UAE (Dubai)  
**Services:** 7 core practices (Strategy, Web Dev, Digital Marketing, SEO, GRC, Audit, Training)  

---

## PART 2: WHAT CAN BE CHANGED ✅

### A. Content (Text/Copy)
✅ **Blog posts** — Add, edit, delete articles  
✅ **Case study content** — Update descriptions, results, testimonials  
✅ **Service descriptions** — Refine copy, clarify benefits  
✅ **Product descriptions** — Update Astrobeams, OMNiGRC details  
✅ **FAQ answers** — Expand, clarify, add new FAQs  
✅ **Contact form labels** — Update field names, validation messages  
✅ **Page copy** — About, careers, process, methodology  
✅ **Testimonial quotes** — Update with new client feedback  

**Rule:** Only change copy if it's factually correct and brand-aligned. Don't invent numbers, features, or capabilities.

---

### B. Styling & Layout (Within Palette)
✅ **Component styling** — Adjust padding, margins, borders within existing design  
✅ **Typography** — Scale fonts (already 16px+ base on mobile, but can fine-tune)  
✅ **Spacing** — Increase gaps between sections, improve breathing room  
✅ **Responsive breakpoints** — Adjust media queries if needed  
✅ **Hover/Active states** — Enhance button feedback, link interactions  
✅ **Dark mode refinements** — Ensure contrast is good, colors match theme  
✅ **Card styling** — Adjust shadows, borders, corner radius (subtle changes)  
✅ **Form styling** — Update input styling, validation states  

**Rule:** All changes must use the 6-color palette ONLY:
- `#f15e1c` (orange, primary)
- `#2e936f` (green, secondary)
- `#ffffff` (white)
- `#ffec69` (yellow)
- `#fab60a` (gold)
- `#f7d7b0` (peach)

NO new colors introduced. NO grays, blacks, blues, purples, etc.

---

### C. Features & Functionality
✅ **New features** — Add features that enhance UX (new pages, sections, interactions)  
✅ **Performance optimizations** — Speed up page loads, reduce bundle size  
✅ **Accessibility improvements** — Add ARIA labels, improve keyboard navigation  
✅ **SEO enhancements** — Add meta tags, schema markup, improve indexing  
✅ **Security patches** — Fix vulnerabilities, harden endpoints  
✅ **Bug fixes** — Fix broken links, forms, animations  
✅ **Animation refinements** — Add or adjust animations (respect prefers-reduced-motion)  
✅ **Mobile optimizations** — Fix responsive layout issues  
✅ **Internationalization** — Add Hindi/Arabic translations for new content  

**Rule:** New features must align with the brand and improve user experience. Test on mobile before shipping.

---

### D. Technical Updates
✅ **Dependencies** — Update packages (npm audit, security patches)  
✅ **Build configuration** — Optimize Next.js config, Tailwind config  
✅ **Vercel settings** — Update environment variables, deploy settings  
✅ **Database backups** — Configure automated backups  
✅ **Rate limiting** — Adjust thresholds if needed  
✅ **Input validation** — Strengthen form validation  
✅ **API wrappers** — Add new server-side API routes  
✅ **Error handling** — Improve error messages, logging  

**Rule:** All changes must maintain security. Never expose API keys. Always validate on server.

---

## PART 3: WHAT CANNOT BE CHANGED ❌

### A. Brand Identity (LOCKED)
❌ **Color palette** — Never add new colors outside the 6-color system  
❌ **Logo** — Do not modify or replace Arav logo  
❌ **Tagline** — "Elevating Brands, One Click at a Time" — do not change  
❌ **Brand voice** — Professional, innovative, trustworthy tone  
❌ **Company name** — Always "Arav Innovations" (exact spelling)  
❌ **Positioning** — Positioned as premium, not commodity/cheap  

**Why locked:** Brand consistency across all touchpoints is critical for trust and recognition.

---

### B. Core Architecture
❌ **Directory structure** — Don't reorganize `/components`, `/app`, `/lib`, `/data`  
❌ **File naming conventions** — Don't rename existing files without major refactor  
❌ **Framework** — Don't switch from Next.js, TypeScript, Tailwind, Framer Motion  
❌ **Database schema** — Don't restructure existing tables (add new fields, yes; restructure, no)  
❌ **API contract** — Don't break existing API endpoints  
❌ **Deployment** — Don't change from Vercel to another platform  

**Why locked:** Changes to core architecture require extensive testing and risk breaking everything. Discuss before attempting.

---

### C. Verified Working Features
❌ **Dark mode** — Don't break dark mode toggle, theming system  
❌ **Internationalization** — Don't remove EN/HI/AR support  
❌ **3D animations** — Don't remove or majorly change scroll animations  
❌ **Responsive design** — Don't break mobile layout (375/390/430px)  
❌ **Security measures** — Don't remove HTTPS, secure cookies, rate limiting, auth verification  
❌ **SEO setup** — Don't remove meta tags, schema, sitemap, robots.txt  
❌ **Navigation structure** — Don't reorganize navbar/footer without approval  
❌ **Contact form** — Don't remove validation, submission handling  
❌ **Chatbot system** — Don't remove multilingual chatbot  

**Why locked:** These features took significant effort to build and are verified working. Breaking them causes regressions.

---

### D. Content That Shouldn't Change
❌ **Real client data** — Don't modify verified testimonials, case studies, client info  
❌ **Contact details** — Don't change phone numbers, addresses, email addresses  
❌ **Legal pages** — Don't modify Terms, Privacy Policy, Refund Policy (these are legally binding)  
❌ **Case study results** — Don't invent metrics, change "98/100 PageSpeed" without verification  
❌ **Service list** — The 7 core services are fixed; don't remove or add new ones without approval  
❌ **Product information** — Astrobeams.in details, OMNiGRC specs are verified; don't change without source  

**Why locked:** These are either legal/contractual or business-critical. Changes require approval.

---

### E. Verified Performance Requirements
❌ **Core Web Vitals** — Don't let LCP exceed 2.5s, CLS exceed 0.1, INP exceed 100ms  
❌ **Mobile performance** — Don't add animations/features that drop below 60fps on mobile  
❌ **Bundle size** — Don't add dependencies without justifying bloat  
❌ **SEO score** — Don't break anything that maintains 70+ UX score  

**Why locked:** Performance is critical for user experience and SEO ranking. Regressions hurt revenue.

---

## PART 4: DIRECTORY STRUCTURE (REFERENCE)

```
arav-innovations/
├── app/                          # Next.js App Router
│   ├── layout.tsx               # Root layout (navbar, footer, providers)
│   ├── page.tsx                 # Homepage
│   ├── about/
│   ├── contact/
│   ├── insights/                # Blog listing
│   │   └── [slug]/              # Blog post detail
│   ├── products/                # Product listing
│   │   └── [slug]/              # Product detail
│   ├── services/
│   │   └── [slug]/              # Service detail
│   ├── case-studies/            # Case studies
│   │   └── [slug]/              # Case study detail
│   ├── careers/
│   ├── api/                     # API routes (backend)
│   │   ├── contact/
│   │   ├── auth/
│   │   ├── cron/
│   │   └── ...
│   └── admin/                   # Admin dashboard (gated)
│
├── components/
│   ├── ui/                      # Reusable components
│   │   ├── button-3d.tsx        # 3D buttons
│   │   ├── button-3d-variants.tsx
│   │   ├── testimonials-columns-1.tsx  # Carousel
│   │   └── ...
│   ├── dev/
│   │   └── MobileDebugger.tsx   # Dev-only mobile preview
│   └── (other components)
│
├── lib/
│   ├── utils.ts
│   ├── validation.ts            # Zod schemas
│   ├── rate-limit.ts            # Rate limiter config
│   ├── cookie-config.ts         # Secure cookie setup
│   ├── sanitize.ts              # XSS prevention
│   ├── cms.ts                   # CMS/data fetching
│   └── ...
│
├── data/
│   ├── services.ts              # 7 services data
│   ├── products.ts              # Astrobeams, OMNiGRC
│   ├── case-studies.ts          # Case studies
│   ├── faqs.ts                  # FAQ content
│   ├── industries.ts            # Industries/verticals
│   └── navigation.ts            # Nav structure
│
├── messages/
│   ├── en.json                  # English translations
│   ├── hi.json                  # Hindi translations
│   └── ar.json                  # Arabic translations
│
├── public/
│   ├── logos/                   # Logo files
│   ├── images/                  # Images (optimized)
│   └── favicons/
│
├── styles/
│   └── globals.css              # Global styles, Tailwind directives
│
├── scripts/
│   └── backup-database.ts       # Database backup script
│
├── middleware.ts                # Auth verification
├── next.config.js               # Next.js config
├── tailwind.config.ts           # Tailwind config (6-color palette)
├── tsconfig.json                # TypeScript config
├── package.json                 # Dependencies
├── .env.example                 # Template (no real values)
├── .env.local                   # Local dev vars (NOT committed)
├── .gitignore                   # Exclude .env, node_modules, etc.
└── vercel.json                  # Vercel deployment config
```

**Key Rules:**
- ✅ Add new files/components in the right directories
- ✅ Follow existing naming conventions
- ❌ Don't reorganize folders without approval
- ❌ Don't move files without updating all imports

---

## PART 5: KEY FILES & THEIR PURPOSE

| File | Purpose | Can Change? | Notes |
|---|---|---|---|
| `app/layout.tsx` | Root layout, navbar, footer, providers | ✅ Minor styling | Don't break structure |
| `app/page.tsx` | Homepage | ✅ Content, sections | Keep section order unless approved |
| `components/Navbar.tsx` | Navigation | ✅ Styling | Don't remove nav items |
| `data/services.ts` | 7 services config | ❌ Locked | Don't add/remove services |
| `data/products.ts` | Product info | ✅ Update content | Keep structure |
| `lib/validation.ts` | Form validation schemas | ✅ Enhance validation | Don't remove fields |
| `middleware.ts` | Auth verification | ❌ Locked | Security critical |
| `tailwind.config.ts` | 6-color palette | ❌ Locked | Colors are fixed |
| `messages/en.json` | English text | ✅ Update content | Add new keys if needed |
| `messages/hi.json` | Hindi translations | ✅ Update content | Keep translation quality high |
| `vercel.json` | Deployment config | ✅ Update settings | Don't break deployment |
| `.env.example` | Template (no values) | ✅ Update template | Keep no real secrets |

---

## PART 6: DECISION-MAKING FRAMEWORK

**When you're unsure if a change is allowed, ask these questions:**

### Q1: Is this change visible to users?
- **Yes** → Will it break existing functionality? → If YES: ❌ Don't change without approval
- **Yes** → Does it stay within the 6-color palette? → If NO: ❌ Stop, use palette only
- **Yes** → Is it brand-aligned? → If NO: ❌ Don't make it

### Q2: Is this a dependency/security/infrastructure change?
- **Yes** → Will it impact performance or security? → If YES: ✅ Safe to change if it improves
- **Yes** → Does it maintain backward compatibility? → If NO: ❌ Test thoroughly or ask

### Q3: Is this changing locked content?
- **Yes** → Is it a legal/contractual document? → If YES: ❌ Never change
- **Yes** → Is it core brand identity? → If YES: ❌ Never change
- **Yes** → Is it verified working and tested? → If YES: ❌ Only if fixing a bug

### Q4: Is this a bug fix?
- **Yes** → Is the bug confirmed (user reports, test failure)? → If YES: ✅ Fix it
- **Yes** → Does the fix break anything else? → If YES: ❌ Test thoroughly before shipping
- **Yes** → Can you revert if needed? → If NO: ❌ Add a test case first

---

## PART 7: HOW TO WORK WITH THIS CODEBASE

### When Adding a New Feature:
1. **Check locked elements** — Does this touch brand, core architecture, or verified features?
2. **Use existing patterns** — Copy component structure from similar existing components
3. **Follow naming conventions** — Use kebab-case for files, camelCase for functions
4. **Import from `/lib`, `/data`, `/messages`** — Don't hardcode values
5. **Test on mobile** — Responsive at 375/390/430px + landscape
6. **Test dark mode** — Works in light and dark
7. **Test internationalization** — If text-based, add to `messages/en.json`, `messages/hi.json`
8. **Test performance** — Doesn't break Core Web Vitals
9. **Test accessibility** — WCAG AA contrast, keyboard navigation
10. **Security check** — No API keys in frontend, validate on server

### When Fixing a Bug:
1. **Reproduce the bug** — Confirm on desktop and mobile
2. **Identify root cause** — Check console, DevTools, server logs
3. **Make minimal change** — Fix only what's broken
4. **Test the fix** — Verify it works, doesn't break anything else
5. **Add a test case** — Prevent regression
6. **Document why** — Leave comments explaining the fix

### When Updating Content:
1. **Verify source** — Is this information accurate/verified?
2. **Use `/data` or `/messages`** — Don't hardcode values
3. **Check all languages** — If English changes, update EN and translate to HI/AR
4. **Maintain tone** — Professional, brand-aligned
5. **No invented claims** — Don't make up metrics, client names, results

### When Styling:
1. **Use 6-color palette only** — No new colors
2. **Use Tailwind classes** — Don't write custom CSS
3. **Mobile-first approach** — Design for 375px, scale up
4. **Respect dark mode** — Add `dark:` variants
5. **Use existing tokens** — Check `tailwind.config.ts` for sizing, spacing
6. **No hardcoded sizes** — Use Tailwind scale (text-sm, px-4, py-6, etc.)

---

## PART 8: COMMON REQUESTS & RESPONSES

### Request: "Add a new color to the palette"
**Response:** ❌ No. The 6-color palette is locked. All new elements must use existing colors. If you need contrast or a new mood, use tints/shades of existing colors (see tailwind config).

### Request: "Change the navigation menu structure"
**Response:** ⚠️ Only minor tweaks. Adding/removing menu items requires approval. Changing order requires approval. Styling tweaks are okay.

### Request: "Update the homepage section order"
**Response:** ⚠️ Proceed with caution. The current order follows a narrative arc (Problem → Technology → Interaction → Proof → Transformation → Action). Changes must maintain this flow or be approved first.

### Request: "Remove dark mode support"
**Response:** ❌ No. Dark mode is verified working and part of the brand. Don't touch it.

### Request: "Add Google Analytics tracking"
**Response:** ✅ Yes. Configure in Vercel environment variables. Don't hardcode API keys. Use server-side or environment-based setup.

### Request: "Refactor the entire component structure"
**Response:** ❌ No. Major refactors risk breaking everything. If you believe restructuring is necessary, discuss with the product team first.

### Request: "Update product info (Astrobeams, OMNiGRC)"
**Response:** ✅ Yes, if you have verified updated info from the source. Update `/data/products.ts` and corresponding `/products/[slug]/page.tsx`.

### Request: "Add a new service (8th practice)"
**Response:** ❌ No. The 7 practices are the core offering. Adding a new service requires business/product approval.

### Request: "Change the contact form fields"
**Response:** ⚠️ Proceed with caution. Current fields (name, email, company, service, timeline, message) are optimized for lead qualification. Removing fields might hurt data quality. Adding fields might hurt conversion. Test any changes.

### Request: "Optimize images for faster loading"
**Response:** ✅ Yes. Use WebP/AVIF, add responsive `srcset`, lazy load off-screen images. This improves performance without breaking anything.

### Request: "Add a new blog post"
**Response:** ✅ Yes. Add to `/data/blog.ts` or CMS, create `/insights/[slug]/page.tsx` using the template. Translate title/excerpt to HI/AR in `messages/` files.

### Request: "Change the 6-color palette slightly (e.g., adjust shade of orange)"
**Response:** ❌ No. The exact hex values are locked. If the current orange `#f15e1c` doesn't work, request a redesign from the design team instead of tweaking.

---

## PART 9: TESTING CHECKLIST (BEFORE SHIPPING ANY CHANGE)

**Always run through this before pushing to production:**

- [ ] **Desktop view** (1440px) — Works, looks good
- [ ] **Tablet view** (768px) — Responsive, readable
- [ ] **Mobile view** (375/390/430px) — Text ≥16px, no overflow
- [ ] **Landscape mode** — No horizontal scroll
- [ ] **Dark mode** — Colors match, contrast is good
- [ ] **All languages** (EN/HI/AR) — Text displays correctly
- [ ] **All CTAs** — Buttons click, forms submit
- [ ] **Accessibility** — Keyboard nav, screen reader, WCAG AA
- [ ] **Performance** — Core Web Vitals (LCP <2.5s, CLS <0.1, INP <100ms)
- [ ] **Security** — No console errors, no exposed API keys, forms validate
- [ ] **Images** — Load, no 404s, optimized
- [ ] **Links** — All internal links work, external links open in new tab
- [ ] **Forms** — Validation works, success/error messages display
- [ ] **Animations** — Smooth, respect prefers-reduced-motion
- [ ] **Mobile debugger** — Only visible on localhost, not on production
- [ ] **Console** — No errors, warnings should be minimal

---

## PART 10: WHEN IN DOUBT

**Ask these questions before making a change:**

1. **Will this change break existing functionality?** → If YES, test thoroughly or ask
2. **Does this change the user-facing experience?** → If YES, ensure it's brand-aligned and tested
3. **Is this a security/performance change?** → If YES, measure impact before shipping
4. **Am I touching locked elements?** → If YES, stop and ask for approval
5. **Is this reversible?** → If NO, make sure it's tested
6. **Would removing this feature break anything?** → If YES, be very careful

**When you're still unsure: ASK.** It's better to ask and be sure than to break something.

---

## PART 11: QUICK REFERENCE — ALLOWED VS. LOCKED

### ✅ YOU CAN CHANGE:
- Content (blog, case studies, FAQs, copy)
- Styling (within 6-color palette)
- Performance optimizations
- Bug fixes
- New features (if approved)
- Dependencies (security patches)
- Translations (HI/AR content)
- Form validation
- Error messages
- Animations (mobile-safe)

### ❌ YOU CANNOT CHANGE:
- 6-color palette
- Logo or brand identity
- Core architecture (Next.js, TS, Tailwind, Framer)
- Directory structure
- Navigation menu structure (major changes)
- Legal/contractual content
- Security infrastructure
- Core working features (dark mode, i18n, 3D, responsive)
- Service list (7 practices)
- Case study results (verified data)
- Framework or deployment

---

## PART 12: EMERGENCY CONTACTS

**If you break something or are unsure:**
- Check the Delta Prompt that introduced the feature (they explain everything)
- Search git history for when the file was last modified (understand the original intent)
- Test thoroughly before shipping
- If stuck, revert the change and try a different approach
- Document what went wrong so it doesn't happen again

---

## FINAL CHECKLIST: READ THIS BEFORE EVERY CHANGE

- [ ] I've read this entire document
- [ ] I understand what CAN be changed
- [ ] I understand what CANNOT be changed
- [ ] I've checked if my change touches locked elements
- [ ] I've tested my change on mobile (375px+)
- [ ] I've tested dark mode
- [ ] I've tested all languages (EN/HI/AR)
- [ ] I've verified no new colors are introduced
- [ ] I've verified Core Web Vitals aren't broken
- [ ] I'm ready to ship this change

---

**This document is the source of truth for working with the Arav Innovations codebase.**

**Print it, bookmark it, reference it constantly.**

**When in doubt, re-read it. When still in doubt, ask.**
