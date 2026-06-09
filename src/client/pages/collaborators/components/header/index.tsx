import { Button, IconButton, useModal } from "@arkyn/components";
import { Plus } from "lucide-react";
import { Container } from "./styles";

function Header() {
  const { openModal } = useModal("invite-collaborator");

  return (
    <Container>
      <h1>Colaboradores</h1>
      <Button leftIcon={Plus} onClick={openModal}>
        Adicionar
      </Button>
      <IconButton
        icon={Plus}
        onClick={openModal}
        aria-label="Adicionar colaborador"
      />
    </Container>
  );
}

export { Header };
