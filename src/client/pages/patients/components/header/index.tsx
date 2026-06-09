import { Button } from "@arkyn/components";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
import { Container } from "./styles";

function Header() {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>Lista de pacientes</h1>
      <Button leftIcon={Plus} onClick={() => navigate("create")}>
        Adicionar
      </Button>
    </Container>
  );
}

export { Header };
