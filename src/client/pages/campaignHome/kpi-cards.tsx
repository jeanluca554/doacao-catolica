import { DollarSign, Users, Target, Receipt } from "lucide-react";
import { Card } from "~/client/components/ui/card";

function KpiCards() {
  return (
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      <Card.Root className="gap-4 p-6">
        <Card.MetricHeader
          label="Total arrecadado"
          icon={DollarSign}
          color="success"
        />
        <div className="flex flex-col gap-1">
          <Card.MetricValue>R$ 48.200</Card.MetricValue>
          <span className="text-xs text-muted-foreground">Meta: R$ 60.000</span>
        </div>
      </Card.Root>

      <Card.Root className="gap-4 p-6">
        <Card.MetricHeader label="Apoiadores" icon={Users} color="info" />
        <div className="flex flex-col gap-1">
          <Card.MetricValue>421</Card.MetricValue>
          <Card.MetricTrend value="+28 nos últimos 7 dias" direction="up" />
        </div>
      </Card.Root>

      <Card.Root className="gap-4 p-6">
        <Card.MetricHeader label="Progresso" icon={Target} color="primary" />
        <div className="flex flex-col gap-1">
          <Card.MetricValue>80%</Card.MetricValue>
          <span className="text-xs text-muted-foreground">da meta total</span>
        </div>
      </Card.Root>

      <Card.Root className="gap-4 p-6">
        <Card.MetricHeader label="Ticket médio" icon={Receipt} color="teal" />
        <div className="flex flex-col gap-1">
          <Card.MetricValue>R$ 114</Card.MetricValue>
          <Card.MetricTrend value="+4,3% vs. semana anterior" direction="up" />
        </div>
      </Card.Root>
    </div>
  );
}

export { KpiCards };
