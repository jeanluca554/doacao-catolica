import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentProps } from "react";

const badge = tv({
  base: "inline-flex h-5 items-center justify-center rounded-full px-3 text-xs font-normal",
  variants: {
    variant: {
      success:
        "bg-[rgba(var(--spotlight-success),0.1)] text-[rgb(var(--spotlight-success))]",
      danger:
        "bg-[rgba(var(--spotlight-danger),0.1)] text-[rgb(var(--spotlight-danger))]",
      warning:
        "bg-[rgba(var(--spotlight-warning),0.1)] text-[rgb(var(--spotlight-warning))]",
      info: "bg-[rgba(var(--spotlight-info),0.1)] text-[rgb(var(--spotlight-info))]",
    },
  },
  defaultVariants: {
    variant: "info",
  },
});

type BadgeVariants = VariantProps<typeof badge>;
type BadgeProps = ComponentProps<"span"> & BadgeVariants;

export function Badge({ className, variant, ...props }: BadgeProps) {
  return <span className={badge({ variant, className })} {...props} />;
}
