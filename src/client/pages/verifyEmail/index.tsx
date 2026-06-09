import { Button } from "@arkyn/components";
import { useFetcher, useNavigate, useParams } from "react-router";

import { PageContainer } from "./styles";

function VerifyEmailPage() {
  const { Form, state, data } = useFetcher();

  const navigate = useNavigate();
  const backToSignIn = () => navigate("/sign-in");

  const userEmail = useParams()?.userEmail;

  return (
    <PageContainer>
      <div className="headerContainer">
        <strong>Confira seu e-mail</strong>
        <p>
          Enviamos um link de verificação para o {userEmail}. Acesse sua caixa
          de entrada e clique no link para confirmar sua conta.
        </p>
      </div>

      <div className="notReceived">
        <strong>Não recebeu o e-mail?</strong>

        <ul>
          <li>Verifique a pasta de spam.</li>
          <li>Aguarde alguns minutos.</li>
          <li>Confirme se o e-mail está correto.</li>
        </ul>
      </div>

      <Button variant="outline" onClick={backToSignIn}>
        Acessar com outro e-mail
      </Button>
    </PageContainer>
  );
}

export { VerifyEmailPage };
