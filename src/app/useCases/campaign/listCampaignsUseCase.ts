import { CampaignSearchParams } from "~/app/search/campaignSearchParams";
import type { CampaignGatewayDTO } from "~/domain/gateways/campaign";

type InputProps = {
  page?: number | null;
  filter: { name?: string; organizationId?: string };
};

class ListCampaignsUseCase {
  constructor(private campaignGateway: CampaignGatewayDTO) {}

  async execute(input: InputProps) {
    const { page, filter } = input;
    const searchParams = new CampaignSearchParams({ page, filter });

    const campaigns = await this.campaignGateway.listCampaigns(searchParams);

    return campaigns.toJson();
  }
}

export { ListCampaignsUseCase };
