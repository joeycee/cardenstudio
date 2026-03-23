"use client";

import { useEffect, useRef } from "react";

type AnimatedBlockProps = {
  children: React.ReactNode;
  delay: number;
  className?: string;
};

function useFadeIn(delay = 0) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.style.opacity = "0";
    el.style.transform = "translateY(18px)";
    el.style.transition = `opacity 0.7s ease ${delay}ms, transform 0.7s ease ${delay}ms`;

    const t = setTimeout(() => {
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 60);

    return () => clearTimeout(t);
  }, [delay]);

  return ref;
}

export function AnimatedBlock({ children, delay, className }: AnimatedBlockProps) {
  const ref = useFadeIn(delay);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
