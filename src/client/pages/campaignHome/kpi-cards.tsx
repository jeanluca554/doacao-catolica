import { DollarSign, Users, Target, Receipt } from "lucide-react";
import { Card } from "~/client/components/ui/card";
import { formatCurrency } from "~/lib/formatCurrency";

type KpiCardsProps = {
  totalRaised: number;
  supporters: number;
  newSupportersLast7Days: number;
  totalGoal: number | null;
  totalGoalProgressPercentage: number | null;
  averageTicketMonth: number;
  averageTicketVariationPercentage: number | null;
};

function KpiCards({
  totalRaised,
  supporters,
  newSupportersLast7Days,
  totalGoal,
  totalGoalProgressPercentage,
  averageTicketMonth,
  averageTicketVariationPercentage,
}: KpiCardsProps) {
  const progressLabel =
    totalGoalProgressPercentage !== null
      ? `${Math.round(totalGoalProgressPercentage)}%`
      : "–";

  const variationDirection =
    averageTicketVariationPercentage !== null &&
    averageTicketVariationPercentage >= 0
      ? "up"
      : "down";

  const variationLabel =
    averageTicketVariationPercentage !== null
      ? `${averageTicketVariationPercentage >= 0 ? "+" : ""}${averageTicketVariationPercentage.toLocaleString("pt-BR", { maximumFractionDigits: 1 })}% vs. mês anterior`
      : null;

  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      <Card.Root className="gap-4 p-6">
        <Card.MetricHeader
          label="Total arrecadado"
          icon={DollarSign}
          color="success"
        />
        <div className="flex flex-col gap-1">
          <Card.MetricValue>{formatCurrency(String(totalRaised))}</Card.MetricValue>
          {totalGoal !== null && (
            <span className="text-xs text-muted-foreground">
              Meta: {formatCurrency(String(totalGoal))}
            </span>
          )}
        </div>
      </Card.Root>

      <Card.Root className="gap-4 p-6">
        <Card.MetricHeader label="Apoiadores" icon={Users} color="info" />
        <div className="flex flex-col gap-1">
          <Card.MetricValue>
            {supporters.toLocaleString("pt-BR")}
          </Card.MetricValue>
          <Card.MetricTrend
            value={`+${newSupportersLast7Days} nos últimos 7 dias`}
            direction="up"
          />
        </div>
      </Card.Root>

      <Card.Root className="gap-4 p-6">
        <Card.MetricHeader label="Progresso" icon={Target} color="primary" />
        <div className="flex flex-col gap-1">
          <Card.MetricValue>{progressLabel}</Card.MetricValue>
          <span className="text-xs text-muted-foreground">
            {totalGoalProgressPercentage !== null
              ? "da meta total"
              : "meta não configurada"}
          </span>
        </div>
      </Card.Root>

      <Card.Root className="gap-4 p-6">
        <Card.MetricHeader label="Ticket médio" icon={Receipt} color="teal" />
        <div className="flex flex-col gap-1">
          <Card.MetricValue>{formatCurrency(String(averageTicketMonth))}</Card.MetricValue>
          {variationLabel && (
            <Card.MetricTrend
              value={variationLabel}
              direction={variationDirection}
            />
          )}
        </div>
      </Card.Root>
    </div>
  );
}

export { KpiCards };
