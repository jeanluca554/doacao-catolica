import { Badge } from "@arkyn/components";

type StatusBadgeType = {
  text: "ACCEPTED" | "REJECTED" | "PENDING";
};

type ColorScheme = "success" | "warning" | "danger";

const badge: { [key: string]: { color: ColorScheme; content: string } } = {
  ACCEPTED: { color: "success", content: "Aceito" },
  REJECTED: { color: "danger", content: "Recusado" },
  PENDING: { color: "warning", content: "Pendente" },
};

function statusPendingInviteBadge(props: StatusBadgeType) {
  const status = String(props.text);
  const { color, content } = badge[status];
  return (
    <Badge size="md" scheme={color} variant="solid">
      {content}
    </Badge>
  );
}

export { statusPendingInviteBadge };
