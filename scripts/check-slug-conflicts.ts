import * as fs from "fs";
import * as path from "path";
import { XMLParser } from "fast-xml-parser";
import { blogPostsData } from "../data/insights";
function stripHtmlTags(str: string): string {
  if (!str) return "";
  return str
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const xmlPath = path.join(process.cwd(), "wordpress-export", "WordPress.2026-08-30.xml");
const xmlData = fs.readFileSync(xmlPath, "utf-8");

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  trimValues: true,
});

const parsed = parser.parse(xmlData);
const items = parsed?.rss?.channel?.item || [];

const publishedPosts = items.filter(
  (item: any) =>
    item["wp:post_type"] === "post" && item["wp:status"] === "publish"
);

console.log(`Total Published WordPress Posts: ${publishedPosts.length}`);

const existingSlugs = new Map<string, string>();
blogPostsData.forEach((post) => {
  existingSlugs.set(post.slug, post.title);
});

console.log(`Existing Static Arav Innovations Slugs (${blogPostsData.length}):`);
blogPostsData.forEach((post) => console.log(` - ${post.slug} ("${post.title}")`));

const wpSlugs = new Map<string, string>();
const conflicts: { slug: string; wpTitle: string; existingTitle: string }[] = [];
const duplicateWpSlugs: { slug: string; wpTitle: string }[] = [];

for (const post of publishedPosts) {
  const rawTitle = typeof post.title === "string" ? post.title : post.title?.["#text"] || "Untitled Post";
  const title = stripHtmlTags(rawTitle);
  const slug = post["wp:post_name"] || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");

  if (existingSlugs.has(slug)) {
    conflicts.push({
      slug,
      wpTitle: title,
      existingTitle: existingSlugs.get(slug)!,
    });
  }

  if (wpSlugs.has(slug)) {
    duplicateWpSlugs.push({ slug, wpTitle: title });
  } else {
    wpSlugs.set(slug, title);
  }
}

console.log(`\n--- CONFLICT REPORT ---`);
console.log(`WordPress Slugs Count: ${wpSlugs.size}`);
console.log(`Slug Conflicts with Existing Blogs: ${conflicts.length}`);
if (conflicts.length > 0) {
  conflicts.forEach((c) => {
    console.log(`   Conflict: "${c.slug}" | WP Title: "${c.wpTitle}" vs Existing Title: "${c.existingTitle}"`);
  });
} else {
  console.log("No slug conflicts found with existing static blogs!");
}

console.log(`Duplicate Slugs inside WordPress Export: ${duplicateWpSlugs.length}`);
if (duplicateWpSlugs.length > 0) {
  duplicateWpSlugs.forEach((d) => console.log(`   Duplicate WP Slug: "${d.slug}" ("${d.wpTitle}")`));
}
