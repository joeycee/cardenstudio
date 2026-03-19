import Link from "next/link";
import { notFound } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { getPortfolioProjectById } from "@/lib/api";
import { formatDate, resolveAssetUrl, splitParagraphs } from "@/lib/utils";

type WorkDetailPageProps = {
  params: Promise<{ id: string }>;
};

export async function generateMetadata({ params }: WorkDetailPageProps) {
  try {
    const { id } = await params;
    const project = await getPortfolioProjectById(id);

    if (!project) {
      return {
        title: "Work",
      };
    }

    return {
      title: project.title,
      description: project.short_description,
    };
  } catch {
    return {
      title: "Work",
    };
  }
}

export default async function WorkDetailPage({ params }: WorkDetailPageProps) {
  const { id } = await params;
  const project = await getPortfolioProjectById(id);

  if (!project) {
    notFound();
  }

  const imageUrl = resolveAssetUrl(project.featured_image);
  const paragraphs = splitParagraphs(project.full_description);
  const createdDate = formatDate(project.created_at);

  return (
    <article className="pb-20 pt-20 sm:pt-24">
      <Container className="max-w-5xl">
        <Link
          className="inline-flex text-sm font-semibold text-[var(--color-accent)] transition hover:opacity-70"
          href="/work"
        >
          Back to work
        </Link>

        <p className="mt-8 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-muted)]">
          {project.featured ? "Featured project" : "Project"}
        </p>
        <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-[var(--color-ink)] sm:text-5xl">
          {project.title}
        </h1>
        <p className="mt-8 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">
          {project.short_description}
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          {project.project_url ? (
            <Button href={project.project_url}>Visit project</Button>
          ) : null}
          {project.github_url ? (
            <Button href={project.github_url} variant="secondary">
              View GitHub
            </Button>
          ) : null}
        </div>

        {imageUrl ? (
          <div className="mt-12 overflow-hidden rounded-[2rem] border border-[var(--color-line)] bg-[var(--color-surface)]">
            <img alt={project.title} className="h-full w-full object-cover" src={imageUrl} />
          </div>
        ) : null}

        <div className="mt-12 grid gap-6 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="prose-copy space-y-0 text-[1.05rem] leading-9 text-[var(--color-ink)]">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <Card className="h-fit">
            <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-muted)]">
              Project details
            </p>
            <div className="mt-6 space-y-5">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                  ID
                </p>
                <p className="mt-2 text-sm text-[var(--color-ink)]">{project.id}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                  Slug
                </p>
                <p className="mt-2 break-all text-sm text-[var(--color-ink)]">{project.slug}</p>
              </div>
              {createdDate ? (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--color-muted)]">
                    Added
                  </p>
                  <p className="mt-2 text-sm text-[var(--color-ink)]">{createdDate}</p>
                </div>
              ) : null}
            </div>
          </Card>
        </div>
      </Container>
    </article>
  );
}
