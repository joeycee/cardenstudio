import { notFound } from "next/navigation";

import { Container } from "@/components/ui/container";
import { getBlogPost } from "@/lib/api";
import { formatDate, resolveAssetUrl } from "@/lib/utils";
import { BlogPost } from "@/types/api";

type BlogDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: BlogDetailPageProps) {
  try {
    const { slug } = await params;
    const post = await getBlogPost(slug);

    return {
      title: post.title,
      description: post.excerpt,
    };
  } catch {
    return {
      title: "Blog post",
    };
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

  const imageUrl = resolveAssetUrl(post.featured_image);
  const publishedDate = formatDate(post.published_at ?? post.created_at);

  return (
    <article className="pb-20 pt-20 sm:pt-24">
      <Container className="max-w-4xl">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-muted)]">
          Journal
        </p>
        <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] text-[var(--color-ink)] sm:text-5xl">
          {post.title}
        </h1>
        {publishedDate ? (
          <p className="mt-6 text-sm text-[var(--color-muted)]">{publishedDate}</p>
        ) : null}
        <p className="mt-8 text-lg leading-8 text-[var(--color-muted)]">{post.excerpt}</p>
        {imageUrl ? (
          <div className="mt-10 overflow-hidden rounded-[2rem] border border-[var(--color-line)]">
            <img alt={post.title} className="h-full w-full object-cover" src={imageUrl} />
          </div>
        ) : null}
        <div
          className="prose-copy mt-12 space-y-0 text-[1.05rem] leading-9 text-[var(--color-ink)]"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </Container>
    </article>
  );
}
