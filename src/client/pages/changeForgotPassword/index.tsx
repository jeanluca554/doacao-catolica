import {
  Button,
  FormProvider,
  Input,
  useScopedParams,
} from "@arkyn/components";
import { Check, Lock, Shield } from "lucide-react";
import {
  useActionData,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router";

import { CheckCircle, FormContainer, PageContainer } from "./styles";

function ChangeForgotPasswordPage() {
  const data = useActionData();
  const { state } = useNavigation();

  const navigate = useNavigate();
  const location = useLocation();
  const scopedParams = useScopedParams(location.search);

  const passwordChanged = scopedParams.getParam("passwordChanged");

  function handleNavigateToLogin() {
    navigate("/sign-in");
  }

  if (passwordChanged === "true") {
    return (
      <PageContainer>
        <CheckCircle>
          <div>
            <Check />
          </div>
        </CheckCircle>

        <div className="headerContainer">
          <strong>Esqueceu sua senha</strong>
          <p>Sua senha foi alterada com sucesso.</p>
        </div>

        <Button onClick={handleNavigateToLogin}>Voltar para o login</Button>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="headerContainer">
        <strong>Esqueceu sua senha</strong>
        <p>Insira sua nova senha abaixo.</p>
      </div>

      <FormProvider
        fieldErrors={data?.cause?.fieldErrors}
        form={<FormContainer method="POST" />}
      >
        <Input
          showAsterisk
          name="newPassword"
          type="text"
          label="Nova senha"
          leftIcon={Lock}
        />

        <Input
          showAsterisk
          name="confirmPassword"
          type="text"
          label="Confirme a nova senha"
          leftIcon={Shield}
        />

        <Button
          name="_action"
          value="changeForgotPassword"
          isLoading={state === "submitting"}
        >
          Alterar senha
        </Button>

        <strong className="formErrorMessage">{data?.message}</strong>
      </FormProvider>
    </PageContainer>
  );
}

export { ChangeForgotPasswordPage };
