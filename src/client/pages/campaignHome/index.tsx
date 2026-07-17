import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Doughnut, Line } from "react-chartjs-2";
import {
  DollarSign,
  Users,
  Target,
  Receipt,
  ArrowRight,
  ChevronDown,
  TrendingUp,
  RefreshCw,
  Eye,
  UserPlus,
  Heart,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { CSSProperties } from "react";
import { Link, useParams } from "react-router";
import { Card } from "~/client/components/ui/card";
import { Table } from "~/client/components/ui/table";
import { Badge } from "~/client/components/ui/badge";
import { Button } from "~/client/components/ui/button";
import { Avatar, AvatarFallback } from "~/client/components/ui/avatar";
import { Progress } from "~/client/components/ui/progress";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
  Filler,
);

// ── Mock Data ─────────────────────────────────────────────────────────────────

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

const RECENT_DONATIONS = [
  {
    initials: "AC",
    name: "Ana Carolina Silva",
    time: "há 2 min",
    method: "Pix",
    status: "confirmed",
    value: "R$ 250",
  },
  {
    initials: "RL",
    name: "Roberto Lima",
    time: "há 14 min",
    method: "Cartão",
    status: "confirmed",
    value: "R$ 1.000",
  },
  {
    initials: "EV",
    name: "Empresa Verde Ltda",
    time: "há 1 h",
    method: "Boleto",
    status: "pending",
    value: "R$ 5.000",
  },
  {
    initials: "JM",
    name: "Juliana Mendes",
    time: "ontem",
    method: "Pix",
    status: "confirmed",
    value: "R$ 75",
  },
  {
    initials: "AN",
    name: "Anônimo",
    time: "ontem",
    method: "Cartão",
    status: "confirmed",
    value: "R$ 320",
  },
];

const STATUS_BADGE: Record<
  string,
  { variant: "success" | "warning" | "info" | "neutral"; label: string }
> = {
  confirmed: { variant: "success", label: "Confirmada" },
  pending: { variant: "warning", label: "Pendente" },
  failed: { variant: "neutral", label: "Falhou" },
};

const TOP_DONORS = [
  { position: 1, name: "João Batista", donations: 15, total: "R$ 12.000" },
  { position: 2, name: "Maria Aparecida", donations: 8, total: "R$ 4.500" },
  { position: 3, name: "Carlos Eduardo", donations: 7, total: "R$ 1.820" },
  { position: 4, name: "Marina Costa", donations: 4, total: "R$ 960" },
  { position: 5, name: "Paulo Ribeiro", donations: 3, total: "R$ 600" },
];

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

const AGE_LABELS = ["18–24", "25–34", "35–44", "45–54", "55–64", "65+"];
const AGE_DATA = [45, 180, 290, 310, 220, 130];

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

const BRACKETS_LABELS = [
  "Até R$ 50",
  "R$ 51 – R$ 100",
  "R$ 101 – R$ 250",
  "R$ 251 – R$ 500",
  "R$ 501 – R$ 1k",
  "Acima de R$ 1k",
];
const BRACKETS_DATA = [320, 280, 220, 145, 60, 33];

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

const CHANNEL_DATA = [
  {
    canal: "Instagram",
    visitas: "4.820",
    conversoes: "312",
    taxa: "6,5%",
    receita: "R$ 18.400",
  },
  {
    canal: "WhatsApp",
    visitas: "2.140",
    conversoes: "198",
    taxa: "9,3%",
    receita: "R$ 12.200",
  },
  {
    canal: "E-mail",
    visitas: "1.560",
    conversoes: "142",
    taxa: "9,1%",
    receita: "R$ 9.800",
  },
  {
    canal: "Google Ads",
    visitas: "3.210",
    conversoes: "88",
    taxa: "2,7%",
    receita: "R$ 5.600",
  },
  {
    canal: "Direto",
    visitas: "980",
    conversoes: "64",
    taxa: "6,5%",
    receita: "R$ 4.200",
  },
];

// ── Helpers ───────────────────────────────────────────────────────────────────

function getInitials(name: string) {
  const parts = name.split(" ").filter(Boolean);
  if (parts.length === 1) return parts[0][0].toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

const BASE_CHART_OPTIONS = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { mode: "index" as const, intersect: false },
  },
};

// ── KPI Cards ─────────────────────────────────────────────────────────────────

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

// ── Evolução das Doações ──────────────────────────────────────────────────────

function EvolucaoCard() {
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

// ── Meta da Campanha ──────────────────────────────────────────────────────────

function MetaCampanhaCard() {
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
          style={{ "--progress-foreground": "var(--sidebar-accent-foreground)" } as CSSProperties}
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

// ── Doações Recentes ──────────────────────────────────────────────────────────

function DoacoesRecentesCard({ campaignId }: { campaignId: string }) {
  return (
    <Card.Root className="p-6">
      <Card.Header>
        <div>
          <p className="text-sm font-semibold text-(--text-heading)">
            Doações recentes
          </p>
          <p className="text-xs text-muted-foreground">
            Últimas movimentações da campanha.
          </p>
        </div>
        <Button variant="ghost" size="sm" asChild className="gap-1 text-xs">
          <Link to={`/campaign/${campaignId}/donations`}>
            Ver todas <ArrowRight size={13} />
          </Link>
        </Button>
      </Card.Header>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Doador</Table.Head>
            <Table.Head>Método</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head className="text-right">Valor</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {RECENT_DONATIONS.map((d) => {
            const badge = STATUS_BADGE[d.status];
            return (
              <Table.Row key={d.name + d.time}>
                <Table.Cell>
                  <div className="flex items-center gap-3">
                    <Avatar className="size-8">
                      <AvatarFallback className="bg-primary text-[0.65rem] font-bold text-primary-foreground">
                        {d.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium text-(--text-heading)">
                        {d.name}
                      </p>
                      <p className="text-xs text-muted-foreground">{d.time}</p>
                    </div>
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <span className="text-sm">{d.method}</span>
                </Table.Cell>
                <Table.Cell>
                  <Badge variant={badge?.variant ?? "neutral"}>
                    {badge?.label ?? d.status}
                  </Badge>
                </Table.Cell>
                <Table.Cell className="text-right font-medium">
                  {d.value}
                </Table.Cell>
              </Table.Row>
            );
          })}
        </Table.Body>
      </Table.Root>
    </Card.Root>
  );
}

// ── Top Doadores ──────────────────────────────────────────────────────────────

function TopDoadoresCard({ campaignId }: { campaignId: string }) {
  return (
    <Card.Root className="p-6">
      <Card.Header>
        <div>
          <p className="text-sm font-semibold text-(--text-heading)">
            Top doadores
          </p>
          <p className="text-xs text-muted-foreground">
            Maiores contribuições do período.
          </p>
        </div>
        <Button variant="ghost" size="sm" asChild className="gap-1 text-xs">
          <Link to={`/campaign/${campaignId}/donors`}>
            Ver todos <ArrowRight size={13} />
          </Link>
        </Button>
      </Card.Header>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Doador</Table.Head>
            <Table.Head>Doações</Table.Head>
            <Table.Head className="text-right">Total</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {TOP_DONORS.map((donor) => (
            <Table.Row key={donor.position}>
              <Table.Cell>
                <div className="flex items-center gap-3">
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-border text-xs font-bold text-muted-foreground">
                    {donor.position}
                  </span>
                  <span className="text-sm text-(--text-heading)">
                    {donor.name}
                  </span>
                </div>
              </Table.Cell>
              <Table.Cell className="text-muted-foreground">
                {donor.donations}
              </Table.Cell>
              <Table.Cell className="text-right font-semibold text-(--text-heading)">
                {donor.total}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card.Root>
  );
}

// ── Formas de Pagamento ───────────────────────────────────────────────────────

function FormasPagamentoCard() {
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

// ── Perfil dos Doadores ───────────────────────────────────────────────────────

function PerfilDoadoresCard() {
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

// ── Funil de Conversão ────────────────────────────────────────────────────────

function FunilConversaoCard() {
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
                style={{ "--progress-foreground": step.color } as CSSProperties}
              />
            </div>
          );
        })}
      </div>
    </Card.Root>
  );
}

// ── Faixas de Doação ──────────────────────────────────────────────────────────

function FaixasDoacaoCard() {
  const data = {
    labels: BRACKETS_LABELS,
    datasets: [
      {
        label: "Doações",
        data: BRACKETS_DATA,
        backgroundColor: "#74e7bb",
        borderRadius: 4,
        barPercentage: 0.6,
      },
    ],
  };

  const options = {
    ...BASE_CHART_OPTIONS,
    indexAxis: "y" as const,
    scales: {
      x: {
        grid: { color: "rgba(0,0,0,0.05)" },
        ticks: { font: { size: 11 } },
      },
      y: {
        grid: { display: false },
        ticks: { font: { size: 11 } },
      },
    },
  };

  return (
    <Card.Root className="p-6">
      <div>
        <p className="text-sm font-semibold text-(--text-heading)">
          Faixas de doação
        </p>
        <p className="text-xs text-muted-foreground">
          Quantidade de doações por valor no último mês.
        </p>
      </div>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
    </Card.Root>
  );
}

// ── Recorrência Mensal ────────────────────────────────────────────────────────

function RecorrenciaMensalCard() {
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

// ── Desempenho por Canal ──────────────────────────────────────────────────────

function DesempenhoCanal() {
  return (
    <Card.Root className="p-6">
      <Card.Header>
        <div>
          <p className="text-sm font-semibold text-(--text-heading)">
            Desempenho por canal
          </p>
          <p className="text-xs text-muted-foreground">
            Origem das visitas e conversões em doações.
          </p>
        </div>
      </Card.Header>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.Head>Canal</Table.Head>
            <Table.Head>Visitas</Table.Head>
            <Table.Head>Conversões</Table.Head>
            <Table.Head>Taxa</Table.Head>
            <Table.Head className="text-right">Receita</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {CHANNEL_DATA.map((row) => (
            <Table.Row key={row.canal}>
              <Table.Cell className="font-medium text-(--text-heading)">
                {row.canal}
              </Table.Cell>
              <Table.Cell>{row.visitas}</Table.Cell>
              <Table.Cell>{row.conversoes}</Table.Cell>
              <Table.Cell>
                <Badge variant="info">{row.taxa}</Badge>
              </Table.Cell>
              <Table.Cell className="text-right font-medium">
                {row.receita}
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Card.Root>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────

function CampaignHomePage() {
  const { campaignId } = useParams<{ campaignId: string }>();
  const id = campaignId ?? "";

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight text-(--text-heading)">
          Dashboard
        </h1>
        <p className="text-sm text-muted-foreground">
          Acompanhe o desempenho desta campanha em tempo real.
        </p>
      </div>

      <KpiCards />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <EvolucaoCard />
        <MetaCampanhaCard />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[3fr_2fr]">
        <DoacoesRecentesCard campaignId={id} />
        <TopDoadoresCard campaignId={id} />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <FormasPagamentoCard />
        <PerfilDoadoresCard />
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <FunilConversaoCard />
        <FaixasDoacaoCard />
      </div>

      <RecorrenciaMensalCard />

      <DesempenhoCanal />
    </div>
  );
}

export { CampaignHomePage };
