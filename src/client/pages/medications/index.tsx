import { Input, useAutomation } from "@arkyn/components";
import { Search } from "lucide-react";
import { useActionData } from "react-router";

import { useFilter } from "~/client/hooks/useFilter";
import { ActiveMedicationsList } from "./components/activeMedications";
import { CreateMedications } from "./components/createMedication";
import { DeleteMedication } from "./components/deleteMedication";
import { Header } from "./components/header";
import { HistoryMedicationsList } from "./components/historyMedications";
import { UpdateMedications } from "./components/updateMedication";
import { Container } from "./styles";

function MedicationsPage() {
  const actionData = useActionData();
  useAutomation(actionData);

  const { handleChangeTimeoutFilter, getParam } = useFilter("medications");

  return (
    <Container>
      <Header />
      <div className="searchContainer">
        <Input
          name="search"
          placeholder="Pesquisar..."
          rightIcon={Search}
          defaultValue={getParam("name") || ""}
          onChange={(e) => handleChangeTimeoutFilter("name", e.target.value)}
        />
      </div>
      <ActiveMedicationsList />
      <HistoryMedicationsList />
      <CreateMedications />
      <UpdateMedications />
      <DeleteMedication />
    </Container>
  );
}

export { MedicationsPage };
