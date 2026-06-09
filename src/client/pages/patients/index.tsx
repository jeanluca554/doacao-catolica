import { useAutomation } from "@arkyn/components";
import { useActionData } from "react-router";
import { useQueryToast } from "~/client/hooks/useQueryToast";
import { DeletePatient } from "./components/deletePatient";
import { Header } from "./components/header";
import { Table } from "./components/table";
import { Container } from "./styles";

function PatientsPage() {
  const actionData = useActionData();
  useAutomation(actionData);

  useQueryToast({
    param: "updated",
    message: "Paciente atualizado com sucesso",
    type: "success",
  });

  useQueryToast({
    param: "created",
    message: "Paciente criado com sucesso",
    type: "success",
  });

  return (
    <Container>
      <Header />
      <Table />
      <DeletePatient />
    </Container>
  );
}

export { PatientsPage };
