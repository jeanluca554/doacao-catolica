import type { ContactGatewayDTO } from "~/domain/gateways/contact";

class FindOneContactUseCase {
  constructor(private contactGateway: ContactGatewayDTO) {}

  async execute(contactPublicId: string, token: string) {
    const contact = await this.contactGateway.findOneContact(
      contactPublicId,
      token,
    );
    return contact.toJson();
  }
}

export { FindOneContactUseCase };
