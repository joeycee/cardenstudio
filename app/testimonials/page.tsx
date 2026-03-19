import { TestimonialCard } from "@/components/cards/testimonial-card";
import { Container } from "@/components/ui/container";
import { getTestimonials } from "@/lib/api";

export const metadata = {
  title: "Testimonials · Carden Studio",
};

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials().catch(() => []);

  return (
    <>
      {/* ── PAGE HEADER ──────────────────────────────────────────────────── */}
      <section className="pb-12 pt-16 sm:pt-20">
        <Container>
          <div className="flex items-center gap-3">
            <span className="inline-block h-px w-8" style={{ background: "var(--color-accent)" }} />
            <p className="text-xs font-semibold uppercase tracking-[0.32em]" style={{ color: "var(--color-accent)" }}>
              Testimonials
            </p>
          </div>
          <h1
            className="display-copy mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl"
            style={{ color: "var(--color-ink)" }}
          >
            A polished project is only part of the story.
          </h1>
          <p className="mt-4 max-w-lg text-base leading-8" style={{ color: "var(--color-muted)" }}>
            The working relationship matters too — clear communication, sensible decisions, and a
            process that keeps momentum high from first conversation to launch.
          </p>
        </Container>
      </section>

      {/* ── TESTIMONIALS GRID ────────────────────────────────────────────── */}
      <section
        className="pb-28 pt-20"
        style={{
          background: "var(--color-surface)",
          borderTop: "1px solid var(--color-line)",
        }}
      >
        <Container>
          {testimonials.length > 0 ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {testimonials.map((testimonial) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} />
              ))}
            </div>
          ) : (
            /* Placeholder state — looks designed, not broken */
            <div className="grid gap-6 lg:grid-cols-2">
              {[
                {
                  quote: "The site launched on time and immediately felt like the premium product we wanted. Exactly what we needed from a studio partner.",
                  author: "Client name",
                  role: "Founder, Studio Co.",
                },
                {
                  quote: "Working directly with the founder meant fast decisions, no fluff, and a result we're genuinely proud to show prospects.",
                  author: "Client name",
                  role: "Director, Agency Ltd.",
                },
                {
                  quote: "Practical, clear, and beautifully built. The process was as calm and considered as the final product.",
                  author: "Client name",
                  role: "CEO, Startup NZ",
                },
                {
                  quote: "We came in with a rough brief and left with a sharp, credible web presence that's already converting better than the old site.",
                  author: "Client name",
                  role: "Co-founder, Ventures AU",
                },
              ].map((t) => (
                <div
                  key={t.author + t.role}
                  className="rounded-2xl p-8"
                  style={{
                    background: "var(--color-bg)",
                    border: "1px solid var(--color-line)",
                  }}
                >
                  <p
                    className="font-serif text-4xl leading-none"
                    style={{ color: "var(--color-accent)", opacity: 0.5 }}
                  >
                    &ldquo;
                  </p>
                  <p
                    className="mt-3 text-base leading-[1.85]"
                    style={{ color: "var(--color-ink)" }}
                  >
                    {t.quote}
                  </p>
                  <div
                    className="mt-6 flex items-center gap-4 border-t pt-6"
                    style={{ borderColor: "var(--color-line)" }}
                  >
                    <div
                      className="h-9 w-9 shrink-0 rounded-full"
                      style={{ background: "var(--color-accent-light)" }}
                    />
                    <div>
                      <p className="text-sm font-semibold" style={{ color: "var(--color-ink)" }}>
                        {t.author}
                      </p>
                      <p className="text-xs" style={{ color: "var(--color-muted)" }}>
                        {t.role}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Container>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden py-28"
        style={{
          background: "linear-gradient(135deg, #1B3D5F 0%, #2B6CB0 60%, #4A8DB5 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{ background: "rgba(255,255,255,0.15)" }}
        />
        <Container className="relative">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-white/50">
              Ready to get started?
            </p>
            <h2 className="display-copy mt-5 text-4xl font-semibold tracking-[-0.03em] text-white sm:text-5xl">
              Add your own story to the list.
            </h2>
            <p className="mt-6 text-base leading-8 text-white/65">
              If you want a studio site, service business website, or custom web app that feels
              polished and commercially clear, this is a good place to start.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center rounded-full px-6 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-lg"
                style={{ background: "#fff", color: "#1B3D5F" }}
              >
                Book an introduction
              </a>
              <a
                href="/about"
                className="inline-flex items-center rounded-full border px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/10"
                style={{ borderColor: "rgba(255,255,255,0.3)" }}
              >
                About the studio
              </a>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}