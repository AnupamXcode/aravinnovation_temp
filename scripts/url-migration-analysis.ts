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

console.log("=== READ-ONLY URL MIGRATION ANALYSIS ===\n");

// 1. Determine Old WordPress URL Pattern
const sampleLinks: string[] = [];
for (const item of items) {
  if (item["wp:post_type"] === "post" && item["wp:status"] === "publish") {
    const link = item.link || item.guid?.["#text"] || item.guid;
    if (typeof link === "string") {
      sampleLinks.push(link);
    }
  }
}

console.log("1. OLD WORDPRESS URL PATTERN ANALYSIS:");
console.log(`   Sample old links from XML (Total: ${sampleLinks.length}):`);
sampleLinks.slice(0, 5).forEach((l, idx) => console.log(`   - [${idx + 1}] ${l}`));

const oldPattern = sampleLinks[0] ? sampleLinks[0].replace(/https?:\/\/[^\/]+/, "").replace(/[^\/]+$/, "[slug]") : "/[slug]";
console.log(`   Old Blog URL Pattern: ${sampleLinks[0]?.split("/")[0]}//${sampleLinks[0]?.split("/")[2]}/[slug]`);
console.log(`   New Blog URL Pattern: https://aravinnovations.com/insights/[slug]\n`);

// 2. Mapping for all 55 migrated posts
console.log("2. 55-POST URL MAPPING SAMPLE (OLD -> NEW):");
wordpressPostsData.slice(0, 5).forEach((p, idx) => {
  const xmlItem = items.find((i: any) => parseInt(i["wp:post_id"], 10) === p.wpPostId);
  const oldUrl = xmlItem?.link || `https://blog.aravinnovations.com/${p.slug}/`;
  const newUrl = `https://aravinnovations.com/insights/${p.slug}`;
  console.log(`   [${idx + 1}] ${oldUrl} -> ${newUrl}`);
});
console.log(`   ... (Mapped all 55 posts)\n`);

// 3 & 4. Analyze all internal links in contentHtml
interface ExtractedLink {
  postId: number;
  postTitle: string;
  href: string;
  category: "blog" | "service" | "product" | "page" | "media" | "external";
  recommendedNewUrl?: string;
}

const extractedLinks: ExtractedLink[] = [];

for (const post of wordpressPostsData) {
  const html = post.contentHtml || "";
  const hrefRegex = /href=["']([^"']+)["']/gi;
  let match;
  while ((match = hrefRegex.exec(html)) !== null) {
    const href = match[1];
    if (href.includes("aravinnovations.com") || href.startsWith("/")) {
      let category: ExtractedLink["category"] = "page";
      let recommendedNewUrl = href;

      if (href.includes("blog.aravinnovations.com/wp-content/uploads/")) {
        category = "media";
        recommendedNewUrl = href; // Media stays on CDN/uploads or current working host
      } else if (href.includes("blog.aravinnovations.com") || href.includes("/blog/") || href.includes("/insights/")) {
        category = "blog";
        const slug = href.replace(/\/$/, "").split("/").pop();
        recommendedNewUrl = `/insights/${slug}`;
      } else if (href.includes("service") || href.includes("marketing") || href.includes("web-dev")) {
        category = "service";
        if (href.includes("digital-marketing") || href.includes("digitalmarketing")) {
          recommendedNewUrl = "/services/digital-marketing-brand-development";
        } else if (href.includes("web") || href.includes("app")) {
          recommendedNewUrl = "/services/web-app-development";
        } else {
          recommendedNewUrl = "/services";
        }
      } else if (href.includes("product")) {
        category = "product";
        recommendedNewUrl = "/products";
      } else if (href === "https://aravinnovations.com/" || href === "https://aravinnovations.com") {
        category = "page";
        recommendedNewUrl = "/";
      }

      extractedLinks.push({
        postId: post.wpPostId!,
        postTitle: post.title,
        href,
        category,
        recommendedNewUrl,
      });
    }
  }
}

console.log("3 & 4. INTERNAL LINK CATEGORIZATION REPORT:");
console.log(`   Total Internal Links Found: ${extractedLinks.length}`);

const catCounts = {
  blog: extractedLinks.filter((l) => l.category === "blog").length,
  service: extractedLinks.filter((l) => l.category === "service").length,
  product: extractedLinks.filter((l) => l.category === "product").length,
  page: extractedLinks.filter((l) => l.category === "page").length,
  media: extractedLinks.filter((l) => l.category === "media").length,
};

console.log(`   - Blog/Article Links: ${catCounts.blog}`);
console.log(`   - Service Links: ${catCounts.service}`);
console.log(`   - Product Links: ${catCounts.product}`);
console.log(`   - Other Website Pages (e.g. Homepage): ${catCounts.page}`);
console.log(`   - Media/Image URLs: ${catCounts.media}`);

const rewritesRequired = extractedLinks.filter((l) => l.href !== l.recommendedNewUrl);
const unchanged = extractedLinks.length - rewritesRequired.length;

console.log(`\n5 & 6. REWRITE SUMMARY:`);
console.log(`   - Links that can remain unchanged: ${unchanged}`);
console.log(`   - Links requiring rewriting: ${rewritesRequired.length}`);

console.log(`\nEXACT LINKS REQUIRING REWRITING:`);
rewritesRequired.forEach((l, idx) => {
  console.log(`   [${idx + 1}] Post ID ${l.postId} ("${l.postTitle}")`);
  console.log(`       Old URL: ${l.href}`);
  console.log(`       Recommended New URL: ${l.recommendedNewUrl}`);
});
