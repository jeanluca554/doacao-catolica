import {
  Button,
  FormProvider,
  PhoneInput,
  useScopedParams,
} from "@arkyn/components";
import { useFetcher, useLocation } from "react-router";

import { FormContainer, PageContainer } from "./styles";

function SignUpGooglePage() {
  const { Form, state, data } = useFetcher();

  const { search } = useLocation();
  const { getParam } = useScopedParams(search);

  const userName = getParam("name");
  const userAvatar = getParam("avatar");
  const userEmail = getParam("email");
  const userSub = getParam("sub");

  return (
    <PageContainer>
      <div className="headerContainer">
        <strong>Número de telefone</strong>
        <p>
          Esse número de telefone será utilizado para autenticar na plataforma e
          autorizar transações de pagamentos
        </p>
      </div>

      <FormProvider
        fieldErrors={data?.cause?.fieldErrors}
        form={<Form method="POST" />}
      >
        <FormContainer>
          <input type="hidden" name="source" value="GOOGLE" />
          <input type="hidden" name="avatar" value={userAvatar} />
          <input type="hidden" name="name" value={userName} />
          <input type="hidden" name="email" value={userEmail} />
          <input type="hidden" name="password" value={userSub} />

          <PhoneInput
            showAsterisk
            name="phone"
            label="Diga o número de telefone:"
          />
          <Button isLoading={state === "submitting"}>Finalizar cadastro</Button>
          <strong className="formErrorMessage">{data?.message}</strong>
        </FormContainer>
      </FormProvider>
    </PageContainer>
  );
}

export { SignUpGooglePage };
