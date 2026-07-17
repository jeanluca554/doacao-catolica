import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Card } from "~/client/components/ui/card";
import { Table } from "~/client/components/ui/table";
import { Badge } from "~/client/components/ui/badge";
import { Button } from "~/client/components/ui/button";
import { Avatar, AvatarFallback } from "~/client/components/ui/avatar";

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

function RecentDonationsCard({ campaignId }: { campaignId: string }) {
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

export { RecentDonationsCard };
