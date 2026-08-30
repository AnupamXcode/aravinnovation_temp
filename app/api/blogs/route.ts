import { NextResponse } from "next/server";
import { fetchBlogsFromVercel, saveBlogsToVercel, isVercelBlobConfigured } from "@/lib/vercel-blogs";
import { blogPostsData, BlogPost } from "@/data/insights";

export async function GET() {
  try {
    const vercelBlogs = isVercelBlobConfigured() ? await fetchBlogsFromVercel() : [];
    
    // Merge remote blogs with local fallback, avoiding duplicate slugs
    const existingSlugs = new Set(vercelBlogs.map((b) => b.slug));
    const mergedBlogs = [
      ...vercelBlogs,
      ...blogPostsData.filter((localBlog) => !existingSlugs.has(localBlog.slug)),
    ];

    return NextResponse.json({
      success: true,
      source: vercelBlogs.length > 0 ? "vercel-blob" : "local-fallback",
      count: mergedBlogs.length,
      data: mergedBlogs,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to retrieve blogs";
    return NextResponse.json(
      { success: false, error: message, data: blogPostsData },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const newPosts: BlogPost[] = Array.isArray(body) ? body : [body];

    const currentVercelBlogs = await fetchBlogsFromVercel();
    const existingSlugs = new Set(currentVercelBlogs.map((b) => b.slug));

    const updatedBlogs = [...currentVercelBlogs];
    for (const post of newPosts) {
      if (!post.slug || !post.title) {
        return NextResponse.json(
          { success: false, error: "Invalid blog post payload. Missing slug or title." },
          { status: 400 }
        );
      }
      if (existingSlugs.has(post.slug)) {
        const index = updatedBlogs.findIndex((b) => b.slug === post.slug);
        if (index !== -1) updatedBlogs[index] = post;
      } else {
        updatedBlogs.push(post);
        existingSlugs.add(post.slug);
      }
    }

    const result = await saveBlogsToVercel(updatedBlogs);
    if (!result.success) {
      return NextResponse.json(
        { success: false, error: result.error },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Blog post(s) successfully imported/saved to Vercel storage.",
      url: result.url,
      totalCount: updatedBlogs.length,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to save blog post to Vercel";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}
