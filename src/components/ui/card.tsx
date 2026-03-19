import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type CardProps = {
  children: ReactNode;
  className?: string;
};

export function Card({ children, className }: CardProps) {
  return (
    <div
      className={cn(
        "rounded-[2rem] border border-[var(--color-line)] bg-[var(--color-surface)] p-7 shadow-[0_18px_60px_rgba(0,0,0,0.2)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
