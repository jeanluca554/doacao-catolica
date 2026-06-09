import { useParams } from "react-router";

import {
  Input,
  MaskedInput,
  PhoneInput,
  Select,
  Textarea,
} from "@arkyn/components";

import { countries, brazilianStates } from "@arkyn/templates";

import { AvatarUploadArea } from "~/client/components/avatarUploadArea";
import { Container } from "./styles";

function FormCard() {
  const { workspaceId } = useParams();

  if (!workspaceId) {
    throw new Error("Workspace ID is required");
  }

  const stateOptions = brazilianStates.map((state) => ({
    value: state.value,
    label: state.label,
  }));

  const countryOptions = countries.map((country) => ({
    value: country.name,
    label: country.name,
  }));

  return (
    <Container>
      <AvatarUploadArea name="avatar" action="/api/file-upload" />

      <div className="registerForm">
        <h1>Dados básicos</h1>

        <input type="hidden" name="organizationId" value={workspaceId} />

        <Input name="name" label="Nome completo" showAsterisk />

        <div className="formRowHalf">
          <MaskedInput
            name="document"
            mask={"___.___.___-__"}
            replacement={{ _: /\d/ }}
            label="CPF:"
            showAsterisk
          />

          <Input
            type="date"
            name="birthDate"
            label="Data de nascimento"
            showAsterisk
          />
        </div>

        <div className="formRowHalf">
          <Select
            name="gender"
            label="Sexo"
            showAsterisk
            options={[
              { value: "male", label: "Masculino" },
              { value: "female", label: "Feminino" },
            ]}
          />

          <Select
            name="maritalStatus"
            label="Estado civil"
            showAsterisk
            options={[
              { value: "single", label: "Solteiro(a)" },
              { value: "married", label: "Casado(a)" },
              { value: "divorced", label: "Divorciado(a)" },
              { value: "widowed", label: "Viúvo(a)" },
            ]}
          />
        </div>

        <Textarea name="observations" label="Observações" rows={4} />

        <h1>Dados de contato</h1>

        <div className="formRowHalf">
          <PhoneInput name="phone" label="Telefone" />

          <PhoneInput name="whatsapp" label="WhatsApp" />
        </div>

        <Input type="email" name="email" label="E-mail" />

        <h1>Informações de endereço</h1>

        <MaskedInput
          name="postalCode"
          mask={"__.___-___"}
          replacement={{ _: /\d/ }}
          label="CEP:"
          placeholder="99.999-999"
          showAsterisk
          className="postalCode"
        />

        <div className="formRow70-30">
          <Input name="street" label="Rua" showAsterisk />
          <Input name="streetNumber" label="Número" showAsterisk />
        </div>

        <div className="formRow60-40">
          <Input name="neighborhood" label="Bairro" showAsterisk />
          <Input name="complement" label="Complemento" />
        </div>

        <div className="formRow3Equal">
          <Input name="city" label="Cidade" showAsterisk />

          <Select
            name="state"
            label="Estado"
            showAsterisk
            options={stateOptions}
          />

          <Select
            name="country"
            label="País"
            showAsterisk
            defaultValue="Brasil"
            options={countryOptions}
          />
        </div>
      </div>
    </Container>
  );
}

export { FormCard };
