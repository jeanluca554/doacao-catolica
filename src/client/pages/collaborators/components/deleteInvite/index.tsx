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

function DeleteInvite() {
  const { modalIsOpen, modalData, closeModal } = useModal("delete-invite");

  const navigation = useNavigation();

  return (
    <FormProvider form={<Form method="post" />}>
      <ModalContainer isVisible={modalIsOpen} makeInvisible={closeModal}>
        <ModalHeader>Remover convite</ModalHeader>

        <ModalContent>
          <input type="hidden" name="id" value={modalData?.id} />
          <DashedBorderCircle icon={<Trash2 />} />
          <div>
            <strong>Deseja remover este convite?</strong>
            <p>
              O convite enviado para <b>{modalData?.email}</b> será removido
              permanentemente.
            </p>
          </div>
        </ModalContent>

        <ModalFooter>
          <Button type="button" variant="outline" onClick={closeModal}>
            Cancelar
          </Button>
          <Button
            name="_action"
            value="deleteInvite"
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

export { DeleteInvite };
