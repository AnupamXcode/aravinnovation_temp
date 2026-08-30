import { list, put } from "@vercel/blob";
import { BlogPost } from "@/data/insights";

const VERCEL_BLOGS_BLOB_PATH = "blogs/index.json";

/**
 * Checks if Vercel Blob storage is properly configured via environment variables.
 */
export function isVercelBlobConfigured(): boolean {
  return Boolean(
    process.env.BLOB_READ_WRITE_TOKEN ||
      process.env.NEXT_PUBLIC_VERCEL_BLOGS_URL
  );
}

/**
 * Fetches remote blog posts stored in Vercel Blob storage or external Vercel endpoint.
 */
export async function fetchBlogsFromVercel(): Promise<BlogPost[]> {
  try {
    const customUrl = process.env.NEXT_PUBLIC_VERCEL_BLOGS_URL;
    if (customUrl && !customUrl.includes("xxxxxxxx")) {
      const res = await fetch(customUrl, { next: { revalidate: 60 } });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          return data as BlogPost[];
        }
      }
    }

    if (process.env.BLOB_READ_WRITE_TOKEN && !process.env.BLOB_READ_WRITE_TOKEN.includes("xxxxxxxx")) {
      const { blobs } = await list({ prefix: VERCEL_BLOGS_BLOB_PATH });
      const targetBlob = blobs.find((b) => b.pathname === VERCEL_BLOGS_BLOB_PATH);
      if (targetBlob) {
        const res = await fetch(targetBlob.url, { next: { revalidate: 60 } });
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            return data as BlogPost[];
          }
        }
      }
    }
  } catch (error) {
    console.warn("[Vercel Blogs] Failed to fetch blogs from Vercel Blob storage:", error);
  }

  return [];
}

/**
 * Uploads/Saves an updated array of blog posts to Vercel Blob storage.
 */
export async function saveBlogsToVercel(blogs: BlogPost[]): Promise<{ success: boolean; url?: string; error?: string }> {
  try {
    if (!process.env.BLOB_READ_WRITE_TOKEN || process.env.BLOB_READ_WRITE_TOKEN.includes("xxxxxxxx")) {
      return { success: false, error: "BLOB_READ_WRITE_TOKEN is not configured in environment variables." };
    }

    const payload = JSON.stringify(blogs, null, 2);
    const blob = await put(VERCEL_BLOGS_BLOB_PATH, payload, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
    });

    return { success: true, url: blob.url };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Unknown error during Vercel Blob upload";
    console.error("[Vercel Blogs] Error uploading blogs to Vercel Blob:", error);
    return { success: false, error: message };
  }
}
