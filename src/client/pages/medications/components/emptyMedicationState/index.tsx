import { ClipboardCheck, type LucideIcon, Pill } from "lucide-react";

import { EmptyStateContainer } from "./styles";

type Variant = "active" | "history";

type EmptyMedicationStateProps = {
  variant: Variant;
};

const contentByVariant: Record<
  Variant,
  { title: string; description: string; icon: LucideIcon }
> = {
  active: {
    title: "Nenhum medicamento ativo",
    description:
      "Quando um medicamento estiver ativo, ele aparecerá aqui com data de início e lembrete.",
    icon: Pill,
  },
  history: {
    title: "Nenhum medicamento no histórico",
    description:
      "Quando um medicamento for finalizado, ele aparecerá aqui com período completo.",
    icon: ClipboardCheck,
  },
};

function EmptyMedicationState(props: EmptyMedicationStateProps) {
  const { variant } = props;
  const { title, description, icon: Icon } = contentByVariant[variant];

  return (
    <EmptyStateContainer $variant={variant}>
      <div className="iconWrapper">
        <Icon size={26} />
      </div>

      <div className="content">
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
    </EmptyStateContainer>
  );
}

export { EmptyMedicationState };
