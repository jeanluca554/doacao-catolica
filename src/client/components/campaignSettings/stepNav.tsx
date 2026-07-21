import {
  CreditCard,
  FileText,
  Info,
  Mail,
  MessageCircle,
  Plug,
  Search,
  SlidersHorizontal,
} from "lucide-react";
import { Link } from "react-router";
import { cn } from "~/lib/utils";

type StepItem = {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  href?: string;
};

const STEPS: Omit<StepItem, "href">[] = [
  { icon: Info, label: "Informações Gerais", active: true },
  { icon: FileText, label: "Página da Campanha" },
  { icon: CreditCard, label: "Valores e Pagamento" },
  { icon: Mail, label: "Email" },
  { icon: Search, label: "Metadados SEO" },
  { icon: Plug, label: "Integrações" },
  { icon: MessageCircle, label: "Conexão WhatsApp" },
  { icon: SlidersHorizontal, label: "Preferências" },
];

const STEP_PATHS: Record<string, string> = {
  "Informações Gerais": "settings/general-info",
  "Valores e Pagamento": "settings/payment-methods",
};

function buildSteps(campaignId: string): StepItem[] {
  return STEPS.map((step) => ({
    ...step,
    href: STEP_PATHS[step.label]
      ? `/campaign/${campaignId}/${STEP_PATHS[step.label]}`
      : undefined,
  }));
}

function StepNav({ steps }: { steps: StepItem[] }) {
  return (
    <aside className="hidden lg:flex flex-col gap-2 w-60 shrink-0 sticky top-6 self-start">
      {steps.map(({ icon: Icon, label, active, href }) => {
        const className = cn(
          "flex items-center gap-3.5 rounded-[13px] px-4 py-3 text-base font-semibold transition-colors",
          active
            ? "bg-sidebar-primary text-white"
            : href
              ? "text-muted-foreground hover:bg-muted"
              : "text-muted-foreground cursor-default",
        );
        if (href && !active) {
          return (
            <Link key={label} to={href} className={className}>
              <Icon size={19} className="shrink-0" />
              {label}
            </Link>
          );
        }
        return (
          <div key={label} className={className}>
            <Icon size={19} className="shrink-0" />
            {label}
          </div>
        );
      })}
    </aside>
  );
}

function StepTabBar({ steps }: { steps: StepItem[] }) {
  return (
    <nav className="flex lg:hidden overflow-x-auto gap-1 pb-1">
      {steps.map(({ icon: Icon, label, active, href }) => {
        const className = cn(
          "flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold whitespace-nowrap shrink-0 transition-colors",
          active
            ? "bg-sidebar-primary text-white"
            : href
              ? "text-muted-foreground hover:bg-muted"
              : "text-muted-foreground/40 cursor-not-allowed",
        );
        if (href && !active) {
          return (
            <Link key={label} to={href} className={className}>
              <Icon size={15} className="shrink-0" />
              {label}
            </Link>
          );
        }
        return (
          <div key={label} className={className}>
            <Icon size={15} className="shrink-0" />
            {label}
          </div>
        );
      })}
    </nav>
  );
}

export { buildSteps, StepNav, StepTabBar };
