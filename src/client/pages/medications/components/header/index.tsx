import { Button, IconButton, useModal } from "@arkyn/components";
import { Plus } from "lucide-react";
import { Container } from "./styles";

function Header() {
  const { openModal } = useModal("create-medication");
  return (
    <Container>
      <h1>Medicamentos</h1>
      <div className="actions">
        <Button leftIcon={Plus} onClick={openModal}>
          Adicionar
        </Button>
        <IconButton
          icon={Plus}
          aria-label="Adicionar medicamento"
          onClick={openModal}
        />
      </div>
    </Container>
  );
}

export { Header };
