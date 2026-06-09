import { Badge } from "@arkyn/components";

function statusBadge(status: boolean) {
  return (
    <Badge size="md" scheme={status ? "success" : "danger"} variant="solid">
      {status ? "Verificado" : "Não verificado"}
    </Badge>
  );
}

export { statusBadge };
