import {
  Button,
  FormProvider,
  Input,
  useScopedParams,
} from "@arkyn/components";
import { Mail } from "lucide-react";
import { Link, useActionData, useLocation, useNavigation } from "react-router";

import { FormContainer, NavigateContainer, PageContainer } from "./styles";

function ForgotPasswordPage() {
  const data = useActionData();
  const { state } = useNavigation();

  const location = useLocation();
  const scopedParams = useScopedParams(location.search);

  const emailSent = scopedParams.getParam("emailSent");

  if (emailSent === "true") {
    return (
      <PageContainer>
        <div className="headerContainer">
          <strong>E-mail enviado</strong>
          <p>Verifique sua caixa de entrada para redefinir sua senha.</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="headerContainer">
        <strong>Redefinir senha</strong>
        <p>
          Insira seu e-mail para receber instruções de redefinição de senha.
        </p>
      </div>

      <FormProvider
        fieldErrors={data?.cause?.fieldErrors}
        form={<FormContainer method="POST" />}
      >
        <Input
          showAsterisk
          name="email"
          type="text"
          label="E-mail"
          leftIcon={Mail}
        />

        <Button
          name="_action"
          value="forgotPassword"
          isLoading={state === "submitting"}
        >
          Enviar
        </Button>

        <strong className="formErrorMessage">{data?.message}</strong>
      </FormProvider>

      <NavigateContainer>
        <p>Voltar para o login</p>
        <Link to="/sign-in">Entrar</Link>
      </NavigateContainer>
    </PageContainer>
  );
}

export { ForgotPasswordPage };
