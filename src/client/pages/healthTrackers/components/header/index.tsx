import { Button, useModal } from "@arkyn/components";
import { Plus } from "lucide-react";
import { Container } from "./styles";

function Header() {
  const { openModal } = useModal("choose-health-tracker");

  return (
    <Container>
      <h1>Rastreadores de saúde</h1>
      <Button variant="outline" leftIcon={Plus} onClick={openModal}>
        Adicionar
      </Button>
    </Container>
  );
}

export { Header };
