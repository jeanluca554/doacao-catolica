import { TrendingUp, TrendingDown, Users, RefreshCw } from "lucide-react";
import type { CSSProperties } from "react";
import { Card } from "~/client/components/ui/card";
import { Progress } from "~/client/components/ui/progress";
import { formatCurrency } from "~/lib/formatCurrency";

type CampaignGoalCardProps = {
  totalRaised: number;
  totalGoal: number | null;
  totalGoalProgressPercentage: number | null;
  totalGoalRemaining: number | null;
  growthPercentage: number | null;
  oneTimeCustomers: number;
  recurringCustomers: number;
};

function CampaignGoalCard({
  totalRaised,
  totalGoal,
  totalGoalProgressPercentage,
  totalGoalRemaining,
  growthPercentage,
  oneTimeCustomers,
  recurringCustomers,
}: CampaignGoalCardProps) {
  const progress = totalGoalProgressPercentage ?? 0;
  const GrowthIcon =
    growthPercentage !== null && growthPercentage >= 0
      ? TrendingUp
      : TrendingDown;
  const growthColor =
    growthPercentage !== null && growthPercentage >= 0
      ? "text-[rgb(var(--spotlight-teal))]"
      : "text-[rgb(var(--spotlight-danger))]";

  return (
    <Card.Root className="p-6">
      <div>
        <p className="text-sm font-semibold text-(--text-heading)">
          Meta da campanha
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {totalGoalProgressPercentage !== null
            ? `${Math.round(totalGoalProgressPercentage)}% concluído`
            : "meta não configurada"}
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Arrecadado</p>
            <p className="text-2xl font-semibold text-(--text-heading)">
              {formatCurrency(String(totalRaised))}
            </p>
          </div>
          {totalGoal !== null && (
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Meta</p>
              <p className="text-sm text-muted-foreground">
                {formatCurrency(String(totalGoal))}
              </p>
            </div>
          )}
        </div>

        <Progress
          value={progress}
          className="h-2.5 bg-(--sidebar-accent-foreground)/20"
          style={
            {
              "--progress-foreground": "var(--sidebar-accent-foreground)",
            } as CSSProperties
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-3.5">
        <div className="flex flex-col gap-1 rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground">Faltam</p>
          <p className="text-base font-semibold text-(--text-heading)">
            {totalGoalRemaining !== null ? formatCurrency(String(totalGoalRemaining)) : "–"}
          </p>
        </div>
        <div className="flex flex-col gap-1 rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground">Crescimento</p>
          {growthPercentage !== null ? (
            <div className="flex items-center gap-1">
              <GrowthIcon size={15} className={growthColor} />
              <p className={`text-base font-semibold ${growthColor}`}>
                {growthPercentage >= 0 ? "+" : ""}
                {growthPercentage.toLocaleString("pt-BR", {
                  maximumFractionDigits: 1,
                })}
                %
              </p>
            </div>
          ) : (
            <p className="text-base font-semibold text-muted-foreground">–</p>
          )}
        </div>
        <div className="flex flex-col gap-0.5 rounded-xl border border-border p-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users size={14} /> Avulsos
          </div>
          <p className="text-base font-semibold text-(--text-heading)">
            {oneTimeCustomers.toLocaleString("pt-BR")}
          </p>
        </div>
        <div className="flex flex-col gap-0.5 rounded-xl border border-border p-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <RefreshCw size={14} /> Recorrentes
          </div>
          <p className="text-base font-semibold text-(--text-heading)">
            {recurringCustomers.toLocaleString("pt-BR")}
          </p>
        </div>
      </div>
    </Card.Root>
  );
}

export { CampaignGoalCard };
