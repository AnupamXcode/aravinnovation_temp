"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { BlogPost } from "@/data/insights";
import { filterAndSortBlogs, SortOrder } from "@/lib/blog-utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TiltCard } from "@/components/motion/TiltCard";
import { ScrollReveal } from "@/components/motion/ScrollReveal";
import { ArrowRight, Clock, Sparkles, Filter, ArrowUpDown, ChevronDown } from "lucide-react";

interface InsightsFilterClientProps {
  initialPosts: BlogPost[];
  categories: string[];
}

export function InsightsFilterClient({ initialPosts, categories }: InsightsFilterClientProps) {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<SortOrder>("latest");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  // Filter and sort articles dynamically
  const filteredArticles = useMemo(() => {
    return filterAndSortBlogs(initialPosts, activeCategory, sortBy);
  }, [initialPosts, activeCategory, sortBy]);

  // Featured article is shown at top when showing all articles and sorting by latest
  const showFeatured = activeCategory === "all" && sortBy === "latest" && filteredArticles.length > 0;
  const featuredArticle = showFeatured ? filteredArticles[0] : null;
  const gridArticles = showFeatured ? filteredArticles.slice(1) : filteredArticles;

  return (
    <div className="space-y-12 w-full">
      {/* Category Filter & Sorting Bar */}
      <div className="w-full bg-[#FBF3EA]/80 dark:bg-[#161310]/80 backdrop-blur-md rounded-3xl p-4 sm:p-6 border border-[#EFE2D6] dark:border-[#2C241E] shadow-sm sticky top-20 z-30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Desktop Category Pills */}
          <div className="hidden md:flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-[#7A6A5F] dark:text-[#B8ACA0] mr-2">
              Practices:
            </span>
            <button
              onClick={() => setActiveCategory("all")}
              className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === "all"
                  ? "bg-[#f15e1c] text-white shadow-md shadow-[#f15e1c]/30 scale-105"
                  : "bg-white dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE] border border-[#EFE2D6] dark:border-[#2C241E] hover:border-[#f15e1c]/40"
              }`}
            >
              All Articles ({initialPosts.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`min-h-[44px] px-4 py-2 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  activeCategory.toLowerCase() === cat.toLowerCase()
                    ? "bg-[#f15e1c] text-white shadow-md shadow-[#f15e1c]/30 scale-105"
                    : "bg-white dark:bg-[#1A1613] text-[#3A2E27] dark:text-[#FAF5EE] border border-[#EFE2D6] dark:border-[#2C241E] hover:border-[#f15e1c]/40"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Mobile Category Dropdown */}
          <div className="md:hidden flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 w-full">
            <div className="relative w-full">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-full min-h-[44px] px-4 py-2.5 rounded-2xl bg-white dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE] flex items-center justify-between shadow-sm cursor-pointer"
              >
                <span className="flex items-center gap-2">
                  <Filter className="w-3.5 h-3.5 text-[#f15e1c]" />
                  <span>
                    Category: {activeCategory === "all" ? "All Articles" : activeCategory}
                  </span>
                </span>
                <ChevronDown className={`w-4 h-4 text-[#7A6A5F] transition-transform ${mobileMenuOpen ? "rotate-180" : ""}`} />
              </button>

              <AnimatePresence>
                {mobileMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] rounded-2xl shadow-xl z-50 overflow-hidden max-h-64 overflow-y-auto"
                  >
                    <button
                      onClick={() => {
                        setActiveCategory("all");
                        setMobileMenuOpen(false);
                      }}
                      className={`w-full min-h-[44px] text-left px-4 py-3 text-xs font-semibold transition-colors border-b border-[#EFE2D6]/50 dark:border-[#2C241E]/50 ${
                        activeCategory === "all"
                          ? "bg-[#f15e1c]/10 text-[#f15e1c]"
                          : "text-[#3A2E27] dark:text-[#FAF5EE] hover:bg-[#FBF3EA] dark:hover:bg-[#261F1A]"
                      }`}
                    >
                      All Articles ({initialPosts.length})
                    </button>
                    {categories.map((cat) => (
                      <button
                        key={cat}
                        onClick={() => {
                          setActiveCategory(cat);
                          setMobileMenuOpen(false);
                        }}
                        className={`w-full min-h-[44px] text-left px-4 py-3 text-xs font-semibold transition-colors border-b border-[#EFE2D6]/50 dark:border-[#2C241E]/50 last:border-0 ${
                          activeCategory.toLowerCase() === cat.toLowerCase()
                            ? "bg-[#f15e1c]/10 text-[#f15e1c]"
                            : "text-[#3A2E27] dark:text-[#FAF5EE] hover:bg-[#FBF3EA] dark:hover:bg-[#261F1A]"
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Sort Controls */}
          <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
            <ArrowUpDown className="w-3.5 h-3.5 text-[#f15e1c]" />
            <span className="text-xs font-bold text-[#7A6A5F] dark:text-[#B8ACA0]">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOrder)}
              className="min-h-[44px] px-3.5 py-2.5 rounded-2xl bg-white dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] text-xs font-semibold text-[#3A2E27] dark:text-[#FAF5EE] cursor-pointer shadow-xs focus:outline-none focus:ring-2 focus:ring-[#f15e1c]/50"
            >
              <option value="latest">Latest First</option>
              <option value="oldest">Oldest First</option>
              <option value="most-read">Read Time</option>
            </select>
          </div>

        </div>
      </div>

      {/* Featured Article Section */}
      {featuredArticle && (
        <ScrollReveal direction="up">
          <div className="p-8 sm:p-12 rounded-3xl bg-[#FBF3EA] dark:bg-[#161310] border border-[#EFE2D6] dark:border-[#2C241E] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-xl">
            <div className="lg:col-span-8 space-y-4">
              <div className="flex items-center gap-3">
                <Badge variant="primary" size="sm">
                  Featured Insight
                </Badge>
                <span className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5 text-[#f15e1c]" /> {featuredArticle.readTime}
                </span>
                <span className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0]">
                  &bull; {featuredArticle.dateFormatted}
                </span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE]">
                <Link
                  href={`/insights/${featuredArticle.slug}`}
                  className="hover:text-[#f15e1c] transition-colors"
                >
                  {featuredArticle.title}
                </Link>
              </h2>
              <p className="text-sm text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed">
                {featuredArticle.summary}
              </p>
              <div className="pt-3">
                <Link href={`/insights/${featuredArticle.slug}`}>
                  <Button
                    variant="primary"
                    size="md"
                    className="min-h-[44px]"
                    rightIcon={<ArrowRight className="w-4 h-4" />}
                  >
                    Read Full Deep-Dive
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 p-6 rounded-2xl bg-white dark:bg-[#1A1613] border border-[#EFE2D6] dark:border-[#2C241E] space-y-3 shadow-xs">
              <span className="text-xs font-bold uppercase tracking-wider text-[#3A2E27] dark:text-[#FAF5EE] block">
                Key Takeaways
              </span>
              <ul className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] space-y-2.5">
                {featuredArticle.keyTakeaways.slice(0, 3).map((takeaway, tIdx) => (
                  <li key={tIdx} className="flex items-start gap-2">
                    <span className="text-[#f15e1c] font-bold">&bull;</span>
                    <span>{takeaway}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollReveal>
      )}

      {/* Grid Header & Results Count */}
      <div className="flex items-center justify-between border-b border-[#EFE2D6] dark:border-[#2C241E] pb-3">
        <h3 className="text-sm font-bold text-[#3A2E27] dark:text-[#FAF5EE] uppercase tracking-wider">
          {activeCategory === "all" ? "All Articles" : activeCategory} ({gridArticles.length})
        </h3>
        {activeCategory !== "all" && (
          <button
            onClick={() => setActiveCategory("all")}
            className="text-xs text-[#f15e1c] hover:underline font-semibold cursor-pointer"
          >
            Show All
          </button>
        )}
      </div>

      {/* Articles Grid */}
      {gridArticles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {gridArticles.map((art, idx) => (
            <ScrollReveal key={art.slug} delay={Math.min(idx * 0.05, 0.3)} direction="up" className="h-full">
              <TiltCard maxTilt={4} scale={1.01} className="h-full">
                <div className="h-full p-6 sm:p-7 rounded-3xl bg-white dark:bg-[#171411] border border-[#EFE2D6] dark:border-[#2C241E] shadow-sm hover:shadow-2xl hover:border-[#f15e1c]/40 transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    {art.featuredImageUrl && (
                      <div className="w-full h-44 sm:h-48 rounded-2xl overflow-hidden mb-3 border border-[#EFE2D6] dark:border-[#2C241E]">
                        <img
                          src={art.featuredImageUrl}
                          alt={art.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="flex items-center justify-between gap-2">
                      <Badge variant="secondary" size="sm" className="truncate max-w-[160px]">
                        {art.category}
                      </Badge>
                      <span className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0] flex items-center gap-1 shrink-0">
                        <Clock className="w-3 h-3 text-[#f15e1c]" /> {art.readTime}
                      </span>
                    </div>

                    <h3 className="text-base sm:text-lg font-bold font-display text-[#3A2E27] dark:text-[#FAF5EE] group-hover:text-[#f15e1c] transition-colors line-clamp-3 leading-snug">
                      <Link href={`/insights/${art.slug}`}>
                        {art.title}
                      </Link>
                    </h3>

                    <p className="text-xs text-[#7A6A5F] dark:text-[#B8ACA0] leading-relaxed line-clamp-3">
                      {art.summary}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[#EFE2D6] dark:border-[#2C241E] flex items-center justify-between">
                    <span className="text-[11px] text-[#7A6A5F] dark:text-[#B8ACA0]">{art.dateFormatted}</span>
                    <Link
                      href={`/insights/${art.slug}`}
                      className="text-xs font-bold text-[#f15e1c] hover:underline inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform min-h-[44px] items-center"
                    >
                      Read Article <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              </TiltCard>
            </ScrollReveal>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-[#FBF3EA]/40 dark:bg-[#161310]/40 rounded-3xl border border-[#EFE2D6] dark:border-[#2C241E] space-y-4">
          <p className="text-base text-[#7A6A5F] dark:text-[#B8ACA0]">
            No articles found matching category "{activeCategory}".
          </p>
          <Button
            variant="secondary"
            size="md"
            onClick={() => setActiveCategory("all")}
            className="min-h-[44px]"
          >
            Reset Filters
          </Button>
        </div>
      )}
    </div>
  );
}
