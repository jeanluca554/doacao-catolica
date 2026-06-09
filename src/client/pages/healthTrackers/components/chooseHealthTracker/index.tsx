import { ModalContainer, ModalHeader, useModal } from "@arkyn/components";
import { ChooseCardContainer, ModalContent } from "./styles";
import { Book, BookUser, Plus } from "lucide-react";

type ChooseCardProps = {
  type: "public-library" | "my-library" | "new-tracker";
};

function ChooseCard({ type }: ChooseCardProps) {
  const iconMap = {
    "public-library": <Book />,
    "my-library": <BookUser />,
    "new-tracker": <Plus />,
  };

  const titleMap = {
    "public-library": "Biblioteca geral",
    "my-library": "Minha biblioteca",
    "new-tracker": "Criar novo rastreador",
  };

  const descriptionMap = {
    "public-library": "Escolha entre diversos rastreadores pré-definidos",
    "my-library": "Veja os rastreadores que você criou ou personalizou",
    "new-tracker": "Crie um rastreador do zero, totalmente personalizado",
  };

  return <ChooseCardContainer></ChooseCardContainer>;
}

function ChooseHealthTracker() {
  const { closeModal, modalIsOpen } = useModal("choose-health-tracker");

  return (
    <ModalContainer isVisible={modalIsOpen} makeInvisible={closeModal}>
      <ModalHeader>Adicionar rastreador</ModalHeader>

      <ModalContent></ModalContent>
    </ModalContainer>
  );
}

export { ChooseHealthTracker };
