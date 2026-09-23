import * as fs from "fs";
import * as path from "path";
import { XMLParser } from "fast-xml-parser";

async function runDiscovery() {
  const rootDir = process.cwd();
  console.log("=== COMPREHENSIVE MIGRATION DISCOVERY AUDIT ===");

  // 1. WORDPRESS XML AUDIT
  const xmlPath = path.join(rootDir, "wordpress-export", "WordPress.2026-08-30.xml");
  let xmlData = "";
  if (fs.existsSync(xmlPath)) {
    xmlData = fs.readFileSync(xmlPath, "utf-8");
  }

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    trimValues: true,
  });

  const parsed = xmlData ? parser.parse(xmlData) : null;
  const channel = parsed?.rss?.channel;
  const items: any[] = channel?.item || [];

  const postTypesCount: Record<string, number> = {};
  const postStatusCount: Record<string, number> = {};
  const publishedPosts: any[] = [];
  const wpPages: any[] = [];
  const wpAttachments: any[] = [];
  const wpNavItems: any[] = [];

  const authorsSet = new Set<string>();
  const categoriesMap = new Map<string, number>();
  const tagsMap = new Map<string, number>();
  let earliestDate = "9999-12-31";
  let latestDate = "0000-01-01";
  let featuredImagesCount = 0;
  let inlineImagesCount = 0;

  for (const item of items) {
    const postType = item["wp:post_type"] || "unknown";
    const postStatus = item["wp:status"] || "unknown";

    postTypesCount[postType] = (postTypesCount[postType] || 0) + 1;
    postStatusCount[postStatus] = (postStatusCount[postStatus] || 0) + 1;

    const creator = item["dc:creator"];
    if (creator) authorsSet.add(creator);

    const postDate = item["wp:post_date"] || item.pubDate;
    if (postDate && typeof postDate === "string") {
      const d = postDate.substring(0, 10);
      if (d.match(/^\d{4}-\d{2}-\d{2}$/)) {
        if (d < earliestDate) earliestDate = d;
        if (d > latestDate) latestDate = d;
      }
    }

    if (postType === "post" && postStatus === "publish") {
      publishedPosts.push(item);
      const content = item["content:encoded"] || "";
      const imgMatches = content.match(/<img[^>]+>/gi) || [];
      inlineImagesCount += imgMatches.length;

      const postMeta = item["wp:postmeta"];
      const metaList = Array.isArray(postMeta) ? postMeta : postMeta ? [postMeta] : [];
      const thumb = metaList.find((m: any) => m["wp:meta_key"] === "_thumbnail_id");
      if (thumb && thumb["wp:meta_value"]) {
        featuredImagesCount++;
      }
    }

    if (postType === "page" && postStatus === "publish") {
      wpPages.push(item);
    }
    if (postType === "attachment") {
      wpAttachments.push(item);
    }
    if (postType === "nav_menu_item") {
      wpNavItems.push(item);
    }

    // Categories & Tags
    const catField = item.category;
    if (catField) {
      const catList = Array.isArray(catField) ? catField : [catField];
      for (const c of catList) {
        const domain = c["@_domain"];
        const name = typeof c === "string" ? c : c["#text"] || c["@_nicename"];
        if (domain === "category" && name) {
          categoriesMap.set(name, (categoriesMap.get(name) || 0) + 1);
        } else if (domain === "post_tag" && name) {
          tagsMap.set(name, (tagsMap.get(name) || 0) + 1);
        }
      }
    }
  }

  console.log("\n--- PHASE 4: WORDPRESS EXPORT SUMMARY ---");
  console.log(`XML Channel Title: ${channel?.title || "N/A"}`);
  console.log(`XML Link: ${channel?.link || "N/A"}`);
  console.log(`Total RSS Items: ${items.length}`);
  console.log("Post Types Breakdown:", JSON.stringify(postTypesCount, null, 2));
  console.log("Post Statuses Breakdown:", JSON.stringify(postStatusCount, null, 2));
  console.log(`Published Posts: ${publishedPosts.length}`);
  console.log(`Published Pages: ${wpPages.length}`);
  console.log(`Attachments (Media): ${wpAttachments.length}`);
  console.log(`Nav Menu Items: ${wpNavItems.length}`);
  console.log(`Authors Found: ${Array.from(authorsSet).join(", ")}`);
  console.log(`Date Range: ${earliestDate} to ${latestDate}`);
  console.log(`Posts with Featured Images: ${featuredImagesCount}`);
  console.log(`Total Inline Images in Posts: ${inlineImagesCount}`);
  console.log(`Unique Categories Count: ${categoriesMap.size}`);
  console.log(`Unique Tags Count: ${tagsMap.size}`);

  console.log("\n--- PUBLISHED WP PAGES IN XML ---");
  wpPages.forEach((p, idx) => {
    const title = typeof p.title === "string" ? p.title : p.title?.["#text"] || "Untitled";
    console.log(`[Page ${idx + 1}] ID: ${p["wp:post_id"]} | Title: "${title}" | Slug: "${p["wp:post_name"]}" | Link: ${p.link}`);
  });

  // 2. NEW WEBSITE APP ROUTES AUDIT
  console.log("\n--- PHASE 2 & 3: APP ROUTER AUDIT ---");
  const appDir = path.join(rootDir, "app");
  function findPages(dir: string, baseRoute = ""): string[] {
    const results: string[] = [];
    if (!fs.existsSync(dir)) return results;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        results.push(...findPages(fullPath, path.join(baseRoute, entry.name)));
      } else if (entry.name === "page.tsx" || entry.name === "page.jsx" || entry.name === "page.ts" || entry.name === "route.ts") {
        results.push(path.join(baseRoute, entry.name).replace(/\\/g, "/"));
      }
    }
    return results;
  }
  const appRoutes = findPages(appDir);
  console.log(`Total App Routes/Pages Found: ${appRoutes.length}`);
  appRoutes.forEach((r) => console.log(`   - ${r}`));

  // 3. MEDIA FILES AUDIT
  console.log("\n--- PHASE 9: MEDIA FILES IN REPOSITORY ---");
  const publicDir = path.join(rootDir, "public");
  const imagesDir = path.join(rootDir, "Images");
  const videoDir = path.join(rootDir, "Video");

  function countFiles(dir: string): { count: number; totalBytes: number; files: string[] } {
    if (!fs.existsSync(dir)) return { count: 0, totalBytes: 0, files: [] };
    let count = 0;
    let totalBytes = 0;
    const filesList: string[] = [];
    function scan(d: string, rel = "") {
      const list = fs.readdirSync(d, { withFileTypes: true });
      for (const item of list) {
        const p = path.join(d, item.name);
        if (item.isDirectory()) {
          scan(p, path.join(rel, item.name));
        } else {
          count++;
          const stat = fs.statSync(p);
          totalBytes += stat.size;
          filesList.push(path.join(rel, item.name).replace(/\\/g, "/"));
        }
      }
    }
    scan(dir);
    return { count, totalBytes, files: filesList };
  }

  const publicStats = countFiles(publicDir);
  const imagesStats = countFiles(imagesDir);
  const videoStats = countFiles(videoDir);

  console.log(`Public Directory: ${publicStats.count} files (${(publicStats.totalBytes / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`Images Directory: ${imagesStats.count} files (${(imagesStats.totalBytes / (1024 * 1024)).toFixed(2)} MB)`);
  console.log(`Video Directory: ${videoStats.count} files (${(videoStats.totalBytes / (1024 * 1024)).toFixed(2)} MB)`);

  // 4. MIGRATED BLOG POSTS IN CODEBASE
  console.log("\n--- PHASE 5: CODEBASE BLOG DATA AUDIT ---");
  const wpPostsTsPath = path.join(rootDir, "data", "wordpress-posts.ts");
  const insightsTsPath = path.join(rootDir, "data", "insights.ts");

  let wpPostsCount = 0;
  if (fs.existsSync(wpPostsTsPath)) {
    const { wordpressPostsData } = require(wpPostsTsPath);
    wpPostsCount = wordpressPostsData ? wordpressPostsData.length : 0;
  }
  let insightsCount = 0;
  if (fs.existsSync(insightsTsPath)) {
    const { blogPosts } = require(insightsTsPath);
    insightsCount = blogPosts ? blogPosts.length : 0;
  }
  console.log(`Posts in data/wordpress-posts.ts: ${wpPostsCount}`);
  console.log(`Posts in data/insights.ts: ${insightsCount}`);

  // 5. NEXT CONFIG & REDIRECTS
  console.log("\n--- PHASE 10: NEXT.CONFIG & REDIRECTS ---");
  const nextConfigPath = path.join(rootDir, "next.config.ts");
  if (fs.existsSync(nextConfigPath)) {
    console.log("next.config.ts exists. Content snippet:");
    const content = fs.readFileSync(nextConfigPath, "utf-8");
    console.log(content);
  }

  // 6. MIDDLEWARE & PROXY
  console.log("\n--- MIDDLEWARE & PROXY ---");
  ["middleware.ts", "proxy.ts"].forEach((f) => {
    const p = path.join(rootDir, f);
    if (fs.existsSync(p)) {
      console.log(`Found ${f}:`);
      console.log(fs.readFileSync(p, "utf-8"));
    }
  });

  // 7. ENVIRONMENT VARIABLES REFERENCED
  console.log("\n--- ENV VARS REFERENCED ---");
  const envLocalPath = path.join(rootDir, ".env.local");
  if (fs.existsSync(envLocalPath)) {
    const envLines = fs.readFileSync(envLocalPath, "utf-8").split("\n");
    const keys = envLines.map((l) => l.split("=")[0].trim()).filter((k) => k && !k.startsWith("#"));
    console.log("Keys in .env.local:", keys.join(", "));
  }
}

runDiscovery().catch(console.error);
