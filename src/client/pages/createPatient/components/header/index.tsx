import { Button } from "@arkyn/components";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router";
import { Container } from "./styles";

function Header() {
  const navigate = useNavigate();
  const { workspaceId } = useParams();

  if (!workspaceId) {
    throw new Error("Workspace ID is required");
  }

  return (
    <Container>
      <h1>Adicionar paciente</h1>
      <Button
        leftIcon={ArrowLeft}
        variant="outline"
        onClick={() => navigate(`/workspaces/${workspaceId}/patients`)}
      >
        Voltar
      </Button>
    </Container>
  );
}

export { Header };
