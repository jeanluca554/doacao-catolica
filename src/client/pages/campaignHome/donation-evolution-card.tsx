import { Bar } from "react-chartjs-2";
import { ChevronDown } from "lucide-react";
import { Card } from "~/client/components/ui/card";
import { Button } from "~/client/components/ui/button";
import { BASE_CHART_OPTIONS } from "./chart-setup";

const DAYS = Array.from({ length: 30 }, (_, i) =>
  String(i + 1).padStart(2, "0"),
);

const EVOLUTION_DATA = {
  pontual: [
    800, 1200, 600, 1800, 2400, 1600, 900, 2800, 1100, 1500, 2200, 1700, 800,
    1300, 2600, 900, 1400, 2800, 1200, 700, 1600, 2400, 1800, 900, 1100, 2600,
    1500, 2200, 800, 1900,
  ],
  recorrente: [
    500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 600, 600, 600, 600, 600,
    600, 600, 600, 600, 600, 700, 700, 700, 700, 700, 700, 700, 700, 700, 700,
  ],
};

function DonationEvolutionCard() {
  const data = {
    labels: DAYS,
    datasets: [
      {
        label: "Doações pontuais",
        data: EVOLUTION_DATA.pontual,
        backgroundColor: "#4F46E5",
        stack: "a",
        borderRadius: { bottomLeft: 4, bottomRight: 4 },
        borderSkipped: "top" as const,
        barPercentage: 0.75,
      },
      {
        label: "Doações recorrentes",
        data: EVOLUTION_DATA.recorrente,
        backgroundColor: "#34D399",
        stack: "a",
        borderRadius: { topLeft: 4, topRight: 4 },
        borderSkipped: "bottom" as const,
        barPercentage: 0.75,
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
      x: {
        stacked: true,
        grid: { display: false },
        ticks: { maxTicksLimit: 10, font: { size: 11 } },
      },
      y: {
        stacked: true,
        grid: { color: "rgba(0,0,0,0.05)" },
        ticks: {
          font: { size: 11 },
          callback: (v: number | string) => `R$${Number(v) / 1000}k`,
        },
      },
    },
  };

  return (
    <Card.Root className="p-6">
      <Card.Header>
        <div>
          <p className="text-sm font-semibold text-(--text-heading)">
            Evolução das doações
          </p>
          <p className="text-xs text-muted-foreground">
            Valor diário arrecadado neste mês.
          </p>
        </div>
        <Button variant="outline" size="sm" className="gap-1 text-xs">
          Mês atual <ChevronDown size={13} />
        </Button>
      </Card.Header>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </Card.Root>
  );
}

export { DonationEvolutionCard };
