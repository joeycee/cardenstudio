import { notFound } from "next/navigation";

import { getBlogPost } from "@/lib/api";
import { formatDate, resolveAssetUrl } from "@/lib/utils";
import { BlogPost } from "@/types/api";
import { BlogDetailClient } from "./BlogDetailClient";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogDetailPageProps) {
  try {
    const { slug } = await params;
    const post = await getBlogPost(slug);
    return { title: post.title, description: post.excerpt };
  } catch {
    return { title: "Blog post" };
  }
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
  const { slug } = await params;

  let post: BlogPost;
  try {
    post = await getBlogPost(slug);
  } catch {
    notFound();
  }

  return (
    <BlogDetailClient
      post={post}
      imageUrl={resolveAssetUrl(post.featured_image)}
      publishedDate={formatDate(post.published_at ?? post.created_at)}
    />
  );
}