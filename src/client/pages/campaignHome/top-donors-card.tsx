import { ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { Card } from "~/client/components/ui/card";
import { Table } from "~/client/components/ui/table";
import { Button } from "~/client/components/ui/button";

const TOP_DONORS = [
  { position: 1, name: "João Batista", donations: 15, total: "R$ 12.000" },
  { position: 2, name: "Maria Aparecida", donations: 8, total: "R$ 4.500" },
  { position: 3, name: "Carlos Eduardo", donations: 7, total: "R$ 1.820" },
  { position: 4, name: "Marina Costa", donations: 4, total: "R$ 960" },
  { position: 5, name: "Paulo Ribeiro", donations: 3, total: "R$ 600" },
];

function TopDonorsCard({ campaignId }: { campaignId: string }) {
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

export { TopDonorsCard };
