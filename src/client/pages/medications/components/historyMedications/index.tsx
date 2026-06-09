import { useLoaderData } from "react-router";

import type { MedicationsLoader } from "~/client/types/medicationsLoader";
import { useModal } from "@arkyn/components";
import { EmptyMedicationState } from "../emptyMedicationState";
import { MedicationCard } from "../medicationCard";
import { SectionContainer } from "./styles";

function HistoryMedicationsList() {
  const { medications } = useLoaderData<MedicationsLoader>();
  const { openModal } = useModal();

  const historyMedications = medications.data.filter(
    (medication) => medication.active === false,
  );

  return (
    <SectionContainer>
      <h2>Histórico de medicamentos</h2>

      {historyMedications.length === 0 ? (
        <EmptyMedicationState variant="history" />
      ) : (
        <div className="medicationGrid">
          {historyMedications.map((medication) => {
            return (
              <MedicationCard
                key={medication.id}
                id={medication.id}
                name={medication.name}
                dosage={medication.dosage}
                dateLabel={medication.dosagePeriod}
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

export { HistoryMedicationsList };
