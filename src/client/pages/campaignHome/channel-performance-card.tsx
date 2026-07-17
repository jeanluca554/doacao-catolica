import { Card } from "~/client/components/ui/card";
import { Table } from "~/client/components/ui/table";
import { Badge } from "~/client/components/ui/badge";

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

function ChannelPerformanceCard() {
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

export { ChannelPerformanceCard };
