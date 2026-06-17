import { ContactDetail } from "~/domain/entities/contactDetail";
import type { ExternalContactDetail } from "../schemas/external/contacts";

class ContactMapper {
  static toEntity(external: ExternalContactDetail): ContactDetail {
    return ContactDetail.restore({
      contactId: external.id,
      name: external.name,
      cpf: external.cpf,
      accountId: external.account_id,
      birthDate: external.birth_date,
      phone: external.phone,
      email: external.email,
    });
  }
}

export { ContactMapper };
