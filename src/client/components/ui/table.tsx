import { cn } from "~/lib/utils";
import type { ComponentProps } from "react";

function Root({ className, ...props }: ComponentProps<"table">) {
  return (
    <div className="relative w-full overflow-hidden rounded-md">
      <table className={cn("w-full text-sm", className)} {...props} />
    </div>
  );
}

function Header({ className, ...props }: ComponentProps<"thead">) {
  return (
    <thead
      className={cn("bg-(--card-foreground-secondary)", className)}
      {...props}
    />
  );
}

function Body({ className, ...props }: ComponentProps<"tbody">) {
  return (
    <tbody
      className={cn(
        "[&>tr]:h-16 [&>tr:nth-child(odd)]:bg-(--card-foreground-primary)",
        className
      )}
      {...props}
    />
  );
}

function Row({ className, ...props }: ComponentProps<"tr">) {
  return <tr className={cn("transition-colors", className)} {...props} />;
}

function Head({ className, ...props }: ComponentProps<"th">) {
  return (
    <th
      className={cn(
        "h-11 px-4 text-left align-middle font-semibold text-sm text-(--text-heading) whitespace-nowrap",
        className
      )}
      {...props}
    />
  );
}

function Cell({ className, ...props }: ComponentProps<"td">) {
  return (
    <td
      className={cn(
        "px-4 align-middle text-sm text-(--text-body) whitespace-nowrap",
        className
      )}
      {...props}
    />
  );
}

export const Table = { Root, Header, Body, Row, Head, Cell };
