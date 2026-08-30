import * as fs from "fs";
import * as path from "path";
import { XMLParser } from "fast-xml-parser";
import { wordpressPostsData } from "../data/wordpress-posts";

const xmlPath = path.join(process.cwd(), "wordpress-export", "WordPress.2026-08-30.xml");
const xmlData = fs.readFileSync(xmlPath, "utf-8");

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  trimValues: true,
});

const parsed = parser.parse(xmlData);
const items = parsed?.rss?.channel?.item || [];

// Create map of original XML post by post_id
const xmlPostMap = new Map<number, any>();
for (const item of items) {
  if (item["wp:post_type"] === "post" && item["wp:status"] === "publish") {
    const id = parseInt(item["wp:post_id"], 10);
    xmlPostMap.set(id, item);
  }
}

console.log("=== FINAL MIGRATION AUDIT REPORT ===\n");

// 1. Identify 1 post without featured image
console.log("--- 1. POSTS WITHOUT FEATURED IMAGE ---");
wordpressPostsData.forEach((post) => {
  if (!post.featuredImageUrl) {
    const xmlItem = xmlPostMap.get(post.wpPostId!);
    const postMeta = xmlItem?.["wp:postmeta"];
    const metaList = Array.isArray(postMeta) ? postMeta : postMeta ? [postMeta] : [];
    const thumbMeta = metaList.find((m: any) => m["wp:meta_key"] === "_thumbnail_id");
    console.log(`ID: ${post.wpPostId} | Title: "${post.title}" | Slug: ${post.slug}`);
    console.log(`   XML status: _thumbnail_id in XML? ${thumbMeta ? `YES (ID ${thumbMeta["wp:meta_value"]})` : "NO (Genuinely missing in original WordPress post)"}`);
  }
});

// 2. Identify 2 posts without inline body images
console.log("\n--- 2. POSTS WITHOUT INLINE BODY IMAGES ---");
wordpressPostsData.forEach((post) => {
  const html = post.contentHtml || "";
  if (!/<img[^>]+>/i.test(html)) {
    const xmlItem = xmlPostMap.get(post.wpPostId!);
    const xmlContent = xmlItem?.["content:encoded"] || "";
    const hasXmlImg = /<img[^>]+>/i.test(xmlContent);
    console.log(`ID: ${post.wpPostId} | Title: "${post.title}" | Slug: ${post.slug}`);
    console.log(`   XML status: Inline <img gallery/block> in XML? ${hasXmlImg ? "YES" : "NO (Original WordPress post had no inline body images)"}`);
  }
});

// 3. Identify 3 posts without hyperlinks
console.log("\n--- 3. POSTS WITHOUT HYPERLINKS ---");
wordpressPostsData.forEach((post) => {
  const html = post.contentHtml || "";
  if (!/<a[^>]+>/i.test(html)) {
    const xmlItem = xmlPostMap.get(post.wpPostId!);
    const xmlContent = xmlItem?.["content:encoded"] || "";
    const hasXmlAnchor = /<a[^>]+>/i.test(xmlContent);
    console.log(`ID: ${post.wpPostId} | Title: "${post.title}" | Slug: ${post.slug}`);
    console.log(`   XML status: Hyperlinks (<a href>) in XML? ${hasXmlAnchor ? "YES" : "NO (Original WordPress post contained no <a> links)"}`);
  }
});

// 4. Identify 13 posts without lists
console.log("\n--- 4. POSTS WITHOUT LISTS (<ul>/<ol>) ---");
wordpressPostsData.forEach((post) => {
  const html = post.contentHtml || "";
  if (!/<(ul|ol)[^>]*>/i.test(html)) {
    const xmlItem = xmlPostMap.get(post.wpPostId!);
    const xmlContent = xmlItem?.["content:encoded"] || "";
    const hasXmlList = /<(ul|ol)[^>]*>/i.test(xmlContent);
    console.log(`ID: ${post.wpPostId} | Title: "${post.title}" | Slug: ${post.slug}`);
    console.log(`   XML status: Lists (<ul>/<ol>) in XML? ${hasXmlList ? "YES" : "NO (Original post used plain paragraphs/bullets instead of HTML lists)"}`);
  }
});

// Comprehensive Sanity Checks across ALL 55 posts
console.log("\n--- COMPREHENSIVE INTEGRITY & QUALITY CHECKS ---");

const titleSet = new Set<string>();
const slugSet = new Set<string>();

let emptyTitles = 0;
let emptyContent = 0;
let duplicateTitles = 0;
let duplicateSlugs = 0;
let missingDates = 0;
let invalidDates = 0;
let missingAuthors = 0;
let missingCategories = 0;
let emptyContentHtml = 0;
let shortContentHtml = 0;
let oldDomainUrls = 0;

for (const post of wordpressPostsData) {
  if (!post.title || post.title.trim() === "") emptyTitles++;
  if (!post.sections || post.sections.length === 0) emptyContent++;

  if (titleSet.has(post.title)) duplicateTitles++;
  else titleSet.add(post.title);

  if (slugSet.has(post.slug)) duplicateSlugs++;
  else slugSet.add(post.slug);

  if (!post.publishedAt) missingDates++;
  else if (isNaN(new Date(post.publishedAt).getTime())) invalidDates++;

  if (!post.author || !post.author.name) missingAuthors++;
  if (!post.category) missingCategories++;

  if (!post.contentHtml || post.contentHtml.trim() === "") emptyContentHtml++;

  const xmlItem = xmlPostMap.get(post.wpPostId!);
  const xmlContentLen = (xmlItem?.["content:encoded"] || "").length;
  const migratedHtmlLen = (post.contentHtml || "").length;

  if (xmlContentLen > 500 && migratedHtmlLen < xmlContentLen * 0.5) {
    shortContentHtml++;
  }

  if (/aravinnovations\.com|blog\.aravinnovations\.com/i.test(post.contentHtml || "")) {
    oldDomainUrls++;
  }
}

console.log(` - Empty Titles: ${emptyTitles}`);
console.log(` - Empty Content: ${emptyContent}`);
console.log(` - Duplicate Titles: ${duplicateTitles}`);
console.log(` - Duplicate Slugs: ${duplicateSlugs}`);
console.log(` - Missing Publication Dates: ${missingDates}`);
console.log(` - Invalid Publication Dates: ${invalidDates}`);
console.log(` - Missing Authors: ${missingAuthors}`);
console.log(` - Missing Categories: ${missingCategories}`);
console.log(` - Empty contentHtml: ${emptyContentHtml}`);
console.log(` - Suspiciously Short contentHtml (<50% of XML): ${shortContentHtml}`);
console.log(` - Posts with old domain URLs (aravinnovations.com): ${oldDomainUrls}`);
