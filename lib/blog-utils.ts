import { BlogPost } from "@/data/insights";

export type SortOrder = "latest" | "oldest" | "most-read";

/**
 * Filter and sort blog posts dynamically
 */
export function filterAndSortBlogs(
  blogs: BlogPost[],
  selectedCategory: string = "all",
  sortBy: SortOrder = "latest"
): BlogPost[] {
  let filtered = blogs;

  if (selectedCategory && selectedCategory.toLowerCase() !== "all") {
    const targetCat = selectedCategory.toLowerCase().trim();
    filtered = blogs.filter((b) => {
      const cat = b.category ? b.category.toLowerCase().trim() : "";
      return cat === targetCat || cat.includes(targetCat) || targetCat.includes(cat);
    });
  }

  const sorted = [...filtered].sort((a, b) => {
    const dateA = new Date(a.publishedAt).getTime();
    const dateB = new Date(b.publishedAt).getTime();

    switch (sortBy) {
      case "latest":
        return (isNaN(dateB) ? 0 : dateB) - (isNaN(dateA) ? 0 : dateA);
      case "oldest":
        return (isNaN(dateA) ? 0 : dateA) - (isNaN(dateB) ? 0 : dateB);
      case "most-read":
        const timeA = parseInt(a.readTime) || 5;
        const timeB = parseInt(b.readTime) || 5;
        return timeB - timeA;
      default:
        return 0;
    }
  });

  return sorted;
}
