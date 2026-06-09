import { Button, FormProvider, useAutomation } from "@arkyn/components";
import { Form, useActionData, useNavigation } from "react-router";

import { Check } from "lucide-react";
import { FormCard } from "./components/formCard";
import { Header } from "./components/header";
import { Container } from "./styles";

function AddPatientsPage() {
  const actionData = useActionData();
  useAutomation(actionData);

  const navigation = useNavigation();

  return (
    <Container>
      <Header />
      <FormProvider
        form={<Form method="post" />}
        fieldErrors={actionData?.cause?.fieldErrors}
      >
        <div className="formContent">
          <FormCard />
          <Button
            name="_action"
            value="createPatient"
            isLoading={navigation.state !== "idle"}
            leftIcon={Check}
            className="createPatientButton"
          >
            Salvar
          </Button>
        </div>
      </FormProvider>
    </Container>
  );
}

export { AddPatientsPage };
