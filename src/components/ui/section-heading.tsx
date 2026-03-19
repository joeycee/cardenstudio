type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: SectionHeadingProps) {
  const alignment = align === "center" ? "mx-auto max-w-3xl text-center" : "max-w-3xl";

  return (
    <div className={alignment}>
      {eyebrow ? (
        <p className="mb-4 text-xs font-semibold uppercase tracking-[0.32em] text-[var(--color-muted)]">
          {eyebrow}
        </p>
      ) : null}
      <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--color-ink)] sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="mt-5 text-base leading-8 text-[var(--color-muted)] sm:text-lg">
          {description}
        </p>
      ) : null}
    </div>
  );
}
