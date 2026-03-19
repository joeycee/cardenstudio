"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Container } from "@/components/ui/container";

import { Logo } from "@/components/ui/logo";

const navigation = [
  { href: "/about", label: "About" },
  { href: "/offerings", label: "Expertise" },
  { href: "/blog", label: "Blog" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur-xl backdrop-saturate-150"
      style={{
        background:
          "linear-gradient(180deg, rgba(42,52,57,0.94) 0%, rgba(31,38,42,0.92) 100%)",
        borderColor: "rgba(74, 86, 94, 0.65)",
      }}
    >
      <Container className="flex h-16 items-center justify-between gap-8">
        <Link href="/" aria-label="Carden Studio home" className="flex shrink-0 items-center">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {navigation.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className={[
                  "relative rounded-md px-3 py-1.5 text-sm transition-colors duration-150",
                  active
                    ? "font-semibold text-[var(--color-text-primary)]"
                    : "font-normal text-[var(--color-text-secondary)] hover:bg-[rgba(107,138,153,0.14)] hover:text-[var(--color-text-primary)]",
                ].join(" ")}
              >
                {label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-px h-[1.5px] rounded-full bg-[var(--color-accent)]" />
                )}
              </Link>
            );
          })}
        </nav>

        <Link
          href="/contact"
          className="hidden shrink-0 items-center rounded-full border border-[var(--color-accent-warm)] bg-[var(--color-accent-warm)] px-4 py-2 text-sm font-semibold text-[var(--color-white)] transition-all duration-150 hover:bg-[var(--color-accent-warm-hover)] md:inline-flex"
        >
          Book a project
        </Link>

        <button
          aria-label="Open menu"
          className="inline-flex h-9 w-9 items-center justify-center rounded-md text-[var(--color-text-primary)] transition-colors duration-150 hover:bg-[rgba(107,138,153,0.14)] md:hidden"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
            <line x1="2" y1="5" x2="16" y2="5" />
            <line x1="2" y1="9" x2="16" y2="9" />
            <line x1="2" y1="13" x2="16" y2="13" />
          </svg>
        </button>
      </Container>
    </header>
  );
}
