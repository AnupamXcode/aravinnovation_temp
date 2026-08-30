import { wordpressMigrationPreviewData } from "../data/wordpress-migration-preview";

async function checkImages() {
  console.log("Checking featured image URLs for 3 test blogs...");
  for (const post of wordpressMigrationPreviewData) {
    console.log(`\nPost: ${post.title}`);
    console.log(`URL: ${post.featuredImageUrl}`);
    if (!post.featuredImageUrl) {
      console.log("-> No featured image URL");
      continue;
    }
    try {
      const res = await fetch(post.featuredImageUrl, { method: "HEAD" });
      console.log(`-> HTTP Status: ${res.status} ${res.statusText}`);
    } catch (err: any) {
      console.log(`-> Fetch Error: ${err.message}`);
    }
  }
}

checkImages();
