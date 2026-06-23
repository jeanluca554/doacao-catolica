import type { ContactDetail } from "../entities/contactDetail";

type UpdateContactInput = {
  id: string;
  accountId: number;
  name: string;
  cpf?: string;
  birthDate?: string;
  email?: string;
  phone?: string;
  token: string;
};

type ContactGatewayDTO = {
  findOneContact(
    contactPublicId: string,
    token: string,
  ): Promise<ContactDetail>;
  updateContact(input: UpdateContactInput): Promise<void>;
};

export type { ContactGatewayDTO };
