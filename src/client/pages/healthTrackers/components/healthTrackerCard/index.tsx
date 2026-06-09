import { Badge, Button, IconButton } from "@arkyn/components";
import { Hamburger, MoreVertical } from "lucide-react";
import { Container } from "./styles";

function HealthTrackerCard() {
  return (
    <Container>
      <header>
        <div className="svgContainer">
          <Hamburger />
        </div>

        <IconButton
          aria-label="Open more menu"
          icon={MoreVertical}
          variant="invisible"
        />
      </header>

      <div className="descriptionArea">
        <strong>Rastrear sono</strong>
        <p>Monitoramento da duração e qualidade do sono</p>
      </div>

      <div className="infoBadges">
        <Badge scheme="secondary">Diário</Badge>
        <Badge scheme="info">Biblioteca geral</Badge>
      </div>

      <p className="comment">"Registrar diariamente pela manhã"</p>

      <footer>
        <Badge scheme="success" variant="solid">
          Ativo
        </Badge>
        <Button variant="outline">Ver detalhes</Button>
      </footer>
    </Container>
  );
}

export { HealthTrackerCard };
