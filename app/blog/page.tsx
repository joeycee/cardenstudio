import { BlogTimeline } from "./timeline";
import { getBlogPosts } from "@/lib/api";

export const metadata = {
  title: "Blog · Carden Studio",
};

export default async function BlogPage() {
  const posts = await getBlogPosts().catch(() => []);

  return <BlogTimeline posts={posts} />;
}
