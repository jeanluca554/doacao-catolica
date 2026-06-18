import { createContext, use } from "react";
import { tv, type VariantProps } from "tailwind-variants";
import type { ComponentProps } from "react";

const alert = tv({
  slots: {
    root: "grid grid-cols-[min-content_1fr] gap-x-3 gap-y-1 p-4 rounded-lg border w-full",
    icon: "row-span-2 shrink-0 mt-0.5",
    title: "col-start-2 font-semibold text-sm leading-none",
    description: "col-start-2 text-sm leading-relaxed",
  },
  variants: {
    variant: {
      default: {
        root: "bg-background text-foreground border-border",
        icon: "text-foreground",
      },
      warning: {
        root: "border-orange-300 bg-orange-50 dark:border-orange-700 dark:bg-orange-950/40",
        icon: "text-orange-500 dark:text-orange-400",
        title: "text-orange-900 dark:text-orange-100",
        description: "text-orange-800 dark:text-orange-200",
      },
      destructive: {
        root: "border-destructive/30 bg-destructive/10",
        icon: "text-destructive",
        title: "text-destructive",
        description: "text-destructive/80",
      },
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

type AlertVariants = VariantProps<typeof alert>;

const AlertContext = createContext<AlertVariants["variant"]>("default");

type AlertRootProps = ComponentProps<"div"> & AlertVariants;
function Root({ variant = "default", className, children, ...props }: AlertRootProps) {
  const { root } = alert({ variant });
  return (
    <AlertContext.Provider value={variant}>
      <div role="alert" className={root({ className })} {...props}>
        {children}
      </div>
    </AlertContext.Provider>
  );
}

function Icon({ className, children, ...props }: ComponentProps<"span">) {
  const variant = use(AlertContext);
  const { icon } = alert({ variant });
  return (
    <span className={icon({ className })} {...props}>
      {children}
    </span>
  );
}

function Title({ className, ...props }: ComponentProps<"p">) {
  const variant = use(AlertContext);
  const { title } = alert({ variant });
  return <p className={title({ className })} {...props} />;
}

function Description({ className, ...props }: ComponentProps<"p">) {
  const variant = use(AlertContext);
  const { description } = alert({ variant });
  return <p className={description({ className })} {...props} />;
}

export const Alert = { Root, Icon, Title, Description };
