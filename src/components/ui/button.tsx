import Link from "next/link";
import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ButtonProps = {
  children: ReactNode;
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const variants = {
  primary:
    "bg-[var(--color-accent-warm)] text-[var(--color-white)] shadow-[0_14px_40px_rgba(209,121,66,0.24)] hover:-translate-y-0.5 hover:bg-[var(--color-accent-warm-hover)]",
  secondary:
    "border border-[var(--color-line)] bg-[var(--color-surface)] text-[var(--color-ink)] hover:-translate-y-0.5 hover:border-[var(--color-border-soft)] hover:bg-[var(--color-surface-light)]",
  ghost:
    "text-[var(--color-ink)] hover:bg-[var(--color-surface-light)]",
};

const baseClassName =
  "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold tracking-[0.02em] transition duration-200 disabled:cursor-not-allowed disabled:opacity-60";

export function Button({
  children,
  href,
  variant = "primary",
  className,
  type = "button",
  disabled,
}: ButtonProps) {
  const classes = cn(baseClassName, variants[variant], className);

  if (href) {
    return (
      <Link className={classes} href={href}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled} type={type}>
      {children}
    </button>
  );
}
