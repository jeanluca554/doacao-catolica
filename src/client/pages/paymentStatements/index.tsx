import type { LucideIcon } from "lucide-react";
import {
  AlertCircle,
  AlertTriangle,
  Banknote,
  CheckCircle2,
  CirclePercent,
  Clock,
  Wifi,
  XCircle,
} from "lucide-react";
import { useLoaderData, useLocation, useMatches } from "react-router";
import { Card } from "~/client/components/ui/card";
import type { PaymentStatementsLoader } from "~/client/types/paymentStatementsLoader";
import { FilterDrawer } from "./components/filterDrawer";
import { PaymentsTable } from "./components/paymentsTable";
import { PERIOD_OPTIONS, PeriodSelect } from "./components/periodSelect";

type MetricColor =
  | "teal"
  | "primary"
  | "success"
  | "danger"
  | "info"
  | "accent"
  | "warning";

type MetricCardData = {
  label: string;
  value: string;
  icon: LucideIcon;
  color: MetricColor;
};

function PaymentStatementsPage() {
  const { metrics, donors } = useLoaderData<PaymentStatementsLoader>();

  const location = useLocation();
  const matches = useMatches();
  const period = new URLSearchParams(location.search).get("period") ?? "currentMonth";
  const periodLabel = PERIOD_OPTIONS.find((o) => o.value === period)?.label ?? "Mês atual";
  const campaignData = matches.find((m) => m.data && typeof m.data === "object" && "campaign" in m.data)?.data as { campaign: { name: string } } | undefined;
  const campaignName = campaignData?.campaign?.name;

  const metricCards: MetricCardData[] = [
    { label: "Total recebido online", value: metrics.receivedOnline, icon: Wifi, color: "teal" },
    { label: "Total liberado", value: metrics.released, icon: CheckCircle2, color: "success" },
    { label: "Aguardando liberação", value: metrics.awaitingRelease, icon: Clock, color: "warning" },
    { label: "Pendentes", value: metrics.pending, icon: AlertCircle, color: "info" },
    { label: "Total recebido offline", value: metrics.receivedOffline, icon: Banknote, color: "primary" },
    { label: "Em atraso", value: metrics.overdue, icon: AlertTriangle, color: "danger" },
    { label: "Cancelados", value: metrics.canceled, icon: XCircle, color: "danger" },
    { label: "Taxas aplicadas", value: metrics.appliedFees, icon: CirclePercent, color: "accent" },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="flex flex-col gap-0.5">
          <h1 className="text-2xl font-semibold tracking-tight text-(--text-heading)">
            Extratos de pagamentos
          </h1>
          <p className="text-sm text-muted-foreground">
            Exibindo{" "}
            <span className="font-medium text-foreground">{periodLabel}</span>
            {campaignName && <> · {campaignName}</>}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <PeriodSelect />
          <FilterDrawer donors={donors.data} />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {metricCards.map((metric) => (
          <Card.Root key={metric.label} className="gap-3 p-5">
            <Card.MetricHeader
              label={metric.label}
              icon={metric.icon}
              color={metric.color}
            />
            <Card.MetricValue>{metric.value}</Card.MetricValue>
          </Card.Root>
        ))}
      </div>
      <PaymentsTable />
    </div>
  );
}

export { PaymentStatementsPage };
