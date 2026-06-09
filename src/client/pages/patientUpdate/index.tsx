import { Button, FormProvider, useAutomation } from "@arkyn/components";
import { Form, useActionData, useNavigation } from "react-router";

import { Check } from "lucide-react";
import { FormCard } from "./components/formCard";
import { Header } from "./components/header";
import { Container } from "./styles";

function EditPatientPage() {
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
            value="updatePatient"
            isLoading={navigation.state !== "idle"}
            leftIcon={Check}
            className="updatePatientButton"
          >
            Atualizar
          </Button>
        </div>
      </FormProvider>
    </Container>
  );
}

export { EditPatientPage };
