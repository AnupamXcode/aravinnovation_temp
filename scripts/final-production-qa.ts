import { getBlogPosts, getAllBlogPostSlugs } from "../lib/cms";
import { wordpressPostsData } from "../data/wordpress-posts";
import { blogPostsData } from "../data/insights";

async function runQA() {
  console.log("=== FINAL READ-ONLY PRODUCTION QA REPORT ===\n");

  // 1. Blog Inventory
  const allPosts = await getBlogPosts();
  const slugs = await getAllBlogPostSlugs();

  console.log("--- 1. BLOG INVENTORY ---");
  console.log(` - Total Blog Posts Available in CMS Layer: ${allPosts.length}`);
  console.log(` - Migrated WordPress Posts: ${wordpressPostsData.length}`);
  console.log(` - Original Static Arav Innovations Posts: ${blogPostsData.length}`);

  const uniqueSlugs = new Set(slugs);
  const duplicates = slugs.filter((s, index) => slugs.indexOf(s) !== index);
  console.log(` - Total Unique Slugs: ${uniqueSlugs.size}`);
  console.log(` - Duplicate Slugs Found: ${duplicates.length} ${duplicates.length > 0 ? `(${duplicates.join(", ")})` : ""}`);

  // 2. Programmatic Route Verification
  console.log("\n--- 2. ROUTE VERIFICATION ---");
  let workingRoutes = 0;
  let missingRoutes = 0;
  
  wordpressPostsData.forEach((post) => {
    if (uniqueSlugs.has(post.slug)) {
      workingRoutes++;
    } else {
      missingRoutes++;
      console.log(`   [MISSING ROUTE] Slug '${post.slug}' not found in CMS slug index!`);
    }
  });

  console.log(` - Working Routes: ${workingRoutes} / ${wordpressPostsData.length}`);
  console.log(` - Missing / 404 Routes: ${missingRoutes}`);
  console.log(` - Route Resolution Pattern: /[locale]/insights/[slug]`);

  // 3. Content Completeness Check Across All 55 Migrated Posts
  console.log("\n--- 3. CONTENT COMPLETENESS CHECK ---");
  let validTitles = 0;
  let validSummaries = 0;
  let validDates = 0;
  let validAuthors = 0;
  let validCategories = 0;
  let validTags = 0;
  let validContentHtml = 0;
  let hasFeaturedImg = 0;
  let hasInlineImg = 0;

  wordpressPostsData.forEach((post) => {
    if (post.title && post.title.trim().length > 0) validTitles++;
    if (post.summary && post.summary.trim().length > 0) validSummaries++;
    if (post.publishedAt && !isNaN(new Date(post.publishedAt).getTime())) validDates++;
    if (post.author && post.author.name) validAuthors++;
    if (post.category && post.category.trim().length > 0) validCategories++;
    if (post.tags && post.tags.length > 0) validTags++;
    if (post.contentHtml && post.contentHtml.trim().length > 0) validContentHtml++;
    if (post.featuredImageUrl) hasFeaturedImg++;
    if (/<img[^>]+>/i.test(post.contentHtml || "")) hasInlineImg++;
  });

  console.log(` - Valid Titles: ${validTitles} / 55`);
  console.log(` - Valid Summaries: ${validSummaries} / 55`);
  console.log(` - Valid Publication Dates: ${validDates} / 55`);
  console.log(` - Valid Authors: ${validAuthors} / 55`);
  console.log(` - Valid Categories: ${validCategories} / 55`);
  console.log(` - Valid Tags: ${validTags} / 55`);
  console.log(` - Valid contentHtml: ${validContentHtml} / 55`);
  console.log(` - Featured Images Available: ${hasFeaturedImg} / 55`);
  console.log(` - Inline Body Images Available: ${hasInlineImg} / 55`);

  // 4. Internal Link Status Check
  console.log("\n--- 4. INTERNAL LINK & MEDIA STATUS ---");
  let oldBlogLinks = 0;
  let oldServiceLinks = 0;
  let oldHomeLinks = 0;
  let mediaLinks = 0;
  let externalLinks = 0;

  wordpressPostsData.forEach((post) => {
    const html = post.contentHtml || "";
    const hrefMatches = html.match(/href=["']([^"']+)["']/gi) || [];
    hrefMatches.forEach((m) => {
      const href = m.replace(/^href=["']/, "").replace(/["']$/, "");
      if (href.includes("wp-content/uploads/")) mediaLinks++;
      else if (href.includes("blog.aravinnovations.com")) oldBlogLinks++;
      else if (href.includes("aravinnovations.com/digitalmarketing")) oldServiceLinks++;
      else if (href === "https://aravinnovations.com/" || href === "https://aravinnovations.com") oldHomeLinks++;
      else if (/^https?:\/\//i.test(href) && !href.includes("aravinnovations.com")) externalLinks++;
    });
  });

  console.log(` - Unrewritten Old Blog URLs Remaining: ${oldBlogLinks}`);
  console.log(` - Unrewritten Old Service URLs Remaining: ${oldServiceLinks}`);
  console.log(` - Unrewritten Old Homepage URLs Remaining: ${oldHomeLinks}`);
  console.log(` - External Links Preserved: ${externalLinks}`);
  console.log(` - WordPress Uploads Media URLs Preserved: ${mediaLinks}`);
}

runQA();
