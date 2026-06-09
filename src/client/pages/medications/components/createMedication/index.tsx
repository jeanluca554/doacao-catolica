import {
  Badge,
  Button,
  FormProvider,
  Input,
  ModalContainer,
  ModalFooter,
  ModalHeader,
  Switch,
  useModal,
} from "@arkyn/components";
import { useState } from "react";
import { Form, useActionData, useNavigation, useParams } from "react-router";

import { Check } from "lucide-react";
import { ModalContent } from "./styles";

function CreateMedications() {
  const { modalIsOpen, closeModal } = useModal("create-medication");
  const [reminderEnabled, setReminderEnabled] = useState(true);
  const today = new Date().toISOString().split("T")[0];

  const { treatmentId } = useParams();

  const actionData = useActionData();

  const navigation = useNavigation();

  return (
    <FormProvider
      form={<Form method="post" />}
      fieldErrors={actionData?.cause?.fieldErrors}
    >
      <ModalContainer isVisible={modalIsOpen} makeInvisible={closeModal}>
        <ModalHeader>Adicionar medicamento</ModalHeader>

        <ModalContent>
          <input type="hidden" name="treatmentId" value={treatmentId} />

          <Input name="name" label="Nome do medicamento" showAsterisk />

          <Input name="dosage" label="Posologia" showAsterisk />

          <div className="inputGroup">
            <Input
              name="startDate"
              type="date"
              label="Data de início"
              defaultValue={today}
              showAsterisk
            />
            <Input name="endDate" type="date" label="Data de fim (opcional)" />
          </div>

          <div className="instructionContainer">
            <p>Ativar lembretes</p>

            <div className="instructionActions">
              <Badge
                size="md"
                scheme={reminderEnabled ? "primary" : "secondary"}
                variant="ghost"
              >
                {reminderEnabled ? "Ativo" : "Inativo"}
              </Badge>

              <Switch
                name="remindersEnabled"
                size="lg"
                checked={reminderEnabled}
                value="true"
                unCheckedValue="false"
                onCheck={(value) => setReminderEnabled(value === "true")}
              />
            </div>
          </div>
        </ModalContent>

        <ModalFooter>
          <Button type="button" variant="outline" onClick={closeModal}>
            Cancelar
          </Button>
          <Button
            name="_action"
            value="createMedications"
            isLoading={navigation.state !== "idle"}
            leftIcon={Check}
          >
            Salvar
          </Button>
        </ModalFooter>
      </ModalContainer>
    </FormProvider>
  );
}

export { CreateMedications };
