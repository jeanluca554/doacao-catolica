import { ContactsSearchParams } from "~/app/search/contactsSearchParams";
import type {
  ContactOption,
  ContactsGatewayDTO,
} from "~/domain/gateways/contacts";

import type { CampaignGatewayDTO } from "~/domain/gateways/campaign";

type InputProps = {
  campaignId: string;
  filter: { name?: string; status?: string };
};

class ListContactsUseCase {
  constructor(
    private contactsGateway: ContactsGatewayDTO,
    private campaignGateway: CampaignGatewayDTO,
  ) {}

  async execute(input: InputProps, token: string): Promise<ContactOption[]> {
    const { campaignId, filter } = input;
    const campaign = await this.campaignGateway.getCampaign(campaignId, token);
    const searchParams = new ContactsSearchParams({
      filter: { ...filter, accountId: String(campaign.accountId) },
    });
    return this.contactsGateway.listContacts(searchParams, token);
  }
}

export { ListContactsUseCase };
