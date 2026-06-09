import { Button } from "@arkyn/components";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useRouteError } from "react-router";

import bulletBoxSvg from "~/client/assets/bullet-box.svg";
import { Container } from "./styles";

type ErrorProps = {
  name: string;
  message: string | null;
  fieldErrors?: Record<string, string> | null;
};

function ErrorBoundaryPage() {
  const routeError = useRouteError() as any;

  const errorStatus: number = routeError?.status || 500;
  const errorCause: string = routeError?.cause || "Unknown Cause";
  const errorData: ErrorProps = routeError?.body || "Unknown Error";

  const navigate = useNavigate();
  const handleGoBack = () => navigate(-1);

  return (
    <Container>
      <strong className="status">{errorStatus}</strong>
      <strong className="title">Ops! Tivemos um problema</strong>

      <img src={bulletBoxSvg} alt="Bullet Box" className="bulletBox first" />
      <img src={bulletBoxSvg} alt="Bullet Box" className="bulletBox second" />

      <p>
        Desculpe, encontramos alguns problemas técnicos durante a sua última
        operação.
      </p>

      <p>
        Por favor, tente novamente mais tarde ou entre em contato com o suporte
        caso o problema persista.
      </p>

      <div className="buttonGroup">
        <Button
          size="lg"
          variant="outline"
          leftIcon={ArrowLeft}
          onClick={handleGoBack}
        >
          Voltar
        </Button>
      </div>
    </Container>
  );
}

export { ErrorBoundaryPage };
