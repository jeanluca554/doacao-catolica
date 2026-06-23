import type { ContactGatewayDTO } from "~/domain/gateways/contact";
import type { ContactDetail } from "~/domain/entities/contactDetail";
import { HttpAdapter } from "../adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../adapters/schemaValidatorAdapter";
import { api } from "../http/api";
import { findOneContactSchema } from "../schemas/external/contacts";
import { ContactMapper } from "../mappers/contact";

type UpdateContactInput = {
  id: string;
  accountId: number;
  name: string;
  cpf?: string | null;
  birthDate?: string | null;
  email?: string | null;
  phone?: string | null;
  token: string;
};

class ContactGateway implements ContactGatewayDTO {
  async findOneContact(
    contactPublicId: string,
    token: string,
  ): Promise<ContactDetail> {
    const url = `/contact/find-one/${contactPublicId}`;

    const apiResponse = await api.get(url, { token });

    if (!apiResponse.success) throw HttpAdapter.badGateway(apiResponse.message);

    const schemaValidator = new SchemaValidatorAdapter(findOneContactSchema);
    const data = schemaValidator.validate(apiResponse.response);

    return ContactMapper.toEntity(data);
  }

  async updateContact(input: UpdateContactInput): Promise<void> {
    const url = `/contacts/update/${input.id}`;

    await api.put(url, {
      body: {
        name: input.name,
        cpf: input.cpf,
        birthDate: input.birthDate,
        email: input.email,
        phone: input.phone,
        accountId: input.accountId,
      },
      token: input.token,
    });
  }
}

export { ContactGateway };
