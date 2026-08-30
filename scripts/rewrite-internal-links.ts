import * as fs from "fs";
import * as path from "path";
import { wordpressPostsData } from "../data/wordpress-posts";
import { blogPostsData } from "../data/insights";

const targetPath = path.join(process.cwd(), "data", "wordpress-posts.ts");

console.log("=== RE-REWRITING INTERNAL LINKS WITH ENHANCED ROUTE MAPPING ===\n");

// Build valid slug set & fuzzy title/slug lookup map
const validBlogSlugs = new Set<string>();
const slugAliasMap = new Map<string, string>();

[...wordpressPostsData, ...blogPostsData].forEach((p) => {
  validBlogSlugs.add(p.slug);
});

// Alias mappings for old WP URLs pointing to posts with slightly modified slugs
slugAliasMap.set(
  "artificial-intelligence-powered-marketing-how-ai-is-transforming-the-digital-environment",
  "ai-in-digital-marketing"
);
slugAliasMap.set(
  "local-seo-for-small-businesses-theultimate-growth-engine-you-cant-ignore",
  "local-seo-for-small-businesses-in-2026"
);

let blogRewritesCount = 0;
let serviceRewritesCount = 0;
let pageRewritesCount = 0;
let skippedCount = 0;
let mediaUntouchedCount = 0;
let externalUntouchedCount = 0;

const skippedList: { postTitle: string; href: string; reason: string }[] = [];

const updatedPosts = wordpressPostsData.map((post) => {
  if (!post.contentHtml) return post;

  let originalHtml = post.contentHtml;
  let newHtml = originalHtml;

  const hrefRegex = /href=["']([^"']+)["']/gi;

  newHtml = newHtml.replace(hrefRegex, (fullMatch, href) => {
    // 1. Skip media URLs (wp-content/uploads)
    if (href.includes("wp-content/uploads/")) {
      mediaUntouchedCount++;
      return fullMatch;
    }

    // 2. Skip external non-aravinnovations links
    if (/^https?:\/\//i.test(href) && !href.includes("aravinnovations.com")) {
      externalUntouchedCount++;
      return fullMatch;
    }

    // 3. Homepage links
    if (
      href === "https://aravinnovations.com/" ||
      href === "https://aravinnovations.com" ||
      href === "http://aravinnovations.com/" ||
      href === "http://aravinnovations.com" ||
      href === "http://www.aravinnovations.com" ||
      href === "http://www.aravinnovations.com/"
    ) {
      pageRewritesCount++;
      return `href="/"`;
    }

    // 4. Contact page links
    if (
      href === "https://aravinnovations.com/contact" ||
      href === "https://aravinnovations.com/contact/" ||
      href === "http://aravinnovations.com/contact" ||
      href === "http://aravinnovations.com/contact/"
    ) {
      pageRewritesCount++;
      return `href="/contact"`;
    }

    // 5. Service links
    if (
      href === "https://aravinnovations.com/digitalmarketing" ||
      href === "https://aravinnovations.com/digitalmarketing/" ||
      href === "http://aravinnovations.com/digitalmarketing" ||
      href === "http://aravinnovations.com/digitalmarketing/"
    ) {
      serviceRewritesCount++;
      return `href="/services/digital-marketing-brand-development"`;
    }

    // 6. Blog links (https://blog.aravinnovations.com/[slug]/ or /insights/[slug])
    if (href.includes("blog.aravinnovations.com") || href.includes("/insights/")) {
      let rawSlug = href
        .replace(/^https?:\/\/blog\.aravinnovations\.com\//, "")
        .replace(/^\/insights\//, "")
        .replace(/\/$/, "");

      let targetSlug = rawSlug;
      if (slugAliasMap.has(rawSlug)) {
        targetSlug = slugAliasMap.get(rawSlug)!;
      }

      if (validBlogSlugs.has(targetSlug)) {
        blogRewritesCount++;
        return `href="/insights/${targetSlug}"`;
      } else {
        skippedCount++;
        skippedList.push({
          postTitle: post.title,
          href,
          reason: `Blog slug '${rawSlug}' has no matching target post in migrated collection.`,
        });
        return fullMatch;
      }
    }

    // 7. Unverified internal links
    if (href.includes("aravinnovations.com")) {
      skippedCount++;
      skippedList.push({
        postTitle: post.title,
        href,
        reason: "Unverified internal route without equivalent existing page.",
      });
      return fullMatch;
    }

    return fullMatch;
  });

  return {
    ...post,
    contentHtml: newHtml,
  };
});

const totalRewritten = blogRewritesCount + serviceRewritesCount + pageRewritesCount;

console.log("=== COMPREHENSIVE REWRITE AUDIT ===");
console.log(` - Total Internal URLs Rewritten: ${totalRewritten}`);
console.log(` - Blog URLs Rewritten: ${blogRewritesCount}`);
console.log(` - Service URLs Rewritten: ${serviceRewritesCount}`);
console.log(` - Page URLs Rewritten (Home & Contact): ${pageRewritesCount}`);
console.log(` - Skipped / Unverified URLs: ${skippedCount}`);
console.log(` - Media URLs Left Untouched: ${mediaUntouchedCount}`);
console.log(` - External Links Left Untouched: ${externalUntouchedCount}`);

if (skippedList.length > 0) {
  console.log("\nSKIPPED / UNVERIFIED URL DETAILS:");
  skippedList.forEach((item, idx) => {
    console.log(`   [${idx + 1}] Post: "${item.postTitle}" | URL: ${item.href}`);
    console.log(`       Reason: ${item.reason}`);
  });
}

// Save updated file
const fileContent = `import { BlogPost } from "./insights";

export const totalPublishedPostsInXml = ${wordpressPostsData.length};

export const wordpressPostsData: BlogPost[] = ${JSON.stringify(updatedPosts, null, 2)};
`;

fs.writeFileSync(targetPath, fileContent, "utf-8");
console.log(`\nSuccessfully saved updated data to: ${targetPath}`);
