import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

type CtaSectionProps = {
  title: string;
  description: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function CtaSection({
  title,
  description,
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
}: CtaSectionProps) {
  return (
    <section className="py-20 sm:py-24">
      <Container>
        <div className="overflow-hidden rounded-[2rem] border border-[var(--color-line)] bg-[linear-gradient(180deg,rgba(255,255,255,0.92),rgba(242,237,230,0.82))] px-8 py-12 shadow-[0_24px_80px_rgba(15,23,42,0.08)] sm:px-12 sm:py-16">
          <div className="max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-muted)]">
              Start the right build
            </p>
            <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[var(--color-ink)] sm:text-4xl">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-8 text-[var(--color-muted)] sm:text-lg">
              {description}
            </p>
          </div>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button href={primaryHref}>{primaryLabel}</Button>
            {secondaryHref && secondaryLabel ? (
              <Button href={secondaryHref} variant="secondary">
                {secondaryLabel}
              </Button>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}
