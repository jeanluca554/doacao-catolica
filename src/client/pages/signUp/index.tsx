import { Lock, Mail, Phone, User } from "lucide-react";
import { Link, useFetcher } from "react-router";

import { Button } from "~/client/components/ui/button";
import {
  FormErrorProvider,
  FormField,
} from "~/client/components/ui/form-field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "~/client/components/ui/input-group";

function SignUpPage() {
  const { Form, state, data } = useFetcher();

  return (
    <section className="flex flex-col w-134.5 p-6 gap-3 max-[500px]:w-screen max-[500px]:p-4 max-[500px]:gap-1.5">
      <div className="flex flex-col items-center gap-2 mb-12">
        <strong className="font-semibold text-2xl text-(--text-heading) text-center">
          Criar sua nova conta!
        </strong>
        <p className="font-normal text-lg text-(--text-muted) text-center leading-[130%]">
          Preencha os campos abaixo para criar sua conta
        </p>
      </div>

      <FormErrorProvider fieldErrors={data?.cause?.fieldErrors}>
        <Form method="POST" className="flex flex-col gap-3">
          <input type="hidden" name="source" value="STANDARD" />

          <FormField name="name" label="Nome:" required>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <User size={16} />
              </InputGroupAddon>
              <InputGroupInput type="text" placeholder="Digite seu nome" />
            </InputGroup>
          </FormField>

          <FormField name="email" label="E-mail:" required>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <Mail size={16} />
              </InputGroupAddon>
              <InputGroupInput type="text" placeholder="Digite seu e-mail" />
            </InputGroup>
          </FormField>

          <FormField name="password" label="Senha:" required>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <Lock size={16} />
              </InputGroupAddon>
              <InputGroupInput type="password" placeholder="Digite sua senha" />
            </InputGroup>
          </FormField>

          <FormField name="phone" label="Telefone:" required>
            <InputGroup>
              <InputGroupAddon align="inline-start">
                <Phone size={16} />
              </InputGroupAddon>
              <InputGroupInput type="tel" placeholder="(00) 00000-0000" />
            </InputGroup>
          </FormField>

          <Button
            name="_action"
            value="signUp"
            type="submit"
            isLoading={state === "submitting"}
            className="mt-1"
          >
            Criar conta
          </Button>
        </Form>
      </FormErrorProvider>

      <div className="flex justify-center items-center gap-1 mt-7">
        <p className="font-normal text-sm text-(--text-body)">
          Já possui uma conta?
        </p>
        <Link
          to="/sign-in"
          className="no-underline font-semibold text-sm text-[rgb(var(--spotlight-primary))] hover:underline"
        >
          Faça login
        </Link>
      </div>
    </section>
  );
}

export { SignUpPage };
