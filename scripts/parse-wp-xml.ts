import * as fs from "fs";
import * as path from "path";
import { XMLParser } from "fast-xml-parser";
import { sanitizeArticleHtml } from "../lib/html-sanitizer";
import { BlogPost, BlogPostSection } from "../data/insights";

function stripHtmlTags(str: string): string {
  if (!str) return "";
  return str
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&#8217;/g, "'")
    .replace(/&#8216;/g, "'")
    .replace(/&#8220;/g, '"')
    .replace(/&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function calculateReadTime(text: string): string {
  const words = text.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function normalizeUrl(url: string): string {
  if (!url) return "";
  let clean = url.trim();
  if (clean.startsWith("http://blog.aravinnovations.com")) {
    clean = clean.replace("http://blog.aravinnovations.com", "https://blog.aravinnovations.com");
  } else if (clean.startsWith("http://aravinnovation.com")) {
    clean = clean.replace("http://aravinnovation.com", "https://blog.aravinnovations.com");
  } else if (clean.startsWith("https://aravinnovation.com")) {
    clean = clean.replace("https://aravinnovation.com", "https://blog.aravinnovations.com");
  }
  return clean;
}

function parseWpContentToSections(htmlContent: string): BlogPostSection[] {
  if (!htmlContent) {
    return [{ heading: "Overview", body: ["No content provided."] }];
  }

  // Split by headings (h1, h2, h3, h4)
  const headingRegex = /<h[1-4][^>]*>(.*?)<\/h[1-4]>/gi;
  const sections: BlogPostSection[] = [];

  let match;
  const matches: { heading: string; index: number; length: number }[] = [];
  while ((match = headingRegex.exec(htmlContent)) !== null) {
    matches.push({
      heading: stripHtmlTags(match[1]) || "Section",
      index: match.index,
      length: match[0].length,
    });
  }

  if (matches.length === 0) {
    // No explicit heading tags found, split by <p> or line breaks
    const rawParagraphs = htmlContent
      .split(/<\/p>|<br\s*\/?>|\n\n/)
      .map((p) => stripHtmlTags(p))
      .filter((p) => p.length > 5);

    return [
      {
        heading: "Overview",
        body: rawParagraphs.length > 0 ? rawParagraphs : [stripHtmlTags(htmlContent)],
      },
    ];
  }

  // Process text before first heading
  if (matches[0].index > 0) {
    const leadHtml = htmlContent.substring(0, matches[0].index);
    const leadParas = leadHtml
      .split(/<\/p>|<br\s*\/?>|\n\n/)
      .map((p) => stripHtmlTags(p))
      .filter((p) => p.length > 5);
    if (leadParas.length > 0) {
      sections.push({
        heading: "Introduction",
        body: leadParas,
      });
    }
  }

  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const startIndex = m.index + m.length;
    const endIndex = i + 1 < matches.length ? matches[i + 1].index : htmlContent.length;
    const sectionHtml = htmlContent.substring(startIndex, endIndex);

    const paras = sectionHtml
      .split(/<\/p>|<br\s*\/?>|\n\n/)
      .map((p) => stripHtmlTags(p))
      .filter((p) => p.length > 5);

    sections.push({
      heading: m.heading,
      body: paras.length > 0 ? paras : ["Details forthcoming."],
    });
  }

  return sections;
}

function formatDate(dateStr: string): { publishedAt: string; dateFormatted: string } {
  if (!dateStr) {
    return { publishedAt: "2026-01-01", dateFormatted: "January 2026" };
  }
  const date = new Date(dateStr);
  if (isNaN(date.getTime())) {
    return { publishedAt: "2026-01-01", dateFormatted: "January 2026" };
  }
  const isoDate = date.toISOString().split("T")[0];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  const formatted = `${months[date.getMonth()]} ${date.getDate()}, ${date.getFullYear()}`;
  return { publishedAt: isoDate, dateFormatted: formatted };
}

export function runMigration() {
  const xmlPath = path.join(process.cwd(), "wordpress-export", "WordPress.2026-10-26.xml");
  if (!fs.existsSync(xmlPath)) {
    console.error(`[Error] File not found: ${xmlPath}`);
    process.exit(1);
  }

  console.log(`[Parser] Reading XML from: ${xmlPath}`);
  const xmlData = fs.readFileSync(xmlPath, "utf-8");

  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "@_",
    trimValues: true,
  });

  const parsed = parser.parse(xmlData);
  const items = parsed?.rss?.channel?.item;

  if (!items || !Array.isArray(items)) {
    console.error("[Error] Could not find items array in WordPress XML.");
    process.exit(1);
  }

  // Parse Authors
  const authorsRaw = parsed?.rss?.channel?.["wp:author"] || [];
  const authorsList = Array.isArray(authorsRaw) ? authorsRaw : [authorsRaw];
  const authorMap = new Map<string, { name: string; role: string }>();

  for (const a of authorsList) {
    const login = a["wp:author_login"];
    const displayName = a["wp:author_display_name"] || login;
    if (login === "nextgenph.usa@gmail.com") {
      authorMap.set(login, { name: "Aryan Sayal", role: "Founder & CEO" });
    } else if (login === "Arav Innovations") {
      authorMap.set(login, { name: "Arav Innovations Editorial", role: "Editorial Team" });
    } else if (login === "abrar") {
      authorMap.set(login, { name: "Abrar Idariya", role: "Practice Contributor" });
    } else if (login === "shifa") {
      authorMap.set(login, { name: "Shifa Jaffer", role: "Practice Contributor" });
    } else {
      authorMap.set(login, { name: displayName, role: "Author" });
    }
  }

  // Build attachment metadata lookup (_thumbnail_id to attachment URL)
  const attachmentsMap = new Map<number, string>();
  for (const item of items) {
    const postType = item["wp:post_type"];
    const postId = parseInt(item["wp:post_id"], 10);
    const attachmentUrl = item["wp:attachment_url"] || item["guid"]?.["#text"] || item["guid"];
    if (postType === "attachment" && postId && typeof attachmentUrl === "string") {
      attachmentsMap.set(postId, normalizeUrl(attachmentUrl));
    }
  }

  // Filter published posts
  const publishedPosts = items.filter(
    (item: any) =>
      item["wp:post_type"] === "post" && item["wp:status"] === "publish"
  );

  console.log(`[Parser] Total items in XML: ${items.length}`);
  console.log(`[Parser] Total published posts found: ${publishedPosts.length}`);

  const migratedPosts: BlogPost[] = [];

  for (const post of publishedPosts) {
    const rawTitle = typeof post.title === "string" ? post.title : post.title?.["#text"] || "Untitled Post";
    const title = stripHtmlTags(rawTitle);
    const slug = post["wp:post_name"] || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    const postId = parseInt(post["wp:post_id"], 10);

    const rawContent = post["content:encoded"] || "";
    const rawExcerpt = post["excerpt:encoded"] || "";
    const summary = stripHtmlTags(rawExcerpt) || stripHtmlTags(rawContent).substring(0, 160) + "...";

    const rawDate = post["wp:post_date"] || post.pubDate;
    const { publishedAt, dateFormatted } = formatDate(rawDate);
    const creatorLogin = post["dc:creator"] || "Arav Innovations";
    const author = authorMap.get(creatorLogin) || {
      name: creatorLogin.includes("@") ? "Arav Innovations Editorial" : creatorLogin,
      role: "Author",
    };

    // Extract categories & tags
    const categories: string[] = [];
    const tags: string[] = [];
    const catField = post.category;

    if (catField) {
      const catList = Array.isArray(catField) ? catField : [catField];
      for (const c of catList) {
        const domain = c["@_domain"];
        let name = typeof c === "string" ? c : c["#text"] || c["@_nicename"];
        if (domain === "category" && name && name !== "Uncategorized") {
          // Normalize common typos in category names
          if (name.toLowerCase() === "complaince") name = "Compliance";
          categories.push(name);
        } else if (domain === "post_tag" && name) {
          tags.push(name);
        }
      }
    }

    const primaryCategory = categories[0] || "Digital Marketing";

    // Extract thumbnail/featured image if available
    let featuredImageUrl: string | undefined = undefined;
    const postMeta = post["wp:postmeta"];
    if (postMeta) {
      const metaList = Array.isArray(postMeta) ? postMeta : [postMeta];
      const thumbMeta = metaList.find((m) => m["wp:meta_key"] === "_thumbnail_id");
      if (thumbMeta) {
        const thumbId = parseInt(thumbMeta["wp:meta_value"], 10);
        if (thumbId && attachmentsMap.has(thumbId)) {
          featuredImageUrl = attachmentsMap.get(thumbId);
        }
      }
    }

    const fullPlainText = stripHtmlTags(rawContent);
    const readTime = calculateReadTime(fullPlainText);
    const sections = parseWpContentToSections(rawContent);

    // Extract key takeaways (first 3 bullet-worthy sentences or headings)
    const keyTakeaways = sections
      .flatMap((s) => s.body)
      .filter((b) => b.length > 20 && b.length < 150)
      .slice(0, 3);

    if (keyTakeaways.length === 0) {
      keyTakeaways.push(`Key insights from ${title}`);
    }

    const contentHtml = sanitizeArticleHtml(rawContent);

    const blogPost: BlogPost = {
      slug,
      title,
      summary,
      category: primaryCategory,
      readTime,
      publishedAt,
      dateFormatted,
      author,
      tags: tags.length > 0 ? tags : [primaryCategory],
      keyTakeaways,
      sections,
      contentHtml,
      cta: {
        badge: "Executive Insights",
        headline: `Transform Your Enterprise Strategy with ${primaryCategory}`,
        description: `Connect with our experts at Arav Innovations to discuss implementing solutions covered in ${title}.`,
        buttonText: "Schedule a Consultation",
        buttonHref: "/contact",
      },
      wpPostId: postId,
      featuredImageUrl,
    };

    migratedPosts.push(blogPost);
  }

  // CRITICAL REQUIREMENT: Sort migrated posts by original publication date, newest first!
  migratedPosts.sort((a, b) => {
    const timeA = new Date(a.publishedAt).getTime();
    const timeB = new Date(b.publishedAt).getTime();
    return (isNaN(timeB) ? 0 : timeB) - (isNaN(timeA) ? 0 : timeA);
  });

  const outputPath = path.join(process.cwd(), "data", "wordpress-posts.ts");
  const backupPath = path.join(process.cwd(), "data", "wordpress-posts.ts.bak");

  // Keep a recoverable backup of the current blog data before replacing anything
  if (fs.existsSync(outputPath)) {
    fs.copyFileSync(outputPath, backupPath);
    console.log(`[Parser] Created recoverable backup at: ${backupPath}`);
  }

  // Write updated data/wordpress-posts.ts
  const fileContent = `import { BlogPost } from "./insights";

export const totalPublishedPostsInXml = ${publishedPosts.length};

export const wordpressPostsData: BlogPost[] = ${JSON.stringify(migratedPosts, null, 2)};
`;

  fs.writeFileSync(outputPath, fileContent, "utf-8");
  console.log(`[Parser] Successfully migrated all ${migratedPosts.length} posts (newest first) to: ${outputPath}`);
}

runMigration();
