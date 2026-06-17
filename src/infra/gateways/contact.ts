import type { ContactGatewayDTO } from "~/domain/gateways/contact";
import type { ContactDetail } from "~/domain/entities/contactDetail";
import { HttpAdapter } from "../adapters/httpAdapter";
import { SchemaValidatorAdapter } from "../adapters/schemaValidatorAdapter";
import { api } from "../http/api";
import { findOneContactSchema } from "../schemas/external/contacts";
import { ContactMapper } from "../mappers/contact";

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
}

export { ContactGateway };
