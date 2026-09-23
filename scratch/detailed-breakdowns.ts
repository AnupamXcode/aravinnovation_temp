import * as fs from "fs";
import * as path from "path";
import { XMLParser } from "fast-xml-parser";

const rootDir = process.cwd();
const xmlPath = path.join(rootDir, "wordpress-export", "WordPress.2026-08-30.xml");
const xmlData = fs.readFileSync(xmlPath, "utf-8");

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  trimValues: true,
});

const parsed = parser.parse(xmlData);
const items = parsed?.rss?.channel?.item || [];

// 1. Identify Draft Post
const draftPost = items.find((i: any) => i["wp:post_type"] === "post" && i["wp:status"] !== "publish");
console.log("=== DRAFT POST ===");
if (draftPost) {
  console.log(`Title: ${draftPost.title}`);
  console.log(`Slug: ${draftPost["wp:post_name"]}`);
  console.log(`Status: ${draftPost["wp:status"]}`);
  console.log(`Post ID: ${draftPost["wp:post_id"]}`);
}

// 2. Categories List
const categoriesMap = new Map<string, number>();
const tagsMap = new Map<string, number>();
for (const item of items) {
  if (item["wp:post_type"] === "post" && item["wp:status"] === "publish") {
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
}

console.log("\n=== CATEGORIES IN PUBLISHED POSTS ===");
for (const [cat, count] of categoriesMap.entries()) {
  console.log(`- ${cat}: ${count} posts`);
}

console.log("\n=== TOP 10 TAGS ===");
const sortedTags = Array.from(tagsMap.entries()).sort((a, b) => b[1] - a[1]);
sortedTags.slice(0, 10).forEach(([tag, count]) => {
  console.log(`- ${tag}: ${count} posts`);
});

// 3. Products in codebase
const productsTs = path.join(rootDir, "data", "products.ts");
if (fs.existsSync(productsTs)) {
  const { products } = require(productsTs);
  console.log("\n=== PRODUCTS IN CODEBASE ===");
  if (Array.isArray(products)) {
    products.forEach((p: any) => {
      console.log(`Product: ${p.title || p.name} | Slug: ${p.id || p.slug} | External URL: ${p.externalUrl || p.href || 'N/A'}`);
    });
  }
}

// 4. Services in codebase
const servicesTs = path.join(rootDir, "data", "services.ts");
if (fs.existsSync(servicesTs)) {
  const { services } = require(servicesTs);
  console.log("\n=== SERVICES IN CODEBASE ===");
  if (Array.isArray(services)) {
    services.forEach((s: any) => {
      console.log(`Service: ${s.title || s.name} | Slug: ${s.slug}`);
    });
  }
}
