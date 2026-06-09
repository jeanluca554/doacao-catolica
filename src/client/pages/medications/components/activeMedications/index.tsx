import { useLoaderData } from "react-router";

import type { MedicationsLoader } from "~/client/types/medicationsLoader";
import { useModal } from "@arkyn/components";
import { EmptyMedicationState } from "../emptyMedicationState";
import { MedicationCard } from "../medicationCard";
import { SectionContainer } from "./styles";

function ActiveMedicationsList() {
  const { medications } = useLoaderData<MedicationsLoader>();
  const { openModal } = useModal();
  const activeMedications = medications.data.filter(
    (medication) => medication.active === true,
  );

  return (
    <SectionContainer>
      <h2>Medicamentos ativos</h2>

      {activeMedications.length === 0 ? (
        <EmptyMedicationState variant="active" />
      ) : (
        <div className="medicationCards">
          {activeMedications.map((medication) => {
            return (
              <MedicationCard
                key={medication.id}
                id={medication.id}
                name={medication.name}
                dosage={medication.dosage}
                dateLabel={medication.dosagePeriod}
                active
                reminderEnabled={medication.reminderEnabled}
                onEdit={() => openModal("update-medication", medication)}
                onDelete={() => openModal("delete-medication", medication)}
              />
            );
          })}
        </div>
      )}
    </SectionContainer>
  );
}

export { ActiveMedicationsList };
