import { TrendingUp, Users, RefreshCw } from "lucide-react";
import type { CSSProperties } from "react";
import { Card } from "~/client/components/ui/card";
import { Progress } from "~/client/components/ui/progress";

function CampaignGoalCard() {
  const progress = 80;

  return (
    <Card.Root className="p-6">
      <div>
        <p className="text-sm font-semibold text-(--text-heading)">
          Meta da campanha
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {progress}% concluído
        </p>
      </div>

      <div className="flex flex-col gap-3">
        <div className="flex items-end justify-between">
          <div>
            <p className="text-xs text-muted-foreground">Arrecadado</p>
            <p className="text-2xl font-semibold text-(--text-heading)">
              R$ 48.200
            </p>
          </div>
          <div className="text-right">
            <p className="text-xs text-muted-foreground">Meta</p>
            <p className="text-sm text-muted-foreground">R$ 60.000</p>
          </div>
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
            R$ 11.800
          </p>
        </div>
        <div className="flex flex-col gap-1 rounded-xl border border-border p-4">
          <p className="text-xs text-muted-foreground">Crescimento</p>
          <div className="flex items-center gap-1">
            <TrendingUp
              size={15}
              className="text-[rgb(var(--spotlight-teal))]"
            />
            <p className="text-base font-semibold text-[rgb(var(--spotlight-teal))]">
              +12,8%
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-0.5 rounded-xl border border-border p-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Users size={14} /> Avulsos
          </div>
          <p className="text-base font-semibold text-(--text-heading)">1.284</p>
        </div>
        <div className="flex flex-col gap-0.5 rounded-xl border border-border p-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <RefreshCw size={14} /> Recorrentes
          </div>
          <p className="text-base font-semibold text-(--text-heading)">314</p>
        </div>
      </div>
    </Card.Root>
  );
}

export { CampaignGoalCard };
