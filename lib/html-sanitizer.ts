import DOMPurify from "isomorphic-dompurify";

/**
 * Clean WordPress Gutenberg comments and sanitize HTML output safely against XSS.
 */
export function sanitizeArticleHtml(rawHtml: string): string {
  if (!rawHtml) return "";

  // 1. Remove WordPress Gutenberg block comment annotations (e.g. <!-- wp:paragraph -->)
  let cleaned = rawHtml.replace(/<!--[\s\S]*?-->/g, "");

  // 2. Configure DOMPurify strict whitelist for rich article rendering
  const sanitized = DOMPurify.sanitize(cleaned, {
    ALLOWED_TAGS: [
      "p", "h1", "h2", "h3", "h4", "h5", "h6",
      "a", "strong", "b", "em", "i", "u", "s", "sub", "sup",
      "ul", "ol", "li",
      "blockquote", "cite", "pre", "code",
      "br", "hr",
      "img", "figure", "figcaption",
      "table", "thead", "tbody", "tfoot", "tr", "th", "td",
      "span", "div",
      "iframe", "video", "audio", "source"
    ],
    ALLOWED_ATTR: [
      "href", "target", "rel", "title", "alt", "src", "srcset", "sizes",
      "class", "id", "width", "height", "loading", "decoding",
      "frameborder", "allow", "allowfullscreen", "controls", "autoplay", "loop", "muted"
    ],
    ADD_ATTR: ["target", "rel"],
  });

  return sanitized;
}
