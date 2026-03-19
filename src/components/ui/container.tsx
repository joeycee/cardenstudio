import { ReactNode } from "react";

import { cn } from "@/lib/utils";

type ContainerProps = {
  children: ReactNode;
  className?: string;
};

export function Container({ children, className }: ContainerProps) {
  return (
    <div className={cn("mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12", className)}>
      {children}
    </div>
  );
}
