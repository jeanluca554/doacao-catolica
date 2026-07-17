import { Bar } from "react-chartjs-2";
import { Card } from "~/client/components/ui/card";
import { BASE_CHART_OPTIONS } from "./chart-setup";

const AGE_LABELS = ["18–24", "25–34", "35–44", "45–54", "55–64", "65+"];
const AGE_DATA = [45, 180, 290, 310, 220, 130];

function DonorProfileCard() {
  const data = {
    labels: AGE_LABELS,
    datasets: [
      {
        label: "Doadores",
        data: AGE_DATA,
        backgroundColor: "rgba(59,130,246,0.75)",
        borderRadius: 6,
      },
    ],
  };

  const options = {
    ...BASE_CHART_OPTIONS,
    scales: {
      x: { grid: { display: false }, ticks: { font: { size: 11 } } },
      y: {
        grid: { color: "rgba(0,0,0,0.05)" },
        ticks: { font: { size: 11 } },
        max: 340,
      },
    },
  };

  return (
    <Card.Root className="p-6">
      <div>
        <p className="text-sm font-semibold text-(--text-heading)">
          Perfil dos doadores
        </p>
        <p className="text-xs text-muted-foreground">
          Total de doadores por faixa etária.
        </p>
      </div>
      <div className="h-56">
        <Bar data={data} options={options} />
      </div>
    </Card.Root>
  );
}

export { DonorProfileCard };
