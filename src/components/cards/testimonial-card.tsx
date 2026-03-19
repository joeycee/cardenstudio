import { Card } from "@/components/ui/card";
import { resolveAssetUrl } from "@/lib/utils";
import { Testimonial } from "@/types/api";

type TestimonialCardProps = {
  testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  const imageUrl = resolveAssetUrl(testimonial.client_image);
  const stars = Array.from({ length: testimonial.rating ?? 5 }, () => "★").join("");

  return (
    <Card className="h-full">
      <div className="flex items-start gap-4">
        {imageUrl ? (
          <img
            alt={testimonial.client_name}
            className="h-14 w-14 rounded-full object-cover"
            src={imageUrl}
          />
        ) : (
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-surface)] text-sm font-semibold text-[var(--color-muted)]">
            {testimonial.client_name
              .split(" ")
              .map((part) => part[0])
              .join("")
              .slice(0, 2)}
          </div>
        )}
        <div>
          <p className="text-sm font-semibold tracking-[0.18em] text-[#2B6CB0]">
            {stars}
          </p>
          <h3 className="mt-2 text-lg font-semibold text-[var(--color-ink)]">
            {testimonial.client_name}
          </h3>
          <p className="text-sm text-[var(--color-muted)]">
            {testimonial.role}, {testimonial.business_name}
          </p>
        </div>
      </div>
      <p className="mt-6 text-base leading-8 text-[var(--color-ink)]">
        &ldquo;{testimonial.quote}&rdquo;
      </p>
    </Card>
  );
}
