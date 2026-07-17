import { Bar } from "react-chartjs-2";
import { Card } from "~/client/components/ui/card";
import { BASE_CHART_OPTIONS } from "./chart-setup";

const RECURRENCE_MONTHS = [
  "Jul/25",
  "Ago/25",
  "Set/25",
  "Out/25",
  "Nov/25",
  "Dez/25",
  "Jan/26",
  "Fev/26",
  "Mar/26",
  "Abr/26",
  "Mai/26",
  "Jun/26",
];
const RECURRENCE_ACTIVE = [
  280, 295, 310, 290, 302, 318, 312, 305, 295, 304, 311, 314,
];
const RECURRENCE_REALIZED = [
  265, 280, 298, 275, 290, 305, 298, 291, 280, 289, 300, 310,
];

function MonthlyRecurrenceCard() {
  const data = {
    labels: RECURRENCE_MONTHS,
    datasets: [
      {
        label: "Assinaturas ativas",
        data: RECURRENCE_ACTIVE,
        backgroundColor: "#5b4eff",
        borderRadius: 4,
        barPercentage: 0.92,
        categoryPercentage: 0.7,
      },
      {
        label: "Doações recorrentes",
        data: RECURRENCE_REALIZED,
        backgroundColor: "#74e7bb",
        borderRadius: 4,
        barPercentage: 0.92,
        categoryPercentage: 0.7,
      },
    ],
  };

  const options = {
    ...BASE_CHART_OPTIONS,
    plugins: {
      ...BASE_CHART_OPTIONS.plugins,
      legend: {
        display: true,
        position: "bottom" as const,
        align: "center" as const,
        labels: {
          boxWidth: 10,
          borderRadius: 2,
          useBorderRadius: true,
          font: { size: 11 },
        },
      },
    },
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 11 } } },
      y: {
        grid: { color: "rgba(0,0,0,0.05)" },
        ticks: { font: { size: 11 } },
      },
    },
  };

  return (
    <Card.Root className="p-6">
      <div>
        <p className="text-sm font-semibold text-(--text-heading)">
          Recorrência mensal
        </p>
        <p className="text-xs text-muted-foreground">
          Assinaturas ativas vs. doações recorrentes efetivadas nos últimos 12
          meses.
        </p>
      </div>
      <div className="h-72">
        <Bar data={data} options={options} />
      </div>
    </Card.Root>
  );
}

export { MonthlyRecurrenceCard };
