import { Doughnut } from "react-chartjs-2";
import { Card } from "~/client/components/ui/card";
import { BASE_CHART_OPTIONS } from "./chart-setup";

const PAYMENT_METHODS = [
  {
    label: "Pix",
    pct: 41,
    total: "R$ 42.800",
    donations: "612 doações",
    color: "#3b82f6",
  },
  {
    label: "Cartão de Crédito",
    pct: 30,
    total: "R$ 31.200",
    donations: "284 doações",
    color: "#8b5cf6",
  },
  {
    label: "Boleto",
    pct: 12,
    total: "R$ 12.400",
    donations: "48 doações",
    color: "#f59e0b",
  },
  {
    label: "Pix Automático",
    pct: 18,
    total: "R$ 18.600",
    donations: "196 doações",
    color: "#10b981",
  },
];

function PaymentMethodsCard() {
  const data = {
    labels: PAYMENT_METHODS.map((m) => m.label),
    datasets: [
      {
        data: PAYMENT_METHODS.map((m) => m.pct),
        backgroundColor: PAYMENT_METHODS.map((m) => m.color),
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    ...BASE_CHART_OPTIONS,
    cutout: "68%",
  };

  return (
    <Card.Root className="p-6">
      <div>
        <p className="text-sm font-semibold text-(--text-heading)">
          Formas de pagamento
        </p>
        <p className="text-xs text-muted-foreground">
          Distribuição percentual e valores arrecadados por método.
        </p>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative size-40 shrink-0">
          <Doughnut data={data} options={options} />
        </div>

        <div className="flex flex-1 flex-col gap-3">
          {PAYMENT_METHODS.map((m) => (
            <div key={m.label} className="flex items-center gap-2">
              <span
                className="size-2.5 shrink-0 rounded-full"
                style={{ backgroundColor: m.color }}
              />
              <div className="flex flex-1 flex-col">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-(--text-heading)">
                    {m.label}
                  </span>
                  <span className="text-xs font-semibold text-(--text-heading)">
                    {m.pct}%
                  </span>
                </div>
                <span className="text-[11px] text-muted-foreground">
                  {m.total} · {m.donations}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card.Root>
  );
}

export { PaymentMethodsCard };
