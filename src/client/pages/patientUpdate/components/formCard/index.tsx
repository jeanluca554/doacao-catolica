import { useLoaderData, useParams } from "react-router";

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
import type { UpdatePatientLoader } from "~/client/types/updatePatientLoader";

function FormCard() {
  const { patient } = useLoaderData<UpdatePatientLoader>();

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
      <AvatarUploadArea
        name="avatar"
        action="/api/file-upload"
        defaultValue={patient.avatar}
      />

      <div className="registerForm">
        <h1>Dados básicos</h1>

        <input type="hidden" name="id" value={patient.id} />

        <Input
          name="name"
          label="Nome completo"
          defaultValue={patient.name}
          showAsterisk
        />

        <div className="formRowHalf">
          <MaskedInput
            name="document"
            mask={"___.___.___-__"}
            replacement={{ _: /\d/ }}
            label="CPF:"
            defaultValue={patient.document}
            showAsterisk
          />

          <Input
            type="date"
            name="birthDate"
            label="Data de nascimento"
            defaultValue={patient.birthDate}
            showAsterisk
          />
        </div>

        <div className="formRowHalf">
          <Select
            name="gender"
            label="Sexo"
            showAsterisk
            defaultValue={patient.gender}
            options={[
              { value: "male", label: "Masculino" },
              { value: "female", label: "Feminino" },
            ]}
          />

          <Select
            name="maritalStatus"
            label="Estado civil"
            showAsterisk
            defaultValue={patient.maritalStatus}
            options={[
              { value: "single", label: "Solteiro(a)" },
              { value: "married", label: "Casado(a)" },
              { value: "divorced", label: "Divorciado(a)" },
              { value: "widowed", label: "Viúvo(a)" },
            ]}
          />
        </div>

        <Textarea
          name="observations"
          label="Observações"
          rows={4}
          defaultValue={patient.observations}
        />

        <h1>Dados de contato</h1>

        <div className="formRowHalf">
          <PhoneInput
            name="phone"
            label="Telefone"
            defaultValue={patient.phone}
          />

          <PhoneInput
            name="whatsapp"
            label="WhatsApp"
            defaultValue={patient.whatsapp}
          />
        </div>

        <Input
          type="email"
          name="email"
          label="E-mail"
          defaultValue={patient.email}
        />

        <h1>Informações de endereço</h1>

        <MaskedInput
          name="postalCode"
          mask={"__.___-___"}
          replacement={{ _: /\d/ }}
          label="CEP:"
          placeholder="99.999-999"
          showAsterisk
          className="postalCode"
          defaultValue={patient.postalCode}
        />

        <div className="formRow70-30">
          <Input
            name="street"
            label="Rua"
            showAsterisk
            defaultValue={patient.street}
          />
          <Input
            name="streetNumber"
            label="Número"
            showAsterisk
            defaultValue={patient.streetNumber}
          />
        </div>

        <div className="formRow60-40">
          <Input
            name="neighborhood"
            label="Bairro"
            showAsterisk
            defaultValue={patient.neighborhood}
          />
          <Input
            name="complement"
            label="Complemento"
            defaultValue={patient.complement}
          />
        </div>

        <div className="formRow3Equal">
          <Input
            name="city"
            label="Cidade"
            showAsterisk
            defaultValue={patient.city}
          />

          <Select
            name="state"
            label="Estado"
            showAsterisk
            defaultValue={patient.state}
            options={stateOptions}
          />

          <Select
            name="country"
            label="País"
            showAsterisk
            defaultValue={patient.country}
            options={countryOptions}
          />
        </div>
      </div>
    </Container>
  );
}

export { FormCard };
