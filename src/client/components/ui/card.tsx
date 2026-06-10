import { cn } from "~/lib/utils";
import type { ComponentProps } from "react";

function Root({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 rounded-lg bg-(--card) p-8 shadow-[0px_0px_30px_0px_rgba(0,0,0,0.05)]",
        className
      )}
      {...props}
    />
  );
}

function Header({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex flex-wrap items-center justify-between gap-5", className)}
      {...props}
    />
  );
}

function Content({ className, ...props }: ComponentProps<"div">) {
  return <div className={cn("flex flex-col gap-6", className)} {...props} />;
}

function Footer({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn("flex items-center border-t border-(--border) pt-5", className)}
      {...props}
    />
  );
}

export const Card = { Root, Header, Content, Footer };
