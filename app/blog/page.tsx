import { BlogCard } from "@/components/cards/blog-card";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { getBlogPosts } from "@/lib/api";

export const metadata = {
  title: "Blog",
};

export default async function BlogPage() {
  const posts = await getBlogPosts().catch(() => []);

  return (
    <section className="pb-20 pt-20 sm:pt-24">
      <Container>
        <SectionHeading
          eyebrow="Blog"
          title="Writing on web development, positioning, and building a stronger online presence."
          description="Published posts are fetched directly from the Django backend and presented with a clean, readable layout."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          {posts.length > 0 ? (
            posts.map((post) => <BlogCard key={post.id} post={post} />)
          ) : (
            <Card className="lg:col-span-2">
              <p className="text-sm leading-7 text-[var(--color-muted)]">
                No published blog posts are available yet.
              </p>
            </Card>
          )}
        </div>
      </Container>
    </section>
  );
}
