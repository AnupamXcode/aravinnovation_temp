import sys
import os
from pptx import Presentation
from pptx.util import Inches, Pt
from pptx.dml.color import RGBColor
from pptx.enum.text import PP_ALIGN, MSO_ANCHOR
from pptx.enum.shapes import MSO_SHAPE

def create_presentation():
    prs = Presentation()
    # 16:9 Widescreen dimensions
    prs.slide_width = Inches(13.333)
    prs.slide_height = Inches(7.5)
    blank_layout = prs.slide_layouts[6]

    # Brand Colors (Strict 6-Color Palette + Dark Canvas)
    ORANGE = RGBColor(241, 94, 28)    # #f15e1c - Primary Executive Orange
    GREEN = RGBColor(46, 147, 111)    # #2e936f - Growth Green
    WHITE = RGBColor(255, 255, 255)   # #ffffff - Pure White
    YELLOW = RGBColor(255, 236, 105)  # #ffec69 - Soft Yellow
    GOLD = RGBColor(250, 182, 10)     # #fab60a - Prestige Gold
    PEACH = RGBColor(247, 215, 176)   # #f7d7b0 - Background Tint / Divider
    
    # Dark & Neutral Tokens
    DARK_BG = RGBColor(12, 13, 15)    # #0c0d0e - Dark AMOLED Canvas
    CARD_BG = RGBColor(22, 25, 28)    # #16191c - Surface Dark Card
    CARD_BORDER = RGBColor(45, 50, 56) # Border color
    TEXT_LIGHT = RGBColor(245, 245, 245)
    TEXT_MUTED = RGBColor(170, 178, 186)
    DARK_TEXT = RGBColor(27, 40, 35)

    def add_header(slide, title_text, category_text="ARAV INNOVATIONS — WEBSITE MIGRATION & DEPLOYMENT"):
        # Header category
        cat_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.4), Inches(11.733), Inches(0.4))
        tf_cat = cat_box.text_frame
        tf_cat.word_wrap = True
        tf_cat.margin_left = tf_cat.margin_top = tf_cat.margin_right = tf_cat.margin_bottom = 0
        p_cat = tf_cat.paragraphs[0]
        p_cat.text = category_text.upper()
        p_cat.font.size = Pt(10)
        p_cat.font.bold = True
        p_cat.font.color.rgb = ORANGE
        p_cat.font.name = "Arial"

        # Main Title
        title_box = slide.shapes.add_textbox(Inches(0.8), Inches(0.75), Inches(11.733), Inches(0.6))
        tf_title = title_box.text_frame
        tf_title.word_wrap = True
        tf_title.margin_left = tf_title.margin_top = tf_title.margin_right = tf_title.margin_bottom = 0
        p_title = tf_title.paragraphs[0]
        p_title.text = title_text
        p_title.font.size = Pt(22)
        p_title.font.bold = True
        p_title.font.color.rgb = WHITE
        p_title.font.name = "Arial"

        # Accent Bar under title
        accent = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, Inches(0.8), Inches(1.4), Inches(1.5), Inches(0.04))
        accent.fill.solid()
        accent.fill.fore_color.rgb = GREEN
        accent.line.color.rgb = GREEN

    def set_slide_background(slide, color=DARK_BG):
        bg = slide.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(7.5))
        bg.fill.solid()
        bg.fill.fore_color.rgb = color
        bg.line.fill.background()
        return bg

    def add_card(slide, left, top, width, height, bg_color=CARD_BG, border_color=CARD_BORDER):
        card = slide.shapes.add_shape(MSO_SHAPE.ROUNDED_RECTANGLE, Inches(left), Inches(top), Inches(width), Inches(height))
        card.fill.solid()
        card.fill.fore_color.rgb = bg_color
        card.line.color.rgb = border_color
        card.line.width = Pt(1)
        return card

    def add_footer(slide, current_slide, total_slides=22):
        footer_box = slide.shapes.add_textbox(Inches(0.8), Inches(7.0), Inches(11.733), Inches(0.3))
        tf = footer_box.text_frame
        tf.margin_left = tf.margin_top = tf.margin_right = tf.margin_bottom = 0
        p = tf.paragraphs[0]
        p.text = f"Arav Innovations Website Migration | Slide {current_slide} of {total_slides} | Confidential & Executive Report"
        p.font.size = Pt(9)
        p.font.color.rgb = TEXT_MUTED
        p.font.name = "Arial"

    # =========================================================================
    # SLIDE 1: COVER SLIDE
    # =========================================================================
    slide1 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide1, DARK_BG)

    # Decorative background shapes
    top_glow = slide1.shapes.add_shape(MSO_SHAPE.RECTANGLE, 0, 0, Inches(13.333), Inches(0.15))
    top_glow.fill.solid()
    top_glow.fill.fore_color.rgb = ORANGE
    top_glow.line.fill.background()

    card_cover = add_card(slide1, 0.8, 1.2, 11.733, 5.2, bg_color=CARD_BG, border_color=ORANGE)
    
    box = slide1.shapes.add_textbox(Inches(1.2), Inches(1.6), Inches(10.9), Inches(4.4))
    tf = box.text_frame
    tf.word_wrap = True

    p0 = tf.paragraphs[0]
    p0.text = "ARAV INNOVATIONS — ENTERPRISE MIGRATION REPORT"
    p0.font.size = Pt(12)
    p0.font.bold = True
    p0.font.color.rgb = GREEN
    p0.font.name = "Arial"

    p1 = tf.add_paragraph()
    p1.text = "Arav Innovations Website\nMigration & Deployment"
    p1.font.size = Pt(36)
    p1.font.bold = True
    p1.font.color.rgb = WHITE
    p1.font.name = "Arial"
    p1.space_before = Pt(14)
    p1.space_after = Pt(14)

    p2 = tf.add_paragraph()
    p2.text = "Complete Evidence-Based Migration Inventory, Architecture Audit & Go-Live Strategy"
    p2.font.size = Pt(16)
    p2.font.color.rgb = TEXT_MUTED
    p2.font.name = "Arial"
    p2.space_after = Pt(30)

    # Badges box inside cover
    p3 = tf.add_paragraph()
    p3.text = "Old Website: https://aravinnovations.com/   |   Target Preview: https://aravinnovation-temp.vercel.app/"
    p3.font.size = Pt(11)
    p3.font.bold = True
    p3.font.color.rgb = GOLD
    p3.font.name = "Arial"

    p4 = tf.add_paragraph()
    p4.text = "Framework: Next.js 16 (App Router)   |   Compiler: Turbopack   |   Static Pages Generated: 597/597"
    p4.font.size = Pt(11)
    p4.font.color.rgb = TEXT_MUTED
    p4.font.name = "Arial"
    p4.space_before = Pt(6)

    # =========================================================================
    # SLIDE 2: EXECUTIVE SUMMARY
    # =========================================================================
    slide2 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide2)
    add_header(slide2, "Executive Summary — Migration Overview")
    add_footer(slide2, 2)

    # 4 Stat Highlight Cards
    stats = [
      ("55 / 55", "Blog Articles Migrated", "100% match rate from WP XML export into Next.js data engine.", ORANGE),
      ("597 / 597", "Static Pages Compiled", "Production build clean pass via Next.js Turbopack compiler.", GREEN),
      ("8 Practices", "Core Service Portfolio", "Reorganized enterprise practices aligned with CFO/CIO goals.", GOLD),
      ("3 SaaS Platforms", "Flagship Products", "AstroBeams AI, AstroBeams Store, and OMNiGRC integrated.", YELLOW)
    ]
    for idx, (num, label, desc, color) in enumerate(stats):
        col = idx % 4
        left = 0.8 + col * 2.98
        add_card(slide2, left, 1.8, 2.8, 2.0, bg_color=CARD_BG, border_color=color)
        tb = slide2.shapes.add_textbox(Inches(left + 0.15), Inches(1.95), Inches(2.5), Inches(1.7))
        tf_s = tb.text_frame
        tf_s.word_wrap = True
        p_num = tf_s.paragraphs[0]
        p_num.text = num
        p_num.font.size = Pt(24)
        p_num.font.bold = True
        p_num.font.color.rgb = color
        p_lbl = tf_s.add_paragraph()
        p_lbl.text = label
        p_lbl.font.size = Pt(12)
        p_lbl.font.bold = True
        p_lbl.font.color.rgb = WHITE
        p_lbl.space_before = Pt(4)
        p_desc = tf_s.add_paragraph()
        p_desc.text = desc
        p_desc.font.size = Pt(9.5)
        p_desc.font.color.rgb = TEXT_MUTED
        p_desc.space_before = Pt(4)

    # Overview Text Card
    add_card(slide2, 0.8, 4.0, 11.733, 2.8)
    tb_main = slide2.shapes.add_textbox(Inches(1.0), Inches(4.15), Inches(11.333), Inches(2.5))
    tf_m = tb_main.text_frame
    tf_m.word_wrap = True
    
    p_m0 = tf_m.paragraphs[0]
    p_m0.text = "Key Migration Context & Achievements:"
    p_m0.font.size = Pt(14)
    p_m0.font.bold = True
    p_m0.font.color.rgb = ORANGE

    bullets = [
        "Complete System Modernization: Replaced legacy WordPress blog setup with high-performance Next.js 16 App Router architecture deployed on Vercel Edge infrastructure.",
        "Zero Content Loss Guarantee: Verified 100% preservation of all 55 published WordPress articles, 174 media attachments, categories, tags, and publication timestamps.",
        "Brand & Design System Locking: Enforced strict 6-color palette (#f15e1c, #2e936f, #ffffff, #ffec69, #fab60a, #f7d7b0) and static mobile layout stability.",
        "Automated Pipeline & SEO Integrity: Preserved organic search rankings through 107 link rewrites, dynamic JSON-LD schemas, sitemaps, and legacy URL alias handling."
    ]
    for b in bullets:
        pb = tf_m.add_paragraph()
        pb.text = f"• {b}"
        pb.font.size = Pt(11)
        pb.font.color.rgb = TEXT_LIGHT
        pb.space_before = Pt(6)

    # =========================================================================
    # SLIDE 3: MIGRATION OBJECTIVES & SCOPE LOCK
    # =========================================================================
    slide3 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide3)
    add_header(slide3, "Strategic Migration Objectives & Scope Lock")
    add_footer(slide3, 3)

    # Left Column: Strategic Drivers
    add_card(slide3, 0.8, 1.8, 5.7, 5.0)
    tb_l = slide3.shapes.add_textbox(Inches(1.0), Inches(1.95), Inches(5.3), Inches(4.6))
    tf_l = tb_l.text_frame
    tf_l.word_wrap = True
    p_l0 = tf_l.paragraphs[0]
    p_l0.text = "Strategic Business Drivers"
    p_l0.font.size = Pt(15)
    p_l0.font.bold = True
    p_l0.font.color.rgb = GREEN

    drivers = [
        ("Global Brand Positioning", "Reflect dual headquarters in India (Gurgaon HQ) and UAE (Dubai Hub) with authoritative enterprise design aesthetics."),
        ("Sub-Second Performance", "Eliminate WordPress plugin overhead and slow server response times; achieve sub-second LCP and zero CLS layout shifts."),
        ("Security & Compliance", "Implement DPDP Act (India) and UAE security readiness, static page compilation, and client-side XSS DOMPurify sanitization."),
        ("Generative SEO & Discovery", "Optimize site structure for traditional Search Engines (SEO) and Answer Engine Optimization (AEO) for AI search discovery.")
    ]
    for title, detail in drivers:
        p_t = tf_l.add_paragraph()
        p_t.text = f"• {title}:"
        p_t.font.size = Pt(11)
        p_t.font.bold = True
        p_t.font.color.rgb = WHITE
        p_t.space_before = Pt(10)
        p_d = tf_l.add_paragraph()
        p_d.text = detail
        p_d.font.size = Pt(10)
        p_d.font.color.rgb = TEXT_MUTED

    # Right Column: Non-Negotiables
    add_card(slide3, 6.833, 1.8, 5.7, 5.0, border_color=ORANGE)
    tb_r = slide3.shapes.add_textbox(Inches(7.033), Inches(1.95), Inches(5.3), Inches(4.6))
    tf_r = tb_r.text_frame
    tf_r.word_wrap = True
    p_r0 = tf_r.paragraphs[0]
    p_r0.text = "Strict Non-Negotiables (Scope Lock 🔒)"
    p_r0.font.size = Pt(15)
    p_r0.font.bold = True
    p_r0.font.color.rgb = ORANGE

    locks = [
        ("6-Color Palette ONLY", "#f15e1c, #2e936f, #ffffff, #ffec69, #fab60a, #f7d7b0. Zero unapproved colors."),
        ("Homepage Hero Video", "Background video /videos/Create_a_premium_minimalist_ci.mp4 must never be removed or disabled."),
        ("All 8 Core Practices", "Full retention and visibility of all 8 enterprise services across navigation and landing pages."),
        ("Static Mobile Footer", "100% static HTML layout on mobile without Framer Motion scroll-jacking or 100vh height locks."),
        ("Multilingual i18n", "Full support for English (/en), Hindi (/hi), and Arabic (/ar) with rtl layout direction.")
    ]
    for title, detail in locks:
        p_t = tf_r.add_paragraph()
        p_t.text = f"🔒 {title}:"
        p_t.font.size = Pt(11)
        p_t.font.bold = True
        p_t.font.color.rgb = WHITE
        p_t.space_before = Pt(10)
        p_d = tf_r.add_paragraph()
        p_d.text = detail
        p_d.font.size = Pt(10)
        p_d.font.color.rgb = TEXT_MUTED

    # =========================================================================
    # SLIDE 4: OLD WEBSITE / SOURCE SYSTEM AUDIT
    # =========================================================================
    slide4 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide4)
    add_header(slide4, "Source System Audit — Legacy WordPress Infrastructure")
    add_footer(slide4, 4)

    # 3 Cards for Source Infrastructure
    c1 = add_card(slide4, 0.8, 1.8, 3.7, 4.9)
    tb_c1 = slide4.shapes.add_textbox(Inches(0.95), Inches(1.95), Inches(3.4), Inches(4.5))
    tf_c1 = tb_c1.text_frame
    tf_c1.word_wrap = True
    p = tf_c1.paragraphs[0]
    p.text = "Legacy CMS Environment"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = ORANGE
    bullets_c1 = [
        "Root URL: https://aravinnovations.com/",
        "Blog Subdomain: https://blog.aravinnovations.com/",
        "CMS Platform: WordPress 6.x",
        "Primary Use: Publishing B2B insights and organic marketing articles",
        "Legacy URL Structure: blog.aravinnovations.com/{slug}/"
    ]
    for b in bullets_c1:
        pb = tf_c1.add_paragraph()
        pb.text = f"• {b}"
        pb.font.size = Pt(10.5)
        pb.font.color.rgb = TEXT_LIGHT
        pb.space_before = Pt(8)

    c2 = add_card(slide4, 4.816, 1.8, 3.7, 4.9)
    tb_c2 = slide4.shapes.add_textbox(Inches(4.966), Inches(1.95), Inches(3.4), Inches(4.5))
    tf_c2 = tb_c2.text_frame
    tf_c2.word_wrap = True
    p = tf_c2.paragraphs[0]
    p.text = "WordPress Export Source"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = GREEN
    bullets_c2 = [
        "Export File: WordPress.2026-08-30.xml",
        "File Size: 2,396,880 bytes (~2.4 MB)",
        "Total RSS Items: 230 items",
        "Published Posts: 55 articles",
        "Draft Posts: 1 article (ID 826)",
        "Media Attachments: 174 items",
        "Nav Menus: 0 in export XML"
    ]
    for b in bullets_c2:
        pb = tf_c2.add_paragraph()
        pb.text = f"• {b}"
        pb.font.size = Pt(10.5)
        pb.font.color.rgb = TEXT_LIGHT
        pb.space_before = Pt(8)

    c3 = add_card(slide4, 8.833, 1.8, 3.7, 4.9)
    tb_c3 = slide4.shapes.add_textbox(Inches(8.983), Inches(1.95), Inches(3.4), Inches(4.5))
    tf_c3 = tb_c3.text_frame
    tf_c3.word_wrap = True
    p = tf_c3.paragraphs[0]
    p.text = "Export Metadata & Authors"
    p.font.size = Pt(14)
    p.font.bold = True
    p.font.color.rgb = GOLD
    bullets_c3 = [
        "Date Range: Dec 3, 2024 to Aug 29, 2026",
        "Authors Identified: 4 creators (nextgenph.usa@gmail.com, Arav Innovations, abrar, shifa)",
        "Categories: 6 unique taxonomy terms",
        "Tags: 46 unique tagging terms",
        "Featured Images: 54/55 posts with _thumbnail_id meta key"
    ]
    for b in bullets_c3:
        pb = tf_c3.add_paragraph()
        pb.text = f"• {b}"
        pb.font.size = Pt(10.5)
        pb.font.color.rgb = TEXT_LIGHT
        pb.space_before = Pt(8)

    # =========================================================================
    # SLIDE 5: NEW WEBSITE / TARGET SYSTEM OVERVIEW
    # =========================================================================
    slide5 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide5)
    add_header(slide5, "Target System Overview — Next.js 16 App Router")
    add_footer(slide5, 5)

    add_card(slide5, 0.8, 1.8, 11.733, 5.0)
    tb_t = slide5.shapes.add_textbox(Inches(1.0), Inches(1.95), Inches(11.333), Inches(4.6))
    tf_t = tb_t.text_frame
    tf_t.word_wrap = True

    p = tf_t.paragraphs[0]
    p.text = "Target Deployment Specifications & Deployment URL"
    p.font.size = Pt(15)
    p.font.bold = True
    p.font.color.rgb = GREEN

    t_items = [
        ("Target Preview URL", "https://aravinnovation-temp.vercel.app/", ORANGE),
        ("Production Host & Runtime", "Vercel Edge Network with Node.js Serverless Execution", WHITE),
        ("Framework Architecture", "Next.js 16.3.1 (App Router with Turbopack compiler enabled)", WHITE),
        ("UI Library & Compiler", "React 19.2.8 with TypeScript 5 strict mode", WHITE),
        ("Static Pages Generated", "597 / 597 static pages pre-rendered cleanly during npm run build", GREEN),
        ("Total Application Routes", "50 distinct App Router route definitions across app/", WHITE),
        ("Internationalization Routing", "next-intl 4.13.7 supporting /en, /hi, and /ar locale routing", WHITE)
    ]
    for label, val, col in t_items:
        p_lbl = tf_t.add_paragraph()
        p_lbl.text = f"• {label}: "
        p_lbl.font.size = Pt(11)
        p_lbl.font.bold = True
        p_lbl.font.color.rgb = WHITE
        p_lbl.space_before = Pt(8)
        
        # Add value part
        run = p_lbl.add_run()
        run.text = val
        run.font.size = Pt(11)
        run.font.bold = False
        run.font.color.rgb = col

    # =========================================================================
    # SLIDE 6: TECHNOLOGY ARCHITECTURE & STACK
    # =========================================================================
    slide6 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide6)
    add_header(slide6, "Full-Stack Technology Architecture")
    add_footer(slide6, 6)

    # 4 Stack Column Cards
    layers = [
        ("Core Framework", ["Next.js 16.3.1 (App Router)", "React 19.2.8 Engine", "TypeScript 5 Strict", "Turbopack Compiler"], ORANGE),
        ("Styling & Motion", ["Tailwind CSS v4 Engine", "Framer Motion 13.1.0", "GSAP 3.15.0 Animation", "Lenis Smooth Scroll"], GREEN),
        ("i18n & Content", ["next-intl 4.13.7 Routing", "DOMPurify HTML Sanitizer", "Fuse.js 7.5 Fuzzy Search", "XML Fast Parser 5.11"], GOLD),
        ("API & Services", ["@vercel/blob Media Storage", "Nodemailer SMTP / Resend", "Zod 3.25 Form Validation", "React Hook Form 7.85"], YELLOW)
    ]
    for idx, (title, items, color) in enumerate(layers):
        left = 0.8 + idx * 2.98
        add_card(slide6, left, 1.8, 2.8, 4.9, border_color=color)
        tb_l = slide6.shapes.add_textbox(Inches(left + 0.15), Inches(1.95), Inches(2.5), Inches(4.5))
        tf_l = tb_l.text_frame
        tf_l.word_wrap = True
        p_t = tf_l.paragraphs[0]
        p_t.text = title
        p_t.font.size = Pt(13)
        p_t.font.bold = True
        p_t.font.color.rgb = color
        for it in items:
            p_i = tf_l.add_paragraph()
            p_i.text = f"• {it}"
            p_i.font.size = Pt(10)
            p_i.font.color.rgb = TEXT_LIGHT
            p_i.space_before = Pt(10)

    # =========================================================================
    # SLIDE 7: WORDPRESS EXPORT AUDIT & DATA BREAKDOWN
    # =========================================================================
    slide7 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide7)
    add_header(slide7, "WordPress Export Audit — Item Classification")
    add_footer(slide7, 7)

    # Table of Item Types
    rows, cols = 5, 5
    left, top, width, height = Inches(0.8), Inches(1.8), Inches(11.733), Inches(2.2)
    table_shape = slide7.shapes.add_table(rows, cols, left, top, width, height)
    table = table_shape.table

    # Column widths
    table.columns[0].width = Inches(2.5)
    table.columns[1].width = Inches(2.0)
    table.columns[2].width = Inches(2.0)
    table.columns[3].width = Inches(2.0)
    table.columns[4].width = Inches(3.233)

    headers = ["WP Item Type (wp:post_type)", "Total Count", "Publish Status", "Draft / Inherit", "Migration Target File"]
    for i, head in enumerate(headers):
        cell = table.cell(0, i)
        cell.fill.solid()
        cell.fill.fore_color.rgb = CARD_BG
        p = cell.text_frame.paragraphs[0]
        p.text = head
        p.font.size = Pt(10.5)
        p.font.bold = True
        p.font.color.rgb = ORANGE

    data = [
        ["post (Blog Articles)", "56", "55", "1 Draft (ID 826)", "data/wordpress-posts.ts"],
        ["attachment (Media)", "174", "0", "174 Inherit", "public/ & Next Remote Patterns"],
        ["page (Site Pages)", "0", "0", "0", "Rebuilt in app/[locale]/"],
        ["nav_menu_item", "0", "0", "0", "Rebuilt in data/navigation.ts"]
    ]
    for r_idx, row_data in enumerate(data):
        for c_idx, val in enumerate(row_data):
            cell = table.cell(r_idx + 1, c_idx)
            cell.fill.solid()
            cell.fill.fore_color.rgb = DARK_BG
            p = cell.text_frame.paragraphs[0]
            p.text = val
            p.font.size = Pt(10)
            p.font.color.rgb = WHITE

    # Bottom summary card for Taxonomy
    add_card(slide7, 0.8, 4.3, 11.733, 2.5)
    tb_b = slide7.shapes.add_textbox(Inches(1.0), Inches(4.45), Inches(11.333), Inches(2.2))
    tf_b = tb_b.text_frame
    tf_b.word_wrap = True
    p0 = tf_b.paragraphs[0]
    p0.text = "Taxonomy Breakdown Extracted from Export:"
    p0.font.size = Pt(13)
    p0.font.bold = True
    p0.font.color.rgb = GREEN

    t_bullets = [
        "6 Categories Extracted: Digital Marketing (32 posts), AI (8 posts), Compliance (2 posts), Energy (2 posts), Cybersecurity (1 post), Uncategorized (15 posts).",
        "46 Unique Tags Extracted: Top tags include Brand Building, E-commerce, Email Marketing, Influencer Marketing, PPC, SEO, and Social Media Marketing.",
        "Featured Images Preserved: 54 out of 55 published articles contained explicit _thumbnail_id meta keys mapped directly to featured images."
    ]
    for b in t_bullets:
        pb = tf_b.add_paragraph()
        pb.text = f"• {b}"
        pb.font.size = Pt(10.5)
        pb.font.color.rgb = TEXT_LIGHT
        pb.space_before = Pt(6)

    # =========================================================================
    # SLIDE 8: BLOG MIGRATION ANALYSIS (55/55 MATCH)
    # =========================================================================
    slide8 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide8)
    add_header(slide8, "Blog Migration Analysis — 100% Match Verification")
    add_footer(slide8, 8)

    # Left Card: Metrics
    add_card(slide8, 0.8, 1.8, 5.7, 5.0, border_color=GREEN)
    tb_l = slide8.shapes.add_textbox(Inches(1.0), Inches(1.95), Inches(5.3), Inches(4.6))
    tf_l = tb_l.text_frame
    tf_l.word_wrap = True
    p0 = tf_l.paragraphs[0]
    p0.text = "Reconciliation Metrics (100% Match)"
    p0.font.size = Pt(14)
    p0.font.bold = True
    p0.font.color.rgb = GREEN

    metrics = [
        ("Total Source Published Posts", "55 Articles (WordPress.2026-08-30.xml)"),
        ("Total Target Posts in Codebase", "55 Articles (data/wordpress-posts.ts)"),
        ("Successfully Matched Posts", "55 Articles (100% Match Rate)"),
        ("Source Posts Not Found", "0 Articles (Zero content loss)"),
        ("Target Posts Without Match", "0 Articles (Zero synthetic posts)"),
        ("Draft Posts Omitted", "1 Article (ID 826 kept in draft)"),
        ("Duplicate Slugs Detected", "0 Duplicates (Verified by script)")
    ]
    for m_label, m_val in metrics:
        p = tf_l.add_paragraph()
        p.text = f"• {m_label}: "
        p.font.size = Pt(10.5)
        p.font.bold = True
        p.font.color.rgb = WHITE
        p.space_before = Pt(6)
        r = p.add_run()
        r.text = m_val
        r.font.bold = False
        r.font.color.rgb = GOLD

    # Right Card: Content Transformation Pipeline
    add_card(slide8, 6.833, 1.8, 5.7, 5.0)
    tb_r = slide8.shapes.add_textbox(Inches(7.033), Inches(1.95), Inches(5.3), Inches(4.6))
    tf_r = tb_r.text_frame
    tf_r.word_wrap = True
    p0 = tf_r.paragraphs[0]
    p0.text = "Content Transformation Engine"
    p0.font.size = Pt(14)
    p0.font.bold = True
    p0.font.color.rgb = ORANGE

    pipe = [
        ("HTML Sanitization", "All post bodies filtered through isomorphic-dompurify in lib/html-sanitizer.ts to prevent XSS while preserving HTML formatting."),
        ("WPM Read Time Calculation", "Dynamic reading time calculation algorithm based on 200 WPM text parsing (e.g. '4 min read')."),
        ("Structured Sections Array", "Parsed raw WP HTML into structured sections[] arrays for automatic table-of-contents rendering."),
        ("Executive Key Takeaways", "Extracted key takeaways automatically for quick executive summaries on post detail pages."),
        ("Contextual Category CTAs", "Dynamically injected CFO/CIO-aligned consultation CTAs tailored to each article's primary category.")
    ]
    for p_title, p_detail in pipe:
        p = tf_r.add_paragraph()
        p.text = f"• {p_title}: "
        p.font.size = Pt(10.5)
        p.font.bold = True
        p.font.color.rgb = WHITE
        p.space_before = Pt(6)
        r = p.add_run()
        r.text = p_detail
        r.font.size = Pt(9.5)
        r.font.bold = False
        r.font.color.rgb = TEXT_MUTED

    # =========================================================================
    # SLIDE 9: SERVICE MIGRATION — 8 CORE PRACTICES
    # =========================================================================
    slide9 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide9)
    add_header(slide9, "Service Migration — 8 Core Practice Areas")
    add_footer(slide9, 9)

    services_list = [
        ("1. IT Strategy & Implementation", "/services/it-strategy-implementation", "Enterprise IT strategy, legacy modernization, cloud roadmaps, telemetry."),
        ("2. Digital Marketing & Brand", "/services/digital-marketing-brand-development", "B2B digital marketing, high-intent pipelines, brand authority engines."),
        ("3. Web & Application Dev", "/services/web-app-development", "Sub-second Next.js web applications, SaaS portals, microservices."),
        ("4. Risk, Compliance & Governance", "/services/risk-compliance-governance", "DPDP India compliance, ISO 27001, SOC-2 readiness, data protection."),
        ("5. Audit & Improvement", "/services/audit-improvement", "Architecture health checks, system performance audits, code reviews."),
        ("6. Training & Staff Augmentation", "/services/training-staff-augmentation", "Dedicated engineering squads, rapid talent scaling, team upskilling."),
        ("7. SEO Services (AEO)", "/services/seo-services", "Technical SEO, topical authority hubs, AI Search Engine Optimization."),
        ("8. AI Portfolio", "/services/ai-portfolio", "Custom LLM integrations, operational workflow automation, intelligent bots.")
    ]

    for idx, (title, route, desc) in enumerate(services_list):
        r = idx // 4
        c = idx % 4
        left = 0.8 + c * 2.98
        top = 1.8 + r * 2.5
        add_card(slide9, left, top, 2.8, 2.3)
        tb = slide9.shapes.add_textbox(Inches(left + 0.12), Inches(top + 0.12), Inches(2.56), Inches(2.06))
        tf = tb.text_frame
        tf.word_wrap = True
        p_t = tf.paragraphs[0]
        p_t.text = title
        p_t.font.size = Pt(11.5)
        p_t.font.bold = True
        p_t.font.color.rgb = ORANGE
        p_r = tf.add_paragraph()
        p_r.text = route
        p_r.font.size = Pt(8.5)
        p_r.font.bold = True
        p_r.font.color.rgb = GREEN
        p_r.space_before = Pt(2)
        p_d = tf.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(9)
        p_d.font.color.rgb = TEXT_MUTED
        p_d.space_before = Pt(4)

    # =========================================================================
    # SLIDE 10: PRODUCT MIGRATION — 3 FLAGSHIP SAAS PLATFORMS
    # =========================================================================
    slide10 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide10)
    add_header(slide10, "Product Ecosystem Migration — 3 SaaS Platforms")
    add_footer(slide10, 10)

    products_list = [
        ("AstroBeams AI", "astrobeams-ai", "Live Platform", "https://astrobeams.in", "AI-powered astrology & spiritual guidance platform providing cosmic consultations, Kundli analysis, and downloadable PDF reports.", ORANGE),
        ("AstroBeams", "astrobeams", "Live Platform", "https://astrobeams.store", "Next-generation astrology & life guidance platform offering 24/7 live chat and voice call consultations with certified astrologers.", GOLD),
        ("OMNiGRC", "omnigrc", "Live Platform", "https://app.omnigrc.co/", "Unified enterprise SaaS platform for continuous governance, automated compliance audits (DPDP, SOC-2, ISO 27001), and risk monitoring.", GREEN)
    ]

    for idx, (name, slug, badge, url, desc, color) in enumerate(products_list):
        left = 0.8 + idx * 3.98
        add_card(slide10, left, 1.8, 3.8, 5.0, border_color=color)
        tb = slide10.shapes.add_textbox(Inches(left + 0.15), Inches(1.95), Inches(3.5), Inches(4.6))
        tf = tb.text_frame
        tf.word_wrap = True
        p_n = tf.paragraphs[0]
        p_n.text = name
        p_n.font.size = Pt(18)
        p_n.font.bold = True
        p_n.font.color.rgb = WHITE
        
        p_b = tf.add_paragraph()
        p_b.text = f"Status: {badge}"
        p_b.font.size = Pt(11)
        p_b.font.bold = True
        p_b.font.color.rgb = color
        p_b.space_before = Pt(4)

        p_u = tf.add_paragraph()
        p_u.text = f"URL: {url}"
        p_u.font.size = Pt(9.5)
        p_u.font.bold = True
        p_u.font.color.rgb = TEXT_LIGHT
        p_u.space_before = Pt(4)

        p_d = tf.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(10)
        p_d.font.color.rgb = TEXT_MUTED
        p_d.space_before = Pt(10)

        p_r = tf.add_paragraph()
        p_r.text = f"Route: /products/{slug}"
        p_r.font.size = Pt(9.5)
        p_r.font.bold = True
        p_r.font.color.rgb = GOLD
        p_r.space_before = Pt(10)

    # =========================================================================
    # SLIDE 11: INDUSTRIES & WEBSITE NAVIGATION ARCHITECTURE
    # =========================================================================
    slide11 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide11)
    add_header(slide11, "Industry Verticals & Site Navigation Architecture")
    add_footer(slide11, 11)

    # Left: 6 Industry Verticals
    add_card(slide11, 0.8, 1.8, 5.7, 5.0)
    tb_i = slide11.shapes.add_textbox(Inches(1.0), Inches(1.95), Inches(5.3), Inches(4.6))
    tf_i = tb_i.text_frame
    tf_i.word_wrap = True
    p0 = tf_i.paragraphs[0]
    p0.text = "6 Target Industry Verticals (/industries/[slug])"
    p0.font.size = Pt(14)
    p0.font.bold = True
    p0.font.color.rgb = GREEN

    industries = [
        ("Financial Services & FinTech", "High-throughput cloud architecture & banking compliance."),
        ("Healthcare & HealthTech", "HIPAA/DPDP compliant health data portals & telemetry."),
        ("Retail & E-Commerce", "Sub-second Next.js storefronts & omnichannel marketing."),
        ("Manufacturing & Logistics", "Operational workflow automation & legacy IT modernization."),
        ("Enterprise SaaS & IT", "Scalable cloud microservices & ISO 27001 readiness."),
        ("Energy & Utilities", "Enterprise risk governance & telemetry telemetry dashboards.")
    ]
    for ind, d in industries:
        p = tf_i.add_paragraph()
        p.text = f"• {ind}: "
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = WHITE
        p.space_before = Pt(6)
        r = p.add_run()
        r.text = d
        r.font.bold = False
        r.font.color.rgb = TEXT_MUTED

    # Right: Information Hierarchy
    add_card(slide11, 6.833, 1.8, 5.7, 5.0)
    tb_h = slide11.shapes.add_textbox(Inches(7.033), Inches(1.95), Inches(5.3), Inches(4.6))
    tf_h = tb_h.text_frame
    tf_h.word_wrap = True
    p0 = tf_h.paragraphs[0]
    p0.text = "Navigation & Page Hierarchy (50 App Routes)"
    p0.font.size = Pt(14)
    p0.font.bold = True
    p0.font.color.rgb = ORANGE

    hier = [
        ("Header Navigation", "Clean desktop dropdowns for Services, Products, Industries, Case Studies, and Insights."),
        ("Breadcrumb System", "Automated breadcrumbs with Schema.org BreadcrumbList JSON-LD integration."),
        ("Static Mobile Footer", "100% static HTML layout with Gurgaon HQ & Dubai Hub addresses (flicker-free)."),
        ("Legal Pages Suite", "/privacy-policy, /terms-and-conditions, /refund-policy, and /security-dpdp.")
    ]
    for h_t, h_d in hier:
        p = tf_h.add_paragraph()
        p.text = f"• {h_t}: "
        p.font.size = Pt(10.5)
        p.font.bold = True
        p.font.color.rgb = WHITE
        p.space_before = Pt(10)
        r = p.add_run()
        r.text = h_d
        r.font.size = Pt(9.5)
        r.font.bold = False
        r.font.color.rgb = TEXT_MUTED

    # =========================================================================
    # SLIDE 12: URL & REDIRECT MIGRATION ENGINE
    # =========================================================================
    slide12 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide12)
    add_header(slide12, "URL & Redirect Migration Strategy")
    add_footer(slide12, 12)

    # 2 Cards for URL Handling
    add_card(slide12, 0.8, 1.8, 5.7, 5.0)
    tb_l = slide12.shapes.add_textbox(Inches(1.0), Inches(1.95), Inches(5.3), Inches(4.6))
    tf_l = tb_l.text_frame
    tf_l.word_wrap = True
    p0 = tf_l.paragraphs[0]
    p0.text = "Internal Link Rewriting Engine (107 Links)"
    p0.font.size = Pt(14)
    p0.font.bold = True
    p0.font.color.rgb = ORANGE

    rw_info = [
        ("Script Executed", "scripts/rewrite-internal-links.ts"),
        ("Total Internal Links Processed", "107 links found across post HTML bodies"),
        ("Domain Sanitization", "Converted legacy blog.aravinnovations.com/wp-content/uploads/ links to clean relative asset paths"),
        ("Blog Slug Normalization", "Mapped old blog links to /insights/{slug}"),
        ("Service Link Mapping", "Mapped legacy service links to /services/{canonical-slug}")
    ]
    for label, val in rw_info:
        p = tf_l.add_paragraph()
        p.text = f"• {label}: "
        p.font.size = Pt(10.5)
        p.font.bold = True
        p.font.color.rgb = WHITE
        p.space_before = Pt(8)
        r = p.add_run()
        r.text = val
        r.font.bold = False
        r.font.color.rgb = GOLD

    add_card(slide12, 6.833, 1.8, 5.7, 5.0)
    tb_r = slide12.shapes.add_textbox(Inches(7.033), Inches(1.95), Inches(5.3), Inches(4.6))
    tf_r = tb_r.text_frame
    tf_r.word_wrap = True
    p0 = tf_r.paragraphs[0]
    p0.text = "Legacy URL Redirects & Canonical Aliases"
    p0.font.size = Pt(14)
    p0.font.bold = True
    p0.font.color.rgb = GREEN

    reds = [
        ("/blog & /blogs", "301 Redirect via app/[locale]/blog/page.tsx to /insights"),
        ("/itstrategy", "Alias Route rendering IT strategy page with canonical tag to /services/it-strategy-implementation"),
        ("/digitalmarketing", "Alias Route rendering Digital Marketing page with canonical tag to /services/digital-marketing-brand-development"),
        ("/webdevelopment", "Alias Route rendering Web Dev page with canonical tag to /services/web-app-development"),
        ("/riskandgovernance", "Alias Route rendering GRC page with canonical tag to /services/risk-compliance-governance"),
        ("/seo & /audit", "Alias Routes rendering SEO & Audit pages with canonical tags to /services/*")
    ]
    for old_u, target_u in reds:
        p = tf_r.add_paragraph()
        p.text = f"• {old_u} → "
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = WHITE
        p.space_before = Pt(6)
        r = p.add_run()
        r.text = target_u
        r.font.size = Pt(9.5)
        r.font.bold = False
        r.font.color.rgb = TEXT_MUTED

    # =========================================================================
    # SLIDE 13: MEDIA & ASSET MIGRATION STRATEGY
    # =========================================================================
    slide13 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide13)
    add_header(slide13, "Media & Asset Migration Architecture")
    add_footer(slide13, 13)

    # 3 Stat Cards for Media
    m_stats = [
        ("174 Items", "WordPress Media Attachments", "Audited attachment URLs from WP XML export.", ORANGE),
        ("137 Files", "Public Assets Directory", "123.32 MB optimized web assets in public/.", GREEN),
        ("52 Images / 3 Videos", "Raw Source Assets", "91.29 MB images and 5.34 MB source video files.", GOLD)
    ]
    for idx, (num, label, desc, color) in enumerate(m_stats):
        left = 0.8 + idx * 3.98
        add_card(slide13, left, 1.8, 3.8, 1.8, border_color=color)
        tb = slide13.shapes.add_textbox(Inches(left + 0.15), Inches(1.9), Inches(3.5), Inches(1.5))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = num
        p.font.size = Pt(20)
        p.font.bold = True
        p.font.color.rgb = color
        p2 = tf.add_paragraph()
        p2.text = label
        p2.font.size = Pt(11)
        p2.font.bold = True
        p2.font.color.rgb = WHITE
        p3 = tf.add_paragraph()
        p3.text = desc
        p3.font.size = Pt(9)
        p3.font.color.rgb = TEXT_MUTED

    # Bottom Media Strategy Card
    add_card(slide13, 0.8, 3.8, 11.733, 3.0)
    tb_m = slide13.shapes.add_textbox(Inches(1.0), Inches(3.95), Inches(11.333), Inches(2.7))
    tf_m = tb_m.text_frame
    tf_m.word_wrap = True
    p0 = tf_m.paragraphs[0]
    p0.text = "Media Optimization & Delivery Rules:"
    p0.font.size = Pt(14)
    p0.font.bold = True
    p0.font.color.rgb = GREEN

    m_rules = [
        "Remote Patterns Configuration: Configured next.config.ts remotePatterns for blog.aravinnovations.com, aravinnovations.com, *.public.blob.vercel-storage.com, and images.unsplash.com.",
        "Automatic AVIF / WebP Conversion: Next.js next/image pipeline automatically serves AVIF and WebP formats with quality levels 75 and 95.",
        "Homepage Hero Video Protection: Background video /videos/Create_a_premium_minimalist_ci.mp4 initialized lazily with muted HTML5 playback and low-priority network loading to prevent mobile LCP contention."
    ]
    for r in m_rules:
        p = tf_m.add_paragraph()
        p.text = f"• {r}"
        p.font.size = Pt(10.5)
        p.font.color.rgb = TEXT_LIGHT
        p.space_before = Pt(8)

    # =========================================================================
    # SLIDE 14: TECHNICAL SEO MIGRATION & SCHEMAS
    # =========================================================================
    slide14 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide14)
    add_header(slide14, "Technical SEO & Structured Data Architecture")
    add_footer(slide14, 14)

    # Left: JSON-LD Schemas
    add_card(slide14, 0.8, 1.8, 5.7, 5.0)
    tb_l = slide14.shapes.add_textbox(Inches(1.0), Inches(1.95), Inches(5.3), Inches(4.6))
    tf_l = tb_l.text_frame
    tf_l.word_wrap = True
    p0 = tf_l.paragraphs[0]
    p0.text = "Structured Data JSON-LD Schemas (lib/seo.ts)"
    p0.font.size = Pt(14)
    p0.font.bold = True
    p0.font.color.rgb = GREEN

    schemas = [
        ("Organization Schema", "Includes official brand name, logo, social links (LinkedIn, Facebook, X, Instagram, YouTube, WhatsApp)."),
        ("LocalBusiness (India HQ)", "Platinum Floor, 14/23, Ardee City, Sector 52, Gurgaon, Haryana 122002 (+91-9650625777)."),
        ("LocalBusiness (UAE Hub)", "Dubai Silicon Oasis, Dubai, United Arab Emirates (+971-521555792)."),
        ("Service & Article Schemas", "Dynamic per-service and per-article schemas generated dynamically for rich snippets.")
    ]
    for s_name, s_detail in schemas:
        p = tf_l.add_paragraph()
        p.text = f"• {s_name}: "
        p.font.size = Pt(10.5)
        p.font.bold = True
        p.font.color.rgb = WHITE
        p.space_before = Pt(8)
        r = p.add_run()
        r.text = s_detail
        r.font.size = Pt(9.5)
        r.font.color.rgb = TEXT_MUTED

    # Right: Dynamic Crawl Endpoints
    add_card(slide14, 6.833, 1.8, 5.7, 5.0)
    tb_r = slide14.shapes.add_textbox(Inches(7.033), Inches(1.95), Inches(5.3), Inches(4.6))
    tf_r = tb_r.text_frame
    tf_r.word_wrap = True
    p0 = tf_r.paragraphs[0]
    p0.text = "Dynamic Crawl & Metadata Endpoints"
    p0.font.size = Pt(14)
    p0.font.bold = True
    p0.font.color.rgb = ORANGE

    seo_end = [
        ("Dynamic XML Sitemap (app/sitemap.ts)", "Generates XML sitemap automatically with priority weights and hreflang alternates (en, hi, ar)."),
        ("Dynamic Robots (app/robots.ts)", "Generates robots.txt allowing all clean pages while blocking /api/ and /admin/ endpoints."),
        ("Canonical Tag Generator", "Outputs absolute canonical URLs (https://aravinnovations.com/...) across every single route."),
        ("Branded 404 Recovery (app/[locale]/not-found.tsx)", "Custom branded error recovery page directing lost visitors back to primary practices.")
    ]
    for e_name, e_detail in seo_end:
        p = tf_r.add_paragraph()
        p.text = f"• {e_name}: "
        p.font.size = Pt(10.5)
        p.font.bold = True
        p.font.color.rgb = WHITE
        p.space_before = Pt(8)
        r = p.add_run()
        r.text = e_detail
        r.font.size = Pt(9.5)
        r.font.color.rgb = TEXT_MUTED

    # =========================================================================
    # SLIDE 15: MULTILINGUAL ARCHITECTURE (i18n)
    # =========================================================================
    slide15 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide15)
    add_header(slide15, "Multilingual Architecture (next-intl)")
    add_footer(slide15, 15)

    add_card(slide15, 0.8, 1.8, 11.733, 5.0)
    tb_i18n = slide15.shapes.add_textbox(Inches(1.0), Inches(1.95), Inches(11.333), Inches(4.6))
    tf_i18n = tb_i18n.text_frame
    tf_i18n.word_wrap = True
    p0 = tf_i18n.paragraphs[0]
    p0.text = "Internationalization Engine & Locale Routing Specifications"
    p0.font.size = Pt(15)
    p0.font.bold = True
    p0.font.color.rgb = GREEN

    i18n_bullets = [
        ("Framework Core", "Powered by next-intl 4.13.7 integrated directly with Next.js 16 App Router."),
        ("Supported Locales", "English (/en - default), Hindi (/hi), and Arabic (/ar)."),
        ("Edge Routing Middleware", "proxy.ts intercepts requests to manage locale prefixes and redirect unlocalized URLs seamlessly."),
        ("Typography & Font Strategy", "Inter & Plus Jakarta Sans for English; Noto Sans Devanagari for Hindi; Noto Sans Arabic for Arabic."),
        ("Text Direction (RTL / LTR)", "Automatic dir='rtl' attribute injection and flex direction flipping for Arabic locale views."),
        ("Dictionary Management", "Structured translation dictionaries in messages/en.json, messages/hi.json, and messages/ar.json.")
    ]
    for label, val in i18n_bullets:
        p = tf_i18n.add_paragraph()
        p.text = f"• {label}: "
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = WHITE
        p.space_before = Pt(10)
        r = p.add_run()
        r.text = val
        r.font.size = Pt(10.5)
        r.font.color.rgb = TEXT_MUTED

    # =========================================================================
    # SLIDE 16: ADMIN PANEL & CMS CONTROL CENTER
    # =========================================================================
    slide16 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide16)
    add_header(slide16, "Admin Panel & CMS Control Center")
    add_footer(slide16, 16)

    # 3 Column Cards for Admin Routes
    adm_cards = [
        ("/admin/login", "Authentication Gateway", "Protected login portal verifying admin cookie token state prior to granting dashboard access.", ORANGE),
        ("/admin", "Leads & Submissions Center", "Interactive dashboard to view, filter, update status, and export contact form and chatbot inquiries.", GREEN),
        ("/admin/seo", "Dedicated SEO Override Center", "Per-page audit panel allowing live overrides of meta titles, descriptions, canonicals, and JSON-LD schemas.", GOLD)
    ]
    for idx, (route, title, desc, color) in enumerate(adm_cards):
        left = 0.8 + idx * 3.98
        add_card(slide16, left, 1.8, 3.8, 5.0, border_color=color)
        tb = slide16.shapes.add_textbox(Inches(left + 0.15), Inches(1.95), Inches(3.5), Inches(4.6))
        tf = tb.text_frame
        tf.word_wrap = True
        p_r = tf.paragraphs[0]
        p_r.text = route
        p_r.font.size = Pt(14)
        p_r.font.bold = True
        p_r.font.color.rgb = color
        p_t = tf.add_paragraph()
        p_t.text = title
        p_t.font.size = Pt(12)
        p_t.font.bold = True
        p_t.font.color.rgb = WHITE
        p_t.space_before = Pt(4)
        p_d = tf.add_paragraph()
        p_d.text = desc
        p_d.font.size = Pt(10)
        p_d.font.color.rgb = TEXT_MUTED
        p_d.space_before = Pt(10)

    # =========================================================================
    # SLIDE 17: CONTACT FORM & LEAD SYSTEM PIPELINE
    # =========================================================================
    slide17 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide17)
    add_header(slide17, "Contact Form & Lead Intake Pipeline")
    add_footer(slide17, 17)

    add_card(slide17, 0.8, 1.8, 11.733, 5.0)
    tb_lead = slide17.shapes.add_textbox(Inches(1.0), Inches(1.95), Inches(11.333), Inches(4.6))
    tf_lead = tb_lead.text_frame
    tf_lead.word_wrap = True

    p0 = tf_lead.paragraphs[0]
    p0.text = "End-to-End Lead Processing Architecture"
    p0.font.size = Pt(15)
    p0.font.bold = True
    p0.font.color.rgb = ORANGE

    pipeline_steps = [
        ("Step 1: User Submission", "User fills ContactForm.tsx or submits lead via ClientChatbot.tsx."),
        ("Step 2: Zod Schema Validation", "Client and server validate inputs using Zod 3.25 schema validation rules."),
        ("Step 3: API Route Handler", "Post request routed to /api/contact or /api/lead serverless endpoint."),
        ("Step 4: Persistence Storage", "Inquiry saved to data/submissions.json or Vercel Blob storage with unique ID & timestamp."),
        ("Step 5: Admin Visibility", "Inquiry immediately becomes visible in the /admin dashboard for team review."),
        ("Step 6: Team Alert Email", "Nodemailer / Resend API sends instant notification email to Info@aravinnovations.com."),
        ("Step 7: User Confirmation", "System dispatches automated branded confirmation email to the user.")
    ]
    for step_title, step_desc in pipeline_steps:
        p = tf_lead.add_paragraph()
        p.text = f"• {step_title}: "
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = WHITE
        p.space_before = Pt(6)
        r = p.add_run()
        r.text = step_desc
        r.font.size = Pt(10)
        r.font.color.rgb = TEXT_MUTED

    # =========================================================================
    # SLIDE 18: AI CHATBOT & VOICE FEATURES
    # =========================================================================
    slide18 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide18)
    add_header(slide18, "AI Chatbot & Voice Capabilities")
    add_footer(slide18, 18)

    # 2 Cards for Chatbot
    add_card(slide18, 0.8, 1.8, 5.7, 5.0)
    tb_cb1 = slide18.shapes.add_textbox(Inches(1.0), Inches(1.95), Inches(5.3), Inches(4.6))
    tf_cb1 = tb_cb1.text_frame
    tf_cb1.word_wrap = True
    p0 = tf_cb1.paragraphs[0]
    p0.text = "Chatbot Architecture (ClientChatbot.tsx)"
    p0.font.size = Pt(14)
    p0.font.bold = True
    p0.font.color.rgb = GREEN

    cb_arch = [
        ("Knowledge Engine", "Powered by data/chatbot-knowledge.ts (66.8 KB structured knowledge base)."),
        ("Knowledge Coverage", "Covers all 8 services, 3 products, company credentials, case studies, pricing, and contact pathways."),
        ("Lead Generation", "Intelligently prompts for user email/phone during high-intent advisory conversations."),
        ("API Handler", "Processes queries via /api/chat endpoint with context retention.")
    ]
    for label, val in cb_arch:
        p = tf_cb1.add_paragraph()
        p.text = f"• {label}: "
        p.font.size = Pt(10.5)
        p.font.bold = True
        p.font.color.rgb = WHITE
        p.space_before = Pt(8)
        r = p.add_run()
        r.text = val
        r.font.size = Pt(9.5)
        r.font.color.rgb = TEXT_MUTED

    add_card(slide18, 6.833, 1.8, 5.7, 5.0)
    tb_cb2 = slide18.shapes.add_textbox(Inches(7.033), Inches(1.95), Inches(5.3), Inches(4.6))
    tf_cb2 = tb_cb2.text_frame
    tf_cb2.word_wrap = True
    p0 = tf_cb2.paragraphs[0]
    p0.text = "Web Speech API Voice Integration"
    p0.font.size = Pt(14)
    p0.font.bold = True
    p0.font.color.rgb = ORANGE

    cb_voice = [
        ("Voice Input (SpeechRecognition)", "Browser-native SpeechRecognition / webkitSpeechRecognition allows hands-free voice query input."),
        ("Read Aloud (SpeechSynthesis)", "Web Speech API SpeechSynthesis vocalizes chatbot responses for enhanced accessibility."),
        ("Admin Inquiry Storage", "Chatbot lead captures are logged directly into the admin inquiry pipeline for immediate sales follow-up.")
    ]
    for label, val in cb_voice:
        p = tf_cb2.add_paragraph()
        p.text = f"• {label}: "
        p.font.size = Pt(10.5)
        p.font.bold = True
        p.font.color.rgb = WHITE
        p.space_before = Pt(8)
        r = p.add_run()
        r.text = val
        r.font.size = Pt(9.5)
        r.font.color.rgb = TEXT_MUTED

    # =========================================================================
    # SLIDE 19: SECURITY, COMPLIANCE & DATA HANDLING
    # =========================================================================
    slide19 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide19)
    add_header(slide19, "Security Architecture & Data Protection")
    add_footer(slide19, 19)

    add_card(slide19, 0.8, 1.8, 11.733, 5.0)
    tb_sec = slide19.shapes.add_textbox(Inches(1.0), Inches(1.95), Inches(11.333), Inches(4.6))
    tf_sec = tb_sec.text_frame
    tf_sec.word_wrap = True

    p0 = tf_sec.paragraphs[0]
    p0.text = "Security Controls & Compliance Mechanisms"
    p0.font.size = Pt(15)
    p0.font.bold = True
    p0.font.color.rgb = GREEN

    sec_items = [
        ("Admin Protection", "Cookie token state & hardcoded credential guard in lib/site-config.ts preventing unauthorized access."),
        ("HTML Content Sanitization", "isomorphic-dompurify in lib/html-sanitizer.ts strips dangerous scripts and XSS vectors from migrated WP content."),
        ("HTTP Security Headers", "next.config.ts configures X-Frame-Options: SAMEORIGIN, X-Content-Type-Options: nosniff, Referrer-Policy, and CSP Report-Only."),
        ("Privacy & Data Protection", "Full alignment with DPDP Act (India) and UAE data protection governance across all form handlers."),
        ("Secrets Isolation", "Environment variables (.env.local) isolate sensitive keys (RESEND_API_KEY, BLOB_READ_WRITE_TOKEN) out of client bundles.")
    ]
    for label, val in sec_items:
        p = tf_sec.add_paragraph()
        p.text = f"• {label}: "
        p.font.size = Pt(11)
        p.font.bold = True
        p.font.color.rgb = WHITE
        p.space_before = Pt(10)
        r = p.add_run()
        r.text = val
        r.font.size = Pt(10)
        r.font.color.rgb = TEXT_MUTED

    # =========================================================================
    # SLIDE 20: PERFORMANCE & RESPONSIVE OPTIMIZATION
    # =========================================================================
    slide20 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide20)
    add_header(slide20, "Performance & Responsive Optimization")
    add_footer(slide20, 20)

    # Top Stats
    perf_stats = [
        ("597 Pages", "Static Build Pass", "All 597 static pages pre-rendered.", ORANGE),
        ("76 – 85+", "Mobile PageSpeed", "Sub-second LCP & zero CLS shifts.", GREEN),
        ("95 – 100", "Desktop PageSpeed", "Ultra-fast execution on edge network.", GOLD),
        ("100", "SEO & Best Practices", "100/100 Lighthouse audit scores.", YELLOW)
    ]
    for idx, (num, label, desc, color) in enumerate(perf_stats):
        left = 0.8 + idx * 2.98
        add_card(slide20, left, 1.8, 2.8, 1.8, border_color=color)
        tb = slide20.shapes.add_textbox(Inches(left + 0.12), Inches(1.9), Inches(2.56), Inches(1.5))
        tf = tb.text_frame
        tf.word_wrap = True
        p = tf.paragraphs[0]
        p.text = num
        p.font.size = Pt(20)
        p.font.bold = True
        p.font.color.rgb = color
        p2 = tf.add_paragraph()
        p2.text = label
        p2.font.size = Pt(10.5)
        p2.font.bold = True
        p2.font.color.rgb = WHITE
        p3 = tf.add_paragraph()
        p3.text = desc
        p3.font.size = Pt(8.5)
        p3.font.color.rgb = TEXT_MUTED

    # Bottom Responsive Layout Card
    add_card(slide20, 0.8, 3.8, 11.733, 3.0)
    tb_resp = slide20.shapes.add_textbox(Inches(1.0), Inches(3.95), Inches(11.333), Inches(2.7))
    tf_resp = tb_resp.text_frame
    tf_resp.word_wrap = True

    p0 = tf_resp.paragraphs[0]
    p0.text = "Viewport & Layout Stability Rules:"
    p0.font.size = Pt(14)
    p0.font.bold = True
    p0.font.color.rgb = GREEN

    r_items = [
        "Mobile (360px - 430px): Rendered static HTML footer (Footer.tsx) without scroll-jacking or 100vh height locks to eliminate viewport scroll flicker.",
        "Desktop (1440px+): Interactive 3D service stack carousel (InteractiveServiceStack3D.tsx) and background hero video.",
        "Developer Testing Isolation: Dedicated dev-mobile route (/dev-mobile) implemented for mobile testing isolation."
    ]
    for r in r_items:
        p = tf_resp.add_paragraph()
        p.text = f"• {r}"
        p.font.size = Pt(10.5)
        p.font.color.rgb = TEXT_LIGHT
        p.space_before = Pt(8)

    # =========================================================================
    # SLIDE 21: TESTING, VALIDATION & MIGRATION SCRIPTS
    # =========================================================================
    slide21 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide21)
    add_header(slide21, "Testing, Validation & Migration Scripts")
    add_footer(slide21, 21)

    add_card(slide21, 0.8, 1.8, 11.733, 5.0)
    tb_scr = slide21.shapes.add_textbox(Inches(1.0), Inches(1.95), Inches(11.333), Inches(4.6))
    tf_scr = tb_scr.text_frame
    tf_scr.word_wrap = True

    p0 = tf_scr.paragraphs[0]
    p0.text = "12 Migration & Quality Assurance Scripts (scripts/)"
    p0.font.size = Pt(15)
    p0.font.bold = True
    p0.font.color.rgb = ORANGE

    scripts_info = [
        ("parse-wp-xml.ts", "Parses WordPress XML export and generates data/wordpress-posts.ts."),
        ("rewrite-internal-links.ts", "Rewrites 107 legacy links across post HTML bodies to new internal routes."),
        ("url-migration-analysis.ts", "Analyzes old vs new URL mapping and link categories."),
        ("check-slug-conflicts.ts", "Verifies zero duplicate slugs across blog, service, and product routes."),
        ("final-content-audit.ts", "Audits final content integrity across static data engines."),
        ("final-production-qa.ts", "Comprehensive pre-deployment quality assurance checks."),
        ("verify-links.ts", "Validates sitewide navigation and footer links."),
        ("scratch/discovery-audit.ts", "Deep discovery script generated for this evidence report.")
    ]
    for s_file, s_desc in scripts_info:
        p = tf_scr.add_paragraph()
        p.text = f"• {s_file}: "
        p.font.size = Pt(10.5)
        p.font.bold = True
        p.font.color.rgb = WHITE
        p.space_before = Pt(5)
        r = p.add_run()
        r.text = s_desc
        r.font.size = Pt(10)
        r.font.color.rgb = TEXT_MUTED

    # =========================================================================
    # SLIDE 22: CURRENT STATUS, PENDING ITEMS & GO-LIVE CHECKLIST
    # =========================================================================
    slide22 = prs.slides.add_slide(blank_layout)
    set_slide_background(slide22)
    add_header(slide22, "Migration Status & Go-Live Checklist")
    add_footer(slide22, 22)

    # Left: Confirmed Completed
    add_card(slide22, 0.8, 1.8, 5.7, 5.0, border_color=GREEN)
    tb_c = slide22.shapes.add_textbox(Inches(1.0), Inches(1.95), Inches(5.3), Inches(4.6))
    tf_c = tb_c.text_frame
    tf_c.word_wrap = True
    p0 = tf_c.paragraphs[0]
    p0.text = "CONFIRMED — 100% Completed"
    p0.font.size = Pt(14)
    p0.font.bold = True
    p0.font.color.rgb = GREEN

    conf_items = [
        "55/55 WordPress Articles Migrated",
        "174 Media Attachments Preserved",
        "8 Core Practice Pages Active",
        "3 SaaS Products Integrated (AstroBeams AI, Store, OMNiGRC)",
        "6 Industry Vertical Pages Active",
        "597 Static Pages Build Pass (npm run build)",
        "Multilingual i18n Engine (en, hi, ar)",
        "AI Voice Chatbot & KB System Active",
        "Admin Submission & SEO Center Active"
    ]
    for ci in conf_items:
        p = tf_c.add_paragraph()
        p.text = f"✓ {ci}"
        p.font.size = Pt(10)
        p.font.bold = True
        p.font.color.rgb = WHITE
        p.space_before = Pt(4)

    # Right: Pending Stakeholder Action
    add_card(slide22, 6.833, 1.8, 5.7, 5.0, border_color=GOLD)
    tb_p = slide22.shapes.add_textbox(Inches(7.033), Inches(1.95), Inches(5.3), Inches(4.6))
    tf_p = tb_p.text_frame
    tf_p.word_wrap = True
    p0 = tf_p.paragraphs[0]
    p0.text = "PENDING STAKEHOLDER ACTION"
    p0.font.size = Pt(14)
    p0.font.bold = True
    p0.font.color.rgb = GOLD

    pend_items = [
        ("DNS Zone Cutover Access", "Access to Cloudflare/DNS registrar for aravinnovations.com to point CNAME/A records to Vercel production IP (76.76.21.21)."),
        ("Production Vercel Account", "Confirmation of official Vercel team workspace to transfer project ownership from temporary deployment."),
        ("Resend Domain Verification", "Configuration of SPF/DKIM DNS records for aravinnovations.com on Resend for official email delivery.")
    ]
    for p_title, p_desc in pend_items:
        p = tf_p.add_paragraph()
        p.text = f"⏳ {p_title}:"
        p.font.size = Pt(10.5)
        p.font.bold = True
        p.font.color.rgb = WHITE
        p.space_before = Pt(8)
        r = p.add_run()
        r.text = f" {p_desc}"
        r.font.size = Pt(9.5)
        r.font.color.rgb = TEXT_MUTED

    # Save presentation
    output_path = os.path.join(os.getcwd(), "Arav_Innovations_Website_Migration_&_Deployment.pptx")
    prs.save(output_path)
    print(f"Successfully generated presentation: {output_path}")

if __name__ == "__main__":
    create_presentation()
