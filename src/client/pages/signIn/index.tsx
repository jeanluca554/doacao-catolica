import { Lock, Mail } from "lucide-react";
import { Link, useFetcher } from "react-router";

import googlePNG from "~/client/assets/google.png";
import { AuthButton } from "~/client/components/authButton";
import { Button } from "~/client/components/ui/button";
import {
  FormErrorProvider,
  FormField,
} from "~/client/components/ui/form-field";
import { InputGroup } from "~/client/components/ui/input-group";

function SignInPage() {
  const { Form, state, data } = useFetcher();

  console.log("conteúdo de data:", data);

  return (
    <section className="flex flex-col w-134.5 p-6 gap-6 max-[500px]:w-screen max-[500px]:p-4 max-[500px]:gap-1.5">
      <div className="flex flex-col items-center gap-2 mb-12">
        <strong className="font-semibold text-2xl text-(--text-heading) text-center">
          Seja bem-vindo(a)
        </strong>
        <p className="font-normal text-lg text-(--text-muted) text-center leading-[130%]">
          Faça login para continuar e acessar sua conta!
        </p>
      </div>

      <AuthButton provider="google">
        <img src={googlePNG} alt="google-img" />
        Google
      </AuthButton>

      <div className="flex items-center gap-3 text-sm font-normal text-(--text-muted)">
        <hr className="flex-1 border-(--border)" />
        <p>ou</p>
        <hr className="flex-1 border-(--border)" />
      </div>

      <FormErrorProvider fieldErrors={data?.cause?.fieldErrors}>
        <Form method="POST" className="flex flex-col gap-3">
          <FormField name="email" label="E-mail:" required>
            <InputGroup.Root>
              <InputGroup.Addon>
                <Mail size={16} />
              </InputGroup.Addon>
              <InputGroup.Input
                id="email"
                type="text"
                placeholder="Insira seu e-mail"
                className="pl-9"
              />
            </InputGroup.Root>
          </FormField>

          <FormField name="password" label="Senha:" required>
            <InputGroup.Root>
              <InputGroup.Addon>
                <Lock size={16} />
              </InputGroup.Addon>
              <InputGroup.Input
                id="password"
                type="password"
                placeholder="Insira sua senha"
                className="pl-9"
              />
            </InputGroup.Root>
          </FormField>

          <Link
            to="/forgot-password"
            className="text-sm font-semibold text-[rgb(var(--spotlight-primary))] ml-auto -mt-1.5 no-underline hover:underline"
          >
            Esqueceu sua senha?
          </Link>

          <Button
            name="_action"
            value="authAdmin"
            type="submit"
            isLoading={state === "submitting"}
            className="mt-3"
          >
            Entrar
          </Button>
        </Form>
      </FormErrorProvider>

      <div className="flex justify-center items-center gap-1 mt-7">
        <p className="font-normal text-sm text-(--text-body)">
          Não possui uma conta?
        </p>
        <Link
          to="/sign-up"
          className="no-underline font-semibold text-sm text-[rgb(var(--spotlight-primary))] hover:underline"
        >
          Crie uma conta
        </Link>
      </div>
    </section>
  );
}

export { SignInPage };
