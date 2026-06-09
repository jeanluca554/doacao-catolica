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
import { Check } from "lucide-react";
import { useEffect, useState } from "react";
import { Form, useActionData, useNavigation } from "react-router";

import { ModalContent } from "../createMedication/styles";

type UpdateMedicationModalData = {
  id?: string;
  active?: boolean;
  name?: string;
  dosage?: string;
  startDate?: string;
  endDate?: string | null;
  reminderEnabled?: boolean;
};

function UpdateMedications() {
  const { modalIsOpen, modalData, closeModal } = useModal("update-medication");
  const actionData = useActionData();
  const navigation = useNavigation();

  const typedModalData = (modalData ?? {}) as UpdateMedicationModalData;
  const [reminderEnabled, setReminderEnabled] = useState(
    typedModalData.reminderEnabled ?? false,
  );
  const [active, setActive] = useState(typedModalData.active ?? false);

  useEffect(() => {
    if (!modalIsOpen) return;

    setReminderEnabled(typedModalData.reminderEnabled ?? false);
    setActive(typedModalData.active ?? false);
  }, [modalIsOpen, typedModalData.reminderEnabled, typedModalData.active]);

  return (
    <FormProvider
      form={<Form method="post" />}
      fieldErrors={actionData?.cause?.fieldErrors}
    >
      <ModalContainer isVisible={modalIsOpen} makeInvisible={closeModal}>
        <ModalHeader>Atualizar medicamento</ModalHeader>

        <ModalContent>
          <input type="hidden" name="id" value={typedModalData.id ?? ""} />
          <input
            type="hidden"
            name="active"
            value={String(typedModalData.active ?? false)}
          />

          <div className="instructionContainer">
            <p>Status do medicamento</p>

            <div className="instructionActions">
              <Badge
                size="md"
                scheme={active ? "primary" : "secondary"}
                variant="ghost"
              >
                {active ? "Ativo" : "Inativo"}
              </Badge>

              <Switch
                name="active"
                size="lg"
                checked={active}
                value="true"
                unCheckedValue="false"
                onCheck={(value) => setActive(value === "true")}
              />
            </div>
          </div>

          <Input
            name="name"
            label="Nome do medicamento"
            defaultValue={typedModalData.name ?? ""}
            showAsterisk
          />

          <Input
            name="dosage"
            label="Posologia"
            defaultValue={typedModalData.dosage ?? ""}
            showAsterisk
          />

          <div className="inputGroup">
            <Input
              name="startDate"
              type="date"
              label="Data de início"
              defaultValue={typedModalData.startDate}
              showAsterisk
            />
            <Input
              name="endDate"
              type="date"
              label="Data de fim (opcional)"
              defaultValue={typedModalData.endDate}
            />
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
            value="updateMedications"
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

export { UpdateMedications };
