import type { ContactDetail } from "../entities/contactDetail";

type ContactGatewayDTO = {
  findOneContact(
    contactPublicId: string,
    token: string,
  ): Promise<ContactDetail>;
};

export type { ContactGatewayDTO };
