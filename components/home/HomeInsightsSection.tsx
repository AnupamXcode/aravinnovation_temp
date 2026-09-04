"use client";

import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { BlogPost } from "@/data/insights";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Calendar, Tag, BookOpen } from "lucide-react";
import { ScrollReveal } from "@/components/motion/ScrollReveal";

import { BlogCardImage } from "@/components/insights/BlogCardImage";

interface HomeInsightsSectionProps {
  posts: BlogPost[];
}

export function HomeInsightsSection({ posts }: HomeInsightsSectionProps) {
  const displayPosts = posts.slice(0, 3);

  if (!displayPosts || displayPosts.length === 0) {
    return null;
  }

  return (
    <section className="w-full py-12 sm:py-16 md:py-24 px-4 sm:px-8 lg:px-12 xl:px-16" id="insights">
      <div className="max-w-7xl mx-auto rounded-[2.5rem] bg-[#fefaf5] dark:bg-[#0a0a0a] border border-[#f7d7b0] dark:border-[#1a1a1a] p-6 sm:p-10 lg:p-12 shadow-2xl transition-colors duration-300 relative overflow-hidden">
        {/* Subtle Brand Accent Header Line */}
        <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-[#f15e1c] via-[#2e936f] to-[#fab60a]" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-12 gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <Badge variant="secondary" size="md">
              KNOWLEDGE &amp; INSIGHTS
            </Badge>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black font-display text-[#1b2823] dark:text-[#ffffff] tracking-tight leading-tight">
              Strategic Perspectives on Technology &amp; Engineering
            </h2>
            <p className="text-base sm:text-lg text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed font-medium">
              Explore operational frameworks, IT strategy checklists, AI automation insights, and compliance guides published by our engineering leads.
            </p>
          </div>

          <Link
            href="/insights"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#f15e1c] hover:bg-[#d8480d] text-white text-sm font-extrabold font-display transition-all shadow-md hover:shadow-xl shrink-0 min-h-[44px]"
          >
            <span>Explore All Insights</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {/* 3-Column Responsive Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-stretch relative z-10">
          {displayPosts.map((post, idx) => (
            <ScrollReveal key={post.slug} direction="up" delay={idx * 0.1} className="h-full">
              <div className="h-full rounded-3xl bg-white dark:bg-[#16221d] border border-[#f7d7b0] dark:border-[#2a3c35] hover:border-[#f15e1c] transition-all duration-300 shadow-md hover:shadow-2xl hover:-translate-y-1 flex flex-col justify-between group overflow-hidden">
                {/* Visual Header / Cover Image */}
                <div className="relative w-full overflow-hidden border-b border-[#f7d7b0]/60 dark:border-[#2a3c35]">
                  <BlogCardImage post={post} aspectRatio="aspect-video" />

                  {/* Category Pill Overlay */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold bg-white/90 dark:bg-[#0a0a0a]/90 text-[#f15e1c] border border-[#f7d7b0] dark:border-[#262626] backdrop-blur-md shadow-xs">
                      <Tag className="w-3 h-3 text-[#f15e1c]" />
                      <span>{post.category}</span>
                    </span>
                  </div>
                </div>

                {/* Card Content Body */}
                <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    {/* Publication Date */}
                    <div className="flex items-center gap-2 text-xs font-mono font-semibold text-[#4a5c55] dark:text-[#d3eee4]">
                      <Calendar className="w-3.5 h-3.5 text-[#2e936f]" />
                      <span>{post.dateFormatted || post.publishedAt}</span>
                      <span>&bull;</span>
                      <span>{post.readTime || "5 min read"}</span>
                    </div>

                    {/* Article Title */}
                    <h3 className="text-lg sm:text-xl font-bold font-display text-[#1b2823] dark:text-[#ffffff] group-hover:text-[#f15e1c] transition-colors leading-snug line-clamp-2">
                      {post.title}
                    </h3>

                    {/* Excerpt Summary */}
                    <p className="text-sm text-[#4a5c55] dark:text-[#d3eee4] leading-relaxed line-clamp-3 font-medium">
                      {post.summary}
                    </p>
                  </div>

                  {/* Card Read Article CTA */}
                  <div className="pt-4 border-t border-[#f7d7b0]/50 dark:border-[#2a3c35]">
                    <Link
                      href={`/insights/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-extrabold font-display text-[#f15e1c] group-hover:text-[#d8480d] transition-colors cursor-pointer"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
