import * as fs from "fs";
import * as path from "path";
import { XMLParser } from "fast-xml-parser";

const xmlPath = path.join(process.cwd(), "wordpress-export", "WordPress.2026-10-26.xml");
const xmlData = fs.readFileSync(xmlPath, "utf-8");

const parser = new XMLParser({
  ignoreAttributes: false,
  attributeNamePrefix: "@_",
  trimValues: true,
});

const parsed = parser.parse(xmlData);
const items = parsed?.rss?.channel?.item || [];

const attachmentsMap = new Map<number, string>();
for (const item of items) {
  if (item["wp:post_type"] === "attachment") {
    const postId = parseInt(item["wp:post_id"], 10);
    const attachmentUrl = item["wp:attachment_url"] || item["guid"]?.["#text"] || item["guid"];
    if (postId && typeof attachmentUrl === "string") {
      attachmentsMap.set(postId, attachmentUrl);
    }
  }
}

const publishedPosts = items.filter(
  (item: any) => item["wp:post_type"] === "post" && item["wp:status"] === "publish"
);

publishedPosts.sort((a: any, b: any) => {
  const dateA = new Date(a["wp:post_date"] || a.pubDate).getTime();
  const dateB = new Date(b["wp:post_date"] || b.pubDate).getTime();
  return dateB - dateA;
});

console.log("Top 5 Newest Posts in XML:");
for (let i = 0; i < 5; i++) {
  const p = publishedPosts[i];
  const meta = Array.isArray(p["wp:postmeta"]) ? p["wp:postmeta"] : [p["wp:postmeta"]];
  const thumbMeta = meta.find((m: any) => m && m["wp:meta_key"] === "_thumbnail_id");
  const thumbId = thumbMeta ? parseInt(thumbMeta["wp:meta_value"], 10) : null;
  const thumbUrl = thumbId ? attachmentsMap.get(thumbId) : null;
  console.log({
    slug: p["wp:post_name"],
    title: p.title,
    date: p["wp:post_date"],
    thumbId,
    thumbUrl,
  });
}
