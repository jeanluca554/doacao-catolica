import { Eye, UserPlus, Heart } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { Card } from "~/client/components/ui/card";
import { Progress } from "~/client/components/ui/progress";

const FUNNEL_STEPS: Array<{
  label: string;
  value: number;
  pct: string | null;
  color: string;
  icon: LucideIcon;
}> = [
  {
    label: "Visitas na página",
    value: 12480,
    pct: null,
    color: "#5b4eff",
    icon: Eye,
  },
  {
    label: "Cadastros efetuados",
    value: 1840,
    pct: "15% da etapa anterior",
    color: "#74e7bb",
    icon: UserPlus,
  },
  {
    label: "Doações concluídas",
    value: 1052,
    pct: "57% da etapa anterior",
    color: "#6bceff",
    icon: Heart,
  },
];

function ConversionFunnelCard() {
  const maxValue = FUNNEL_STEPS[0].value;

  return (
    <Card.Root className="p-6">
      <div>
        <p className="text-sm font-semibold text-(--text-heading)">
          Funil de conversão
        </p>
        <p className="text-xs text-muted-foreground">
          Visitas na página até doações concluídas no período.
        </p>
      </div>

      <div className="flex flex-col gap-5">
        {FUNNEL_STEPS.map((step) => {
          const barWidth = Math.round((step.value / maxValue) * 100);
          const Icon = step.icon;
          return (
            <div key={step.label} className="flex flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-(--sidebar-accent-foreground)/10">
                    <Icon
                      size={16}
                      className="text-sidebar-accent-foreground"
                    />
                  </div>
                  <span className="text-sm text-(--text-heading)">
                    {step.label}
                  </span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-(--text-heading)">
                    {step.value.toLocaleString("pt-BR")}
                  </p>
                  {step.pct && (
                    <p className="text-[11px] text-muted-foreground">
                      {step.pct}
                    </p>
                  )}
                </div>
              </div>
              <Progress
                value={barWidth}
                className="h-3.5 bg-muted"
                style={
                  { "--progress-foreground": step.color } as CSSProperties
                }
              />
            </div>
          );
        })}
      </div>
    </Card.Root>
  );
}

export { ConversionFunnelCard };
