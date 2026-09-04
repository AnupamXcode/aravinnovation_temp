"use client";

import * as React from "react";
import Image from "next/image";
import { BlogPost } from "@/data/insights";
import { getValidBlogImageUrl, getBlogCategoryFallback } from "@/lib/blog-images";
import { BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogCardImageProps {
  post: Partial<BlogPost>;
  className?: string;
  aspectRatio?: string; // e.g. "aspect-video" or "h-48 sm:h-52"
  sizes?: string;
}

export function BlogCardImage({
  post,
  className,
  aspectRatio = "aspect-video",
  sizes = "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw",
}: BlogCardImageProps) {
  const primarySrc = getValidBlogImageUrl(post);
  const fallbackSrc = getBlogCategoryFallback(post.category);
  const [currentSrc, setCurrentSrc] = React.useState<string>(primarySrc);
  const [hasFailed, setHasFailed] = React.useState<boolean>(false);

  React.useEffect(() => {
    const valid = getValidBlogImageUrl(post);
    setCurrentSrc(valid);
    setHasFailed(false);
  }, [post.slug, post.featuredImageUrl, post.category]);

  const handleImageError = () => {
    if (currentSrc !== fallbackSrc && fallbackSrc) {
      setCurrentSrc(fallbackSrc);
    } else {
      setHasFailed(true);
    }
  };

  return (
    <div
      className={cn(
        "relative w-full overflow-hidden bg-[#f7d7b0]/20 dark:bg-[#121212]",
        aspectRatio,
        className
      )}
    >
      {!hasFailed && currentSrc ? (
        <Image
          src={currentSrc}
          alt={post.title || "Arav Innovations Blog Article"}
          fill
          unoptimized
          sizes={sizes}
          className="object-cover group-hover:scale-105 transition-transform duration-500 text-transparent"
          onError={handleImageError}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-[#f15e1c]/10 via-[#f7d7b0]/20 to-[#2e936f]/10 dark:from-[#f15e1c]/20 dark:to-[#1a1a1a] flex items-center justify-center p-6">
          <div className="w-14 h-14 rounded-2xl bg-white dark:bg-[#161616] border border-[#f7d7b0] dark:border-[#262626] flex items-center justify-center text-[#f15e1c] shadow-sm">
            <BookOpen className="w-7 h-7" />
          </div>
        </div>
      )}
    </div>
  );
}
