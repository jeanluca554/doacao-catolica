import { Slot } from "@radix-ui/react-slot";
import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentProps } from "react";

const button = tv({
  base: [
    "inline-flex items-center justify-center gap-2",
    "rounded-md font-semibold text-sm",
    "min-h-11 px-4 py-2 w-full",
    "transition-[filter] duration-150",
    "disabled:opacity-50 disabled:cursor-not-allowed",
    "cursor-pointer",
  ],
  variants: {
    variant: {
      default:
        "bg-[rgb(var(--spotlight-primary))] text-white hover:brightness-95",
      outline:
        "border border-(--border) bg-transparent text-(--text-body) hover:brightness-95",
      ghost: "bg-transparent text-(--text-body) hover:brightness-95",
      danger:
        "bg-[rgb(var(--spotlight-danger))] text-white hover:brightness-95",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type ButtonVariants = VariantProps<typeof button>;

type ButtonProps = ComponentProps<"button"> &
  ButtonVariants & {
    asChild?: boolean;
    isLoading?: boolean;
  };

export function Button({
  className,
  variant,
  asChild = false,
  isLoading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      disabled={isLoading || disabled}
      className={button({ variant, className })}
      {...props}
    >
      {isLoading ? "Carregando..." : children}
    </Comp>
  );
}
