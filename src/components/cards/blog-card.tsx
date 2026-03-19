import Link from "next/link";

import { Card } from "@/components/ui/card";
import { formatDate, resolveAssetUrl } from "@/lib/utils";
import { BlogPost } from "@/types/api";

type BlogCardProps = {
  post: BlogPost;
};

export function BlogCard({ post }: BlogCardProps) {
  const imageUrl = resolveAssetUrl(post.featured_image);
  const publishedDate = formatDate(post.published_at ?? post.created_at);

  return (
    <Card className="h-full overflow-hidden p-0">
      {imageUrl ? (
        <div className="aspect-[16/10] overflow-hidden border-b border-[var(--color-line)] bg-[var(--color-surface)]">
          <img
            alt={post.title}
            className="h-full w-full object-cover transition duration-500 hover:scale-[1.03]"
            src={imageUrl}
          />
        </div>
      ) : null}
      <div className="p-7">
        {publishedDate ? (
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
            {publishedDate}
          </p>
        ) : null}
        <h3 className="mt-4 text-2xl font-semibold tracking-[-0.04em] text-[var(--color-ink)]">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="mt-4 text-sm leading-7 text-[var(--color-muted)]">{post.excerpt}</p>
        <Link
          className="mt-6 inline-flex text-sm font-semibold text-[var(--color-ink)] transition hover:opacity-70"
          href={`/blog/${post.slug}`}
        >
          Read article
        </Link>
      </div>
    </Card>
  );
}
