import {
  Button,
  FormProvider,
  ModalContainer,
  ModalFooter,
  ModalHeader,
  useModal,
} from "@arkyn/components";
import { Trash2 } from "lucide-react";
import { Form, useNavigation } from "react-router";

import { DashedBorderCircle } from "~/client/components/iconDashedBorderCircle";
import { ModalContent } from "./styles";

function DeletePatient() {
  const { modalIsOpen, modalData, closeModal } = useModal("delete-patient");

  const navigation = useNavigation();

  return (
    <FormProvider form={<Form method="post" />}>
      <ModalContainer isVisible={modalIsOpen} makeInvisible={closeModal}>
        <ModalHeader>Remover paciente</ModalHeader>

        <ModalContent>
          <input type="hidden" name="id" value={modalData?.id} />
          <DashedBorderCircle icon={<Trash2 />} />
          <div>
            <strong>Deseja remover este paciente?</strong>
            <p>
              O paciente <b>{modalData?.name}</b> será removido permanentemente.
            </p>
          </div>
        </ModalContent>

        <ModalFooter>
          <Button type="button" variant="outline" onClick={closeModal}>
            Cancelar
          </Button>
          <Button
            name="_action"
            value="deletePatient"
            scheme="danger"
            isLoading={navigation.state !== "idle"}
          >
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContainer>
    </FormProvider>
  );
}

export { DeletePatient };
