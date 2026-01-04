import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center justify-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-center cursor-default",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary:
          "border-border/50 bg-secondary text-secondary-foreground hover:bg-secondary/80 dark:border-transparent",
        destructive:
          "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
        outline: "text-foreground bg-background",
        success:
          "border-green-200 bg-green-100 text-green-700 hover:bg-green-100/80 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-400",
        warning:
          "border-amber-200 bg-amber-100 text-amber-700 hover:bg-amber-100/80 dark:border-amber-900/30 dark:bg-amber-900/20 dark:text-amber-400",
        info: "border-blue-200 bg-blue-100 text-blue-700 hover:bg-blue-100/80 dark:border-blue-900/30 dark:bg-blue-900/20 dark:text-blue-400",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
