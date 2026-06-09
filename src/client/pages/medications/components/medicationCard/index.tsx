import { IconButton, Switch, Tooltip } from "@arkyn/components";
import {
  Bell,
  BellOff,
  Calendar,
  PencilLine,
  Pill,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useFetcher } from "react-router";
import { MedicationCardContainer } from "./styles";

type MedicationCardProps = {
  id: string;
  name: string;
  dosage: string;
  dateLabel: string;
  active?: boolean;
  reminderEnabled?: boolean;
  onEdit?: () => void;
  onDelete?: () => void;
};

function MedicationCard(props: MedicationCardProps) {
  const {
    id,
    name,
    dosage,
    dateLabel,
    active,
    reminderEnabled,
    onEdit,
    onDelete,
  } = props;
  const reminderFetcher = useFetcher();
  const [isReminderEnabled, setIsReminderEnabled] = useState(
    reminderEnabled ?? false,
  );

  useEffect(() => {
    setIsReminderEnabled(reminderEnabled ?? false);
  }, [reminderEnabled]);

  function handleReminderSwitch(nextValue: string) {
    const nextReminderEnabled = nextValue === "true";
    setIsReminderEnabled(nextReminderEnabled);

    const formData = new FormData();
    formData.append("_action", "updateMedications");
    formData.append("id", id);
    formData.append("remindersEnabled", String(nextReminderEnabled));

    reminderFetcher.submit(formData, { method: "post" });
  }

  return (
    <MedicationCardContainer $variant={active ? "active" : "history"}>
      <div className="cardTop">
        <div className="medicationName">
          <div className="iconBox">
            <Pill size={24} />
          </div>
          <strong>{name}</strong>
        </div>
        <div className="actionButtons">
          <div>
            <Tooltip text="Editar medicamento">
              <IconButton
                aria-label="editar"
                variant="invisible"
                icon={PencilLine}
                size="sm"
                scheme="warning"
                onClick={onEdit}
              />
            </Tooltip>
            <Tooltip text="Excluir medicamento">
              <IconButton
                aria-label="excluir"
                variant="invisible"
                icon={Trash2}
                size="sm"
                scheme="danger"
                onClick={onDelete}
              />
            </Tooltip>
          </div>
        </div>
      </div>

      <p className="dosage">{dosage}</p>

      <div className="cardFooter">
        <div className="dateInfo">
          <Calendar size={20} />
          <span>{dateLabel}</span>
        </div>

        {active ? (
          <div className="reminderInfo">
            {isReminderEnabled ? <Bell size={20} /> : <BellOff size={20} />}
            <Switch
              name="remindersEnabled"
              size="lg"
              checked={isReminderEnabled}
              value="true"
              unCheckedValue="false"
              disabled={reminderFetcher.state !== "idle"}
              onCheck={handleReminderSwitch}
            />
          </div>
        ) : null}
      </div>
    </MedicationCardContainer>
  );
}

export { MedicationCard };
