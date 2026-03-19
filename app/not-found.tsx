import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="pb-20 pt-24">
      <Container className="max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-muted)]">
          Not found
        </p>
        <h1 className="mt-6 text-4xl font-semibold tracking-[-0.05em] text-[var(--color-ink)]">
          This page doesn&apos;t exist.
        </h1>
        <p className="mt-6 text-lg leading-8 text-[var(--color-muted)]">
          The page may have moved, or the article may not be published.
        </p>
        <div className="mt-10 flex justify-center">
          <Button href="/">Back to home</Button>
        </div>
      </Container>
    </section>
  );
}
