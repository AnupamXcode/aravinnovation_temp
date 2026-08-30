import * as fs from "fs";
import * as path from "path";
import { XMLParser } from "fast-xml-parser";

const xmlPath = path.join(process.cwd(), "wordpress-export", "WordPress.2026-08-30.xml");
const xmlData = fs.readFileSync(xmlPath, "utf-8");

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  trimValues: true,
});

const parsed = parser.parse(xmlData);
const items = parsed?.rss?.channel?.item || [];

const targetIds = [7, 32, 45];

for (const id of targetIds) {
  const item = items.find((i: any) => parseInt(i["wp:post_id"], 10) === id);
  if (!item) {
    console.log(`[ID ${id}] Not found`);
    continue;
  }

  const rawTitle = typeof item.title === "string" ? item.title : item.title?.["#text"];
  const content = item["content:encoded"] || "";

  console.log(`\n==================================================`);
  console.log(`POST ID: ${id} | TITLE: ${rawTitle}`);
  console.log(`SLUG: ${item["wp:post_name"]}`);
  console.log(`CONTENT LENGTH: ${content.length} characters`);
  console.log(`--------------------------------------------------`);

  // Check for HTML elements
  const imgMatches = content.match(/<img[^>]+>/gi) || [];
  const linkMatches = content.match(/<a[^>]+>(.*?)<\/a>/gi) || [];
  const listMatches = content.match(/<(ul|ol)[^>]*>([\s\S]*?)<\/\1>/gi) || [];
  const tableMatches = content.match(/<table[^>]*>([\s\S]*?)<\/table>/gi) || [];
  const boldMatches = content.match(/<(strong|b)[^>]*>(.*?)<\/\1>/gi) || [];
  const italicMatches = content.match(/<(em|i)[^>]*>(.*?)<\/\1>/gi) || [];
  const iframeMatches = content.match(/<(iframe|video|embed)[^>]*>/gi) || [];

  console.log(`Images found: ${imgMatches.length}`);
  if (imgMatches.length > 0) {
    imgMatches.forEach((img: string, idx: number) => console.log(`   Img ${idx + 1}: ${img}`));
  }

  console.log(`Links found: ${linkMatches.length}`);
  if (linkMatches.length > 0) {
    linkMatches.slice(0, 5).forEach((link: string, idx: number) => console.log(`   Link ${idx + 1}: ${link}`));
  }

  console.log(`Lists (ul/ol) found: ${listMatches.length}`);
  console.log(`Tables found: ${tableMatches.length}`);
  console.log(`Bold elements: ${boldMatches.length}`);
  console.log(`Italic elements: ${italicMatches.length}`);
  console.log(`Iframes/Videos: ${iframeMatches.length}`);

  // Check thumbnail ID / featured image
  const postMeta = item["wp:postmeta"];
  const metaList = Array.isArray(postMeta) ? postMeta : postMeta ? [postMeta] : [];
  const thumbMeta = metaList.find((m: any) => m["wp:meta_key"] === "_thumbnail_id");
  console.log(`Thumbnail ID: ${thumbMeta ? thumbMeta["wp:meta_value"] : "NONE"}`);

  console.log(`\nRAW CONTENT SNIPPET (First 500 chars):\n${content.substring(0, 500)}`);
}
